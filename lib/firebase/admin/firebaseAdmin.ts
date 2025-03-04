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
        privateKey:
          "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuzz8w/4v0L9Es\n1rA7t1bh3ZdDaoqYWQsm8rg/gDKZ17b+NCDpFMO8J8A+Kokvzfs22Px1ttaK7p5Q\n6+jo45xo1knyAv7psaTQ4VrwLN10XVltW8Oph6mcuaUF8YDPh2DxkRZvuBRTcJjx\nJI30P2pwzFGcJvFr0AS1281gj6/rP8yR+4tVAfnUG5sh9E15RyGWiTAGNJsktFys\nGyFqQHGzlomhIkLnM6bnxytvJrcgnMe/YZ3wc7tYPIcuY3lqCbfBkvXN5tSQHcjs\n3HsivTKGhhTa/Nw3CvHQ29zxJIAIidz5d6WQQaYnZ5An6WEOBizBcDHc/GT9JXwl\n99EudCubAgMBAAECggEAGr7UsT93/z1NqKmUPx626UnI+eSUHekJvsTGEdkgZM9P\nTSdWnbKym9gNHrXNVYYTWHnsbmox+wG1MTZW5ULlzFh06dUxgTnPuLGyAysqGsKp\niwTOM+LwvWzd5cHkblwNJgiHwUINwhJpJAPuwB7vvyBToCuJJnCmN9jQXGS/iqNw\nVC+bfgznzwozBY4/3y1/2xrgiqBhqQIeiezwzXDIPPjT7lgzYadMl4z0ZqrRnZD6\nx5O8GV0ueBfWJI72sPqxOk+g0ZotqYRIEUU8VzEfxeScFheHn1aBfnLbihiLLVVI\nxOUYDpliwPp52tEvIhFfH7sNFycyJ5Eb7UdcNY44sQKBgQDj+vA/QezJ73b6BMhT\nJNaxcEPd8Gxb+503O20htb2TGbYrxHK/+5E8ch4KYNEBnPa7WyN3JYZSEMjSuSW4\nQ3PtabfN0zFmZ5+KNjFFpsSgcoWgoifALp46yLVfyustm0/f0Gxr7WCPygB+dXkA\niW3M6LETek1DM3tI12af72dagwKBgQDES18mPwl/WOLFOJxazQNRRFprF7l7gYkg\n5PyqwOeFbWZOGuA7Tz1BaNSB9L8/S6tZm9yhka34huOM7QE2xhfqvfVfjfjTWHer\nJ8oI6/A5DQWjJ901zBDiTuNRIouaBNf/gS46ve5Nrm6ugFiVVdW/Bhxc2tN0cBha\nt4snknl/CQKBgA5u04jdrpT2MQ0RAnGpEmJ3XgSN9P45xrE5dOY+cDsA1LSeojkf\nPwmZm+dCS9kTS9d+pJclbASEBYK5r/ajZpJwL++64BTAmKwSVDo5nZceyPDrcyLK\nkL/d9wWSfiMMAxmDQ2ntxEA2JKPc4gUzrhzb2mIGSx/nAXYSFPApItzrAoGAVEEN\nzDrOdszOOVz9L7RDskQmk0URpkOJeocPNLOsLIcynF/I02xFnKfEXyuQUzjFiabu\n4qLHC5/KWBj6pmoMpgN3KNalcQHOC7b+bynmaHaAbvGTb53xuVGnHJI5XZiqpc7q\n6ufPO6SdeWU5oI/BOUcEMY7zqEzdB0M1BX1HjRECgYA4sOvYHuXalng9Tiv8Krlt\nqnIsYqlBSvToXY2Zc7ezsLjlxuWszblRc3ebgLc7DhunhNVvfV+BFager2nhWfPI\nTIolAF2DOe+ZMVDI+mkcns10y21kQA/3/iHu6y+lsWJAX1sn3lSf+S5BUn5h5ws+\nfqfXGrrAdvSlalRkxQJsCA==\n-----END PRIVATE KEY-----\n",
      }),
    });
  }
} catch (error) {
  console.error("Error initializing Firebase app:", error);
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();

export { adminAuth, adminDb };
