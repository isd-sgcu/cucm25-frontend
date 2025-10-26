'use client';

import { useState, useEffect } from "react";
import LoginSession from "@/components/auth/LoginSection";
import CloseWebsiteSection from "@/components/auth/CloseWebsiteSection";

function AuthLanding() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="bg-light-yellow w-full h-full flex flex-col items-center justify-center">
      <img
        src={"/public/bg-auth-top.png"}
        alt=""
        className="absolute top-0"
      />
      {isOpen ? (
        <LoginSession />
      ) : (
        <CloseWebsiteSection />
      )}
      <img
        src={"/public/bg-auth-butt.png"}
        alt=""
        className="absolute bottom-0"
      />
    </div>
  );
}

export default AuthLanding;