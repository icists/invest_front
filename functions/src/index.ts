import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import type { UserData } from "../../src/schemes";
import type {
  InvestParams,
  InvestResult,
  RegisterParams,
  RegisterResult,
} from "../../src/firebase";

admin.initializeApp();
const db = admin.database();

export const registerUser = functions.https.onCall(
  async ({ uid, data }: RegisterParams): Promise<RegisterResult> => {
    await db.ref(`/users/${uid}`).set(data);
    await db.ref(`/teams/${data.teamUID}/members/${uid}`).set(true);
  }
);

export const invest = functions.https.onCall(
  async (data: InvestParams, context): Promise<InvestResult> => {
    if (!context.auth) return "auth_fail";

    const investableSnapshot = await db.ref("/status/investable").get();
    if ((investableSnapshot.val() as boolean) === false)
      return "not_investable";

    const userSnapshot = await db.ref(`/users/${context.auth.uid}`).get();

    if (data.investAmount < 0 || !Number.isSafeInteger(data.investAmount))
      return "invalid_param";

    const userData: UserData = userSnapshot.val();
    if (userData.teamUID !== data.teamUID) return "team_mismatch";

    const investAmountRef = db.ref(
      `/rounds/${data.round}/investAmount/${userData.teamUID}/${data.companyUID}`
    );
    const investAmountSnapshot = await investAmountRef.get();
    const currentInvestAmount = investAmountSnapshot.val();

    const accountRef = db.ref(
      `/rounds/${data.round}/account/${userData.teamUID}`
    );
    const accountSnapshot = await accountRef.get();
    const account: number = accountSnapshot.val();

    if (data.investAmount > account + currentInvestAmount)
      return "insufficient_cash";

    accountRef.set(account + currentInvestAmount - data.investAmount);
    investAmountRef.set(data.investAmount);
    return "success";
  }
);
