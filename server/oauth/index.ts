import * as admin from "firebase-admin";
import qsKey from "../keys";

admin.initializeApp({
  credential: admin.credential.cert(qsKey),
  databaseURL: "https://quiz-simulator-api.firebaseio.com",
});

export default admin;
