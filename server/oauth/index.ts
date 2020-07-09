import * as admin from "firebase-admin";
const serviceAccount = require("../keys/quiz-simulator-api-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quiz-simulator-api.firebaseio.com",
});

export default admin;
