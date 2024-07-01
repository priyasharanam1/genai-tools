import { ServiceAccount } from "firebase-admin/app";


export const serverConfig = {
  useSecureCookies: process.env.USE_SECURE_COOKIES === "true",
  firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  serviceAccount: process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ? {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }
    : undefined,
};

export const authConfig = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: "__session",
  cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEY_1, process.env.COOKIE_SIGNATURE_KEY_2],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
};
