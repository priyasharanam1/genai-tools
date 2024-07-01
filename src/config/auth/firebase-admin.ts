import {
  initializeApp,
  getApps,
  cert,
  getApp,
  ServiceAccount,
} from "firebase-admin/app";
import { authConfig } from "./server-config";

const firebaseConfig = {
  credential: cert(authConfig.serviceAccount as ServiceAccount),
};
export const initializeFirebaseSdk = () => {
  if (!getApps().length) {
    console.log("Initializing new firebase sdk");
    return initializeApp(firebaseConfig);
  } else {
    console.log("Using existing firebase sdk");
    return getApp();
  }
};
