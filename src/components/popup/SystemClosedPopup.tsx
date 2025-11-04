import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function SystemClosedPopup() {
  const navigate = useNavigate();
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl">
          {/* Header */}
          <div className="w-full flex flex-col items-center p-6 gap-2 rounded-t-2xl bg-red">
            <Icon
              icon="solar:star-rings-linear"
              color="white"
              className="w-14 h-14"
            />
            <p className="title-large text-white text-center">
              ปิดระบบชั่วคราว
            </p>
          </div>

          {/* Content */}
          <div className="w-full flex flex-col items-center px-6">
            <p className="title-large mb-2 text-center">
              <span className="font-semibold">ขณะนี้ระบบกำลังปิดชั่วคราว</span>
            </p>
            <p className="title-small text-center">
              {`แล้วเจอกันใหม่เร็ว ๆ นี้ ระหว่างนี้อย่าลืมสนุกไปกับหลายกิจกรรม ;)`}
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-center items-center gap-2 flex-wrap pb-6 px-6">
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              ตกลง
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SystemClosedPopup;
