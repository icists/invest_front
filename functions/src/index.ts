import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


export const invest = functions.https.onCall((data, context) => {
  return "Hello";
});
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
