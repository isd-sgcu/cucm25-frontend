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
    <>
      <div className='absolute w-full h-full min-h-screen bg-light-yellow sm:max-w-md mx-auto z-0'></div>
      <div className='w-full h-full min-h-screen sm:max-w-md flex items-center justify-center z-10'>
        <div className='flex flex-col justify-between w-full mx-auto h-full'>
          <div className='flex justify-end w-full'>
            <img src={"/bg-auth-top.png"} alt="Corner Decoration" className="w-full object-cover"/>
          </div>
          <div className='py-2'>
            {isOpen ? (
              <LoginSession />
            ) : (
              <CloseWebsiteSection />
            )}
          </div>
          <div className='flex justify-start'>
          </div>
            <img src={"/bg-auth-butt.png"} alt="Corner Decoration" />
        </div>
      </div>
    </>
  );
}

export default AuthLanding;