import * as admin from "firebase-admin";
import { getApps } from "firebase/app";

// const serviceAccount = require("../../serviceAccountKey.json")
const serviceAccount = require("../../serviceAccountKey.json")

if (!getApps().length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } catch (error) {
      console.log('Firebase admin initialization error');
    }
  }

const adminDb = admin.firestore();

export { adminDb };
