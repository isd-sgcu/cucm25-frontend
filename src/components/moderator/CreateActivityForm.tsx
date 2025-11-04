'use client';

import { Button } from "../ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Minus, Plus } from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import { useEffect } from "react";

interface CreateActivityFormProps {
  limitCoin: number;
  activityName: string;
  setActivityName: (name: string) => void;
  coinReward: number;
  setCoinReward: (coin: number) => void;
  expiresDate: Dayjs | null;
  setExpiresDate: (date: Dayjs | null) => void;
  expiresTime: Dayjs | null;
  setExpiresTime: (time: Dayjs | null) => void;
  isActivityNameError: boolean;
  setIsActivityNameError: (isError: boolean) => void;
  isCoinRewardError: boolean;
  setIsCoinRewardError: (isError: boolean) => void;
  isExpiresError: boolean;
  setIsExpiresError: (isError: boolean) => void;
  handleSubmit: () => void;
}

export default function CreateActivityForm({
  limitCoin,
  activityName,
  setActivityName,
  coinReward,
  setCoinReward,
  expiresDate,
  setExpiresDate,
  expiresTime,
  setExpiresTime,
  isActivityNameError,
  setIsActivityNameError,
  isCoinRewardError,
  setIsCoinRewardError,
  isExpiresError,
  setIsExpiresError,
  handleSubmit
}: CreateActivityFormProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (activityName !== "") {
      setIsActivityNameError(false);
    }
    if (coinReward > 0 && coinReward <= limitCoin) {
      setIsCoinRewardError(false);
    }
    if (expiresDate && expiresTime) {
      setIsExpiresError(false);
    }
  }, [activityName, coinReward, expiresDate, expiresTime, limitCoin, setIsActivityNameError, setIsCoinRewardError, setIsExpiresError]);

  return (
    <div className="flex flex-col gap-10 px-6">
      {/* Form */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="activityName" className="title-medium-emphasized">ชื่อกิจกรรม</label>
          <Input
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="กรอกชื่อกิจกรรม"
            inputClassName="title-small"
          />
          {isActivityNameError && (
            <p className="body-small text-red absolute top-full mt-2.5 text-center w-full">
              *กรุณากรอกชื่อกิจกรรม
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="coinReward" className="title-medium-emphasized">{`จำนวนเหรียญ (ระบุไม่เกิน ${limitCoin} Coin)`}</label>
          <div className="flex flex-row gap-4 items-center justify-center">
            <button
              type="button"
              onClick={() =>
                setCoinReward(coinReward > 0 ? coinReward - 1 : coinReward)
              }
              className="cursor-pointer"
            >
              <Minus size={16} />
            </button>
            <Input
              value={coinReward}
              onChange={(e) => {
                setCoinReward(Math.min(e.target.valueAsNumber, limitCoin));
              }}
              type="number"
              id="coinReward"
              min={0}
              max={limitCoin}
              inputSize={"md"}
              inputClassName="text-center title-small"
              containerClassName="w-fit"
            />
            <button
              type="button"
              onClick={() =>
                setCoinReward(coinReward < limitCoin ? coinReward + 1 : coinReward)
              }
              className="cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>
          {isCoinRewardError && (
            <p className="body-small text-red absolute top-full mt-2.5 text-center w-full">
              *จำนวนเหรียญเกินจำนวนที่กำหนด
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="expires" className="title-medium-emphasized">วัน เวลา ที่หมดอายุ</label>
          <div className="flex flex-row gap-4">
            <DatePicker
              sx={{ width: '66.67%' }}
              value={expiresDate}
              onChange={(newValue) => setExpiresDate(newValue)}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    className:
                      'min-w-0 title-small rounded-xl! bg-grey px-3 py-1 outline-none! text-black shadow-make-cartoonish disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-deep-deep-grey border border-black!',
                  },
                },
              }}
            />
            <TimePicker
              sx={{ width: '33.33%' }}
              value={expiresTime}
              onChange={(newValue) => setExpiresTime(newValue)}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    className:
                      'min-w-0 title-small rounded-xl! bg-grey px-3 py-1 outline-none! text-black shadow-make-cartoonish disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-deep-deep-grey border border-black!',
                  },
                },
              }}
            />
          </div>
          {isExpiresError && (
            <p className="body-small text-red absolute top-full mt-2.5 text-center w-full">
              *วัน เวลา อยู่นอกเหนือระยะเวลาค่าย
            </p>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="flex flex-row justify-center items-center gap-4 w-full flex-wrap">
        <Button
          className="flex flex-row items-center gap-2 rounded-full px-4 py-2.5 w-fit border border-purple"
          size={"custom"}
          variant={"outline"}
          color={"purple"}
          onClick={handleBackClick}
        >
          <ArrowLeft size={16} />
          ย้อนกลับ
        </Button>
        <Button
          className="flex flex-row items-center gap-2 rounded-full px-5 py-2.5 w-fit shadow-elevation-1"
          size={"custom"}
          disabled={activityName === "" || coinReward <= 0 || !expiresDate || !expiresTime}
          onClick={handleSubmit}
        >
          สร้าง Code
        </Button>
      </div>
    </div >
  );
}