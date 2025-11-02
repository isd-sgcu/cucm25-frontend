'use client';

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
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
    if (username.length === 0 || pin.some(d => d.length === 0)) {
      setIsError(true);
      return;
    }

    // Check credentials
    navigate('/auth/verify-information');
  }

  useEffect(() => {
    setIsError(false);
  }, [username, pin]);

  return (
    <div className="h-full flex flex-col gap-12 justify-between items-center px-6">
      <div className="flex flex-col gap-1.5 mb-1">
        <Logo />
        <h1 className="font-medium text-center display-small-emphasized">Reward</h1>
      </div>

      <div className="w-full flex flex-col gap-4 pb-1 relative">
        {isError && (
          <div className="absolute -top-12 left-0 right-0 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-center body-large text-red bg-red/10 py-2 px-4 rounded-lg border border-red/20">
              ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง
            </p>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-lg">
            Username (ID)
          </label>
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value)
            }}
            required
            isError={isError}
            inputClassName="h-12 body-large"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="pin" className="text-lg">
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
                inputClassName="text-center w-full max-w-none! body-large"
                required
                isError={isError}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={username.length === 0 || pin.some(d => d.length === 0)}
        className="rounded-[100px] shadow-elevation-1 px-4 py-2.5 w-full max-w-[248px] font-normal bg-purple text-white border-purple hover:bg-purple/90 disabled:text-white/70"
        type="submit"
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}

export default LoginSession;