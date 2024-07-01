"use client";
import {
  AuthProvider,
  EmailAuthProvider,
  UserCredential,
  UserInfo,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { createContext, useContext, useMemo, useState } from "react";
import { Claims } from "next-firebase-auth-edge/lib/auth/claims";

import { auth } from "../config/auth/firebase-client";


type ErrorResponse = {
  error: string;
  data: null;
};
type DataResponse<T> = { error: null; data: T };

type Response<T> = ErrorResponse | DataResponse<T>;

export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}
export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signInWithEmailAndPass: (
    email: string,
    password: string
  ) => Promise<{
    userCredential?: UserCredential;
    error: string;
  }>;
  signInWithProvider: (
    provider: AuthProvider
  ) => Promise<Response<UserCredential>>;
  logout: () => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<{ error: string }>;
  updateUserPassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<{ error: string }>;
  updateUserProfile: (name: string) => Promise<
    | {
        error: string;
      }
    | undefined
  >;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
} as AuthContextValue);

export const CustomAuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  user,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  //   this function force refresh the user token on client side
  async function refreshToken() {
    const headers: Record<string, string> = {};

    await fetch("/api/refreshtoken", {
      method: "GET",
      headers,
    });
  }
  async function login(token: string) {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    // these routes does't need to be created it automatically handled my middleware.ts
    await fetch("/api/auth/login", {
      method: "GET",
      headers,
    });
  }

  const getErrorMessage = (e: any) => {
    switch (e.code) {
      case "auth/email-already-in-use":
        return "Email already in use. Please try another email or login.";
      case "auth/wrong-password":
        return "Invalid Email or Password. Try again or signUp now";
      case "auth/user-not-found":
        return "User not found. Try again or signUp now.";
      case "auth/weak-password":
        return "Password should be strong. Try again";
      case "auth/invalid-email":
        return "Please enter a valid email address";
      case "auth/wrong-password":
        return "Current password is incorrect";
      case "auth/user-mismatch":
        return "Please login again to change your password";
      default:
        return "Something went wrong. Please try again";
    }
  };

  const signInWithEmailAndPass = async (email: string, password: string) => {
    let error = "";
    let userCredential: UserCredential | undefined;
    setIsLoading(true);
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await login(idToken);
    } catch (err) {
      error = getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }

    return {
      userCredential,
      error,
    };
  };

  const signUpWithEmailAndPass = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    let error = "";
    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      const idToken = await userCredential.user.getIdToken();
      await login(idToken);
    } catch (err) {
      error = getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }

    return {
      userCredential,
      error,
    };
  };

  const signInWithProvider = async (provider: AuthProvider) => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken(true);

      await login(idToken);
      return {
        data: userCredential,
        error: null,
      };
    } catch (err) {
      const error = getErrorMessage(err);
      return {
        data: null,
        error,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    const headers: Record<string, string> = {};

    await fetch("/api/auth/logout", {
      method: "GET",
      headers,
    });

    return;
  };

  const sendResetPasswordEmail = async (email: string) => {
    setIsLoading(true);
    let error = "";
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
      });
    } catch (err) {
      error = getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
    return {
      error,
    };
  };

  const updateUserPassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!user || !auth.currentUser) {
      return {
        error: "User not found",
      };
    }
    setIsLoading(true);
    let error = "";
    try {
      const credential = EmailAuthProvider.credential(
        user.email as string,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
    } catch (err) {
      error = getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
    return {
      error,
    };
  };
  const updateUserProfile = async (name: string) => {
    setIsLoading(true);
    if (!auth.currentUser) return;
    let error = "";
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (err) {
      error = getErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
    return {
      error,
    };
  };

  // Memoize the context value
  const authContextValue: AuthContextValue = useMemo(() => {
    return {
      user,
      signInWithEmailAndPass,
      logout,
      signUpWithEmailAndPass,
      isLoading,
      setIsLoading,
      signInWithProvider,
      sendResetPasswordEmail,
      updateUserPassword,
      updateUserProfile,
      refreshToken,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
