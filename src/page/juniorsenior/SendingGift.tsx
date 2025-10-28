import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ACADEMIC_YEARS as ACADEMIC_YEAR_OPTIONS,
  mockSeniorUser,
  SECONDARY_YEARS as SECONDARY_YEAR_OPTIONS,
} from "@/utils/const";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function JuniorSeniorSendingGift() {
  const user = mockSeniorUser;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const targetRole = searchParams.get("role");
  const targetId = searchParams.get("id");

  if (!targetId || !targetRole) {
    navigate(-1);
    return;
  }

  const [formData, setFormData] = useState<{
    id: string;
    nickname: string;
    education_level: "มัธยม" | "มหาลัย";
    year: string;
    question1_id: string;
    question1_answer: string;
    question2_id: string;
    question2_answer: string;
    question3_id: string;
    question3_answer: string;
  }>({
    id: targetId,
    nickname: "",
    education_level: targetRole == "junior" ? "มัธยม" : "มหาลัย",
    year: targetRole == "junior" ? "4" : "1",
    question1_id: "1",
    question1_answer: "",
    question2_id: "2",
    question2_answer: "",
    question3_id: "3",
    question3_answer: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const YEAR_OPTIONS =
    targetRole == "junior" ? SECONDARY_YEAR_OPTIONS : ACADEMIC_YEAR_OPTIONS;

  return (
    <div className="w-full h-fit min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full h-fit flex flex-col gap-6 bg-light-blue border rounded-b-xl shadow-make-cartoonish mb-6 px-2 py-4">
        {/* User Information */}
        <div className="flex gap-4 justify-between items-center">
          <div className="w-18 h-14 bg-black rounded-2xl"></div>
          <div className="flex flex-col items-end flex-wrap">
            <p className="label-medium text-end flex items-center">
              <span
                className={`${
                  user.role === "junior"
                    ? "bg-yellow text-black border-black"
                    : user.role == "senior"
                    ? "bg-vivid-pink text-white border-black"
                    : ""
                } rounded-full px-2 border shadow-make-cartoonish-1 mr-2`}
              >
                {user.username}
              </span>
              <span>
                {user.role === "junior"
                  ? "น้องค่าย"
                  : user.role == "senior"
                  ? "พี่ค่าย"
                  : "undefined"}
              </span>
            </p>
            <p className="label-medium text-end">
              {user.firstname} {user.lastname}
            </p>
            <p className="label-medium text-end">
              <span>
                {user.education_level == "มหาลัย" ? "ม." : "ปี "}
                {user.year}{" "}
              </span>
              <span>{user.school}</span>
            </p>
          </div>
        </div>

        {/* Page Name */}
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Icon icon="solar:alt-arrow-left-linear" className="w-6 h-6" />
          <div className="flex flex-col gap-1">
            <h1 className="display-small whitespace-normal wrap-break-word">
              <span className="font-medium">คำถามพิสูจน์มิตรภาพ</span>
            </h1>
            <h2 className="label-large whitespace-normal wrap-break-word">
              ตอบให้ถูกทั้งหมดเพื่อส่งของขวัญให้สำเร็จ
            </h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-fit flex bg-white flex-col flex-1 px-4">
        {/* Target */}
        <div className="flex justify-between gap-2">
          <h2 className="title-medium">
            <span className="font-semibold">ส่งของขวัญให้</span>
          </h2>
          <div className="flex flex-col items-end gap-0.5">
            <span
              className={`${
                targetRole === "junior"
                  ? "bg-yellow text-black border-black"
                  : targetRole == "senior"
                  ? "bg-vivid-pink text-white border-black"
                  : ""
              } w-fit rounded-full px-2 border shadow-make-cartoonish-1`}
            >
              ID: {targetId}
            </span>
            <p className="title-small">{`ธิดาพร ชาวคูเวียง (${
              targetRole == "junior"
                ? "น้องค่าย"
                : targetRole == "senior"
                ? "พี่ค่าย"
                : undefined
            })`}</p>
            <p className="title-small">โรงเรียนเชียงใหม่ในดวงใจ</p>
          </div>
        </div>
        <hr className="my-4 border rounded-full" />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            placeholder="กรอกชื่อเล่นเป็นภาษาไทย"
            label="ชื่อเล่น"
            value={formData.nickname}
            onChange={(e) => {
              e.preventDefault();
              setFormData((prev) => ({ ...prev, nickname: e.target.value }));
            }}
          />
          <div className="w-full flex items-center gap-2">
            <div className="w-full flex flex-col gap-1">
              <label className="label-large">
                <span className="font-semibold">ระดับการศึกษา</span>
              </label>
              <p
                className="min-w-0 w-full rounded-xl bg-grey border flex items-center px-3 py-1
                  outline-none text-black shadow-make-cartoonish title-small min-h-10"
              >
                {targetRole == "junior"
                  ? "มัธยม"
                  : targetRole == "senior"
                  ? "มหาลัย"
                  : ""}
              </p>
            </div>
            <div className="w-fit flex flex-col gap-1">
              <label className="label-large">
                <span className="font-semibold">ชั้นปีที่</span>
              </label>
              <DropdownMenu size="md" color="light-blue">
                <DropdownMenuTrigger>{formData.year}</DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    {YEAR_OPTIONS.map((year) => (
                      <DropdownMenuItem
                        key={year}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            year,
                          }))
                        }
                      >
                        {year}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JuniorSeniorSendingGift;
