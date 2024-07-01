"use client";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { useAuth } from "../../context/AuthContext";
import { useRedirectAfterLogin } from "../../lib/hooks/useRedirectAfterLogin";


import { getAdditionalUserInfo, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function Page() {
  const { toast } = useToast();
  const { signInWithProvider, isLoading } = useAuth();
  const redirectAfterLogin = useRedirectAfterLogin();
  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { error, data } = await signInWithProvider(new GoogleAuthProvider());
    if (error !== null) {
      toast({
        title: "Something went wrong",
        description:
          "we couldn't log you in at this time. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    const getadditionalInfo = getAdditionalUserInfo(data);
    if (getadditionalInfo?.isNewUser === true) {
      await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.user.displayName,
          email: data.user.email,
        }),
      });
    }

    redirectAfterLogin();
  };

  return (
    <main className="relative flex h-screen w-full flex-col gap-40 bg-[#171B1C] px-28">
      
      <div className="relative flex items-center justify-between pt-[33px]">
        <a href="/"><h1 className="flex items-center space-x-2 text-3xl font-bold text-white font-roboto"><img src="/images/Debales_Logo.png" height="40px" width="30px" /> <p>Debales</p></h1></a>
        <a href="https://debales.ai/contactUs"><Button variant="secondary">Contact Us</Button></a>
      </div>
      <div className="flex items-center justify-center w-full ">
        <div className="flex flex-col items-center justify-center gap-10 ">
          <div className="w-full text-4xl font-bold text-center text-white">
            <h3>Log in to Debales</h3>
          </div>
          <div className="w-full">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              variant="secondary"
              className="flex items-center justify-center w-full gap-2 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-6 h-6" />
              <span className="font-semibold ">Log in with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
