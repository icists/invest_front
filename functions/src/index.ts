import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import type { CompanyUID, UserData } from "../../src/schemes";
import type {
  InvestParams,
  InvestResult,
  RegisterParams,
  RegisterResult,
} from "../../src/firebase";
import { AuthData } from "firebase-functions/lib/common/providers/tasks";

/* admin.initializeApp({
  databaseURL: "https://investment-game-test.asia-southeast1.firebasedatabase.app/"
}); */
admin.initializeApp();
const db = admin.database();

export const registerUser = functions.https.onCall(
  async ({ uid, data }: RegisterParams): Promise<RegisterResult> => {
    const usersSnapshot = await db.ref("/users").get();
    const users: Record<string, UserData> = usersSnapshot.val() ?? {};
    for (const [currentUID, userData] of Object.entries(users)) {
      console.log(currentUID, userData);
      if (
        uid !== currentUID &&
        data.uniqueNumber === userData.uniqueNumber &&
        data.uniqueNumber !== 0
      ) {
        return false;
      }
    }

    await db.ref(`/users/${uid}`).set(data);
    await db.ref(`/teams/${data.teamUID}/members/${uid}`).set(true);

    return true;
  }
);

export const invest = functions.https.onCall(
  async (data: InvestParams, context): Promise<InvestResult> => {
    if (!context.auth) return "auth_fail";

    const investingPath = `/teams/${data.teamUID}/investing`;
    const investingRef = db.ref(investingPath);
    const investingSnapshot = await investingRef.get();

    if ((investingSnapshot.val() as boolean) === true)
      return "simultaneous_action";

    await investingRef.set(true);

    async function process(auth: AuthData) {
      const investableSnapshot = await db.ref("/status/investable").get();
      if ((investableSnapshot.val() as boolean) === false)
        return "not_investable";

      const userSnapshot = await db.ref(`/users/${auth.uid}`).get();

      if (data.investAmount < 0 || !Number.isSafeInteger(data.investAmount))
        return "invalid_param";

      const userData: UserData = userSnapshot.val();
      if (userData.teamUID !== data.teamUID) return "team_mismatch";

      const accountRef = db.ref(
        `/rounds/${data.round}/account/${userData.teamUID}`
      );
      const accountSnapshot = await accountRef.get();
      const account: number = accountSnapshot.val();

      if (data.investAmount > account * 0.7) return "excess_ratio";

      const investAmountRef = db.ref(
        `/rounds/${data.round}/investAmount/${userData.teamUID}`
      );
      const investAmountSnapshot = await investAmountRef.get();
      const currentInvestAmount: Record<CompanyUID, number> =
        investAmountSnapshot.val() ?? {};
      currentInvestAmount[data.companyUID] = data.investAmount;
      const totalSpending = Object.values(currentInvestAmount).reduce(
        (a, b) => a + b,
        0
      );

      if (totalSpending > account) return "insufficient_cash";

      await investAmountRef.child(data.companyUID).set(data.investAmount);
      return "success";
    }

    const result = process(context.auth);
    await investingRef.set(false);
    return result;
  }
);
