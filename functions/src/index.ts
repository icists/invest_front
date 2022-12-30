import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { UserData } from "../../src/schemes";

export const invest = functions.https.onCall(
  async (data: { team: number; companyUID: string }, context) => {
    if (!context.auth) return null;
    const userSnapshot = await admin
      .database()
      .ref(`/users/${context.auth.uid}`)
      .get();

    const userData: UserData = userSnapshot.val();
    if (userData.team !== data.team) return null;

    const roundSnapshot = await admin
      .database()
      .ref("/status/currentRound")
      .get();
    const round: number = roundSnapshot.val();


    return "Hello";
  }
);
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
