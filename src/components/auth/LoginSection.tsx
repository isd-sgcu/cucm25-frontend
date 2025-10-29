'use client';

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";

function LoginSession() {
  const PIN_LENGTH = 6;
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [isError, setIsError] = useState<boolean>(false);

  const inputIds = useRef<string[]>(
    Array.from({ length: PIN_LENGTH }, (_, i) => `pin-${i}`)
  );

  const focusIndex = (i: number) => {
    const el = document.getElementById(inputIds.current[i]) as HTMLInputElement | null;
    el?.focus();
    el?.select?.();
  };

  const handleDigitChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, ''); // keep only numbers
    if (!digits) return;

    const next = [...pin];

    if (digits.length === 1) {
      next[index] = digits[0];
      setPin(next);
      if (index < PIN_LENGTH - 1) focusIndex(index + 1);
      return;
    }

    // Handle paste or multiple chars
    for (let i = 0; i < digits.length && index + i < PIN_LENGTH; i++) {
      next[index + i] = digits[i];
    }
    setPin(next);
    const last = Math.min(index + digits.length, PIN_LENGTH - 1);
    focusIndex(last);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...pin];
      if (next[index]) {
        next[index] = '';
        setPin(next);
      } else if (index > 0) {
        const prev = index - 1;
        next[prev] = '';
        setPin(next);
        focusIndex(prev);
      }
      return;
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusIndex(index - 1);
      return;
    }

    if (e.key === 'ArrowRight' && index < PIN_LENGTH - 1) {
      e.preventDefault();
      focusIndex(index + 1);
      return;
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!text) return;
    e.preventDefault();

    const next = [...pin];
    for (let i = 0; i < text.length && index + i < PIN_LENGTH; i++) {
      next[index + i] = text[i];
    }
    setPin(next);
    const endIndex = Math.min(index + text.length, PIN_LENGTH - 1);
    focusIndex(endIndex);
  };

  const handleSubmit = () => {
    // Validate username and pin
    if(username.length === 0 || pin.some(d => d.length === 0)) {
      setIsError(true);
      return;
    }
    
    // Check credentials
    navigate('/auth/verify-information');
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center px-6">
      <div className="flex flex-col gap-1">
        <Logo />
        <h1 className="font-medium text-center display-small-emphasized">Reward</h1>
      </div>

      <div className="w-full flex flex-col gap-6 pb-1">
        <div className="flex flex-col gap-1">
          <label htmlFor="pin-0" className="title-large">
            Username (ID)
          </label>
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value)
            }}
            required
            isError={isError}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="pin-0" className="title-large">
            PIN
          </label>
          <div className="flex flex-row items-center justify-between gap-3 w-full">
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <Input
                key={i}
                id={inputIds.current[i]}
                value={pin[i] ?? ''}
                onChange={(e) => handleDigitChange(i, e.currentTarget.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={(e) => handlePaste(i, e)}
                inputSize="sm"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                type="password"
                autoComplete="one-time-code"
                aria-label={`PIN digit ${i + 1}`}
                inputClassName="text-center w-full max-w-none!"
                required
                isError={isError}
              />
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="rounded-[100px] shadow-elevation-1 body-large"
        size={"lg"}
      >
        เข้าสู่ระบบ
      </Button>
    </div>
  );
}

export default LoginSession;