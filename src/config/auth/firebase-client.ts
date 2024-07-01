import { getApp, getApps, initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  inMemoryPersistence,
  setPersistence,
} from "firebase/auth";
import { clientConfig } from "./client-config";

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(clientConfig);
};

const auth = getAuth(getFirebaseApp());
setPersistence(auth, inMemoryPersistence);

export { auth };
