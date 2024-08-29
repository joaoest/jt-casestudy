import Image from "next/image";
import React from "react";
import LoginForm from "./components/loginform";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
