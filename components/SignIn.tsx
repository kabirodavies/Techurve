"use client";
import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <Button size="default" className="bg-shop_dark_blue text-white rounded-full px-4 py-1.5 font-bold shadow hover:bg-shop_orange transition-all">
        Login
      </Button>
    </SignInButton>
  );
};

export default SignIn;


