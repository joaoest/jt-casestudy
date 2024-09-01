"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function getCookieByName(cname: string) {
  if (typeof window !== "undefined") {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const cookie = getCookieByName("session");

    if (!cookie) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="text-center">
        <p className="text-gray-800 text-2xl font-semibold mb-4">
          Welcome, you're logged in.
        </p>
      </div>
    </div>
  );
}
