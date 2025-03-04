import admin from "firebase-admin";
//import secrets from "@/secret.json";

//const serviceAccount = secrets;

try {
  if (admin.apps.length > 0) {
    // Firebase app already initialized
    admin.app();
  } else {
    // Initialize Firebase app with secrets.json
    //  admin.initializeApp({
    //  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // });

    admin.initializeApp({
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
      }),
    });
  }
} catch (error) {
  console.error("Error initializing Firebase app:", error);
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();

export { adminAuth, adminDb };
