import Image from "next/image";
import React from "react";
import { LoginForm } from "../components/loginForm/";
import PocketBaseProvider from "../components/PocketBaseProvider";

export default function LoginPage() {
  return (
    <PocketBaseProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <LoginForm />
      </div>
    </PocketBaseProvider>
  );
}
