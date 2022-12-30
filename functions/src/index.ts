import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import type { UserData } from "../../src/schemes";
import type { InvestParams, InvestResult } from "../../src/firebase";

admin.initializeApp();
const db = admin.database();

export const invest = functions.https.onCall(
  async (data: InvestParams, context): Promise<InvestResult> => {
    if (!context.auth) return "auth_fail";
    const userSnapshot = await db.ref(`/users/${context.auth.uid}`).get();

    const userData: UserData = userSnapshot.val();
    if (userData.team !== data.team) return "team_mismatch";

    const investAmountRef = db.ref(
      `/rounds/${data.round}/investAmount/${userData.team}/${data.companyUID}`
    );
    const investAmountSnapshot = await investAmountRef.get();
    const currentInvestAmount = investAmountSnapshot.val();

    const accountRef = db.ref(`/teams/${userData.team}/account`);
    const accountSnapshot = await accountRef.get();
    const account: number = accountSnapshot.val();

    if (data.investAmount > account + currentInvestAmount)
      return "insufficient_cash";

    accountRef.set(account + currentInvestAmount - data.investAmount);
    investAmountRef.set(data.investAmount);
    return "success";
  }
);
