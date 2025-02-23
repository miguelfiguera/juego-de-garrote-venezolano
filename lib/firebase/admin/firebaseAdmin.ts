import admin from "firebase-admin";
import secrets from "@/secret.json";

const serviceAccount = secrets;

try {
  if (admin.apps.length > 0) {
    // Firebase app already initialized
    admin.app();
  } else {
    // Initialize Firebase app
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }
} catch (error) {
  console.error("Error initializing Firebase app:", error);
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();

export { adminAuth, adminDb };
