import { useState } from "react";
import { IconBox } from "../ui/icon-box";
import { Icon } from "@iconify/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowBack } from "@mui/icons-material";

interface ReceivingCoinPopupProps {
  setOpenReceivingCoinPopup: (bool: boolean) => void;
}

function ReceivingCoinPopup({
  setOpenReceivingCoinPopup,
}: ReceivingCoinPopupProps) {
  const [receivingCoinForm, setReceivingCoinForm] = useState<{
    eventLetter: string;
    eventNumber: string;
  }>({ eventLetter: "", eventNumber: "" });

  function handleSubmitReceivingCoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(
      `Event ID: ${
        receivingCoinForm.eventLetter + receivingCoinForm.eventNumber
      }`
    );
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={() => setOpenReceivingCoinPopup(false)}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <form
          className="max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl p-6"
          onSubmit={handleSubmitReceivingCoin}
        >
          {/* Header */}
          <div className="w-full flex flex-col items-center gap-2">
            <IconBox bgcolor="pink" className="w-18 h-18">
              <Icon
                icon="solar:stars-outline"
                color="black"
                className="w-12 h-12"
              />
            </IconBox>
            <p className="title-large">
              <span className="font-semibold">รับเหรียญ</span>
            </p>
          </div>

          {/* Form */}
          <div className="w-full flex flex-col">
            <p className="label-large">
              <span className="font-semibold">กรอกรหัสกิจกรรม</span>
            </p>
            <div className="w-full flex gap-2 items-center">
              <Input
                inputSize="sm"
                inputClassName={`${
                  receivingCoinForm.eventLetter ? "bg-pink" : ""
                }`}
                containerClassName="w-fit"
                placeholder="X"
                value={receivingCoinForm.eventLetter}
                onChange={(e) => {
                  let value = e.target.value.toUpperCase();
                  if (/^[A-Z]?$/.test(value)) {
                    setReceivingCoinForm((prev) => ({
                      ...prev,
                      eventLetter: value,
                    }));
                  }
                }}
              />

              <Input
                value={receivingCoinForm.eventNumber}
                placeholder="000"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setReceivingCoinForm((prev) => ({
                      ...prev,
                      eventNumber: value,
                    }));
                  }
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-center items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setOpenReceivingCoinPopup(false);
                setReceivingCoinForm({
                  eventLetter: "",
                  eventNumber: "",
                });
              }}
            >
              <ArrowBack fontSize="small" />
              <p>ย้อนกลับ</p>
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={
                receivingCoinForm.eventLetter == "" ||
                receivingCoinForm.eventNumber == ""
              }
            >
              ต่อไป
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReceivingCoinPopup;
