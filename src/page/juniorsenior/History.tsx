import { mockSeniorUser } from "@/utils/const";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function JuniorSeniorHistory() {
  const user = mockSeniorUser;
  const navigate = useNavigate();

  return (
    <div className="w-full h-fit min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full h-fit flex flex-col gap-6 bg-pink border rounded-b-xl shadow-make-cartoonish mb-6 px-2 py-4">
        {/* User Information */}
        <div className="flex gap-4 justify-between items-center">
          <div className="w-18 h-14 bg-black rounded-2xl"></div>
          <div className="flex flex-col items-end flex-wrap gap-0.5">
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
                {user.education_level == "มหาลัย" ? "ปี " : "ม."}
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
          <h1 className="display-small truncate overflow-hidden whitespace-nowrap">
            <span className="font-medium">ประวัติ</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-fit flex flex-col flex-1 px-4"></div>
    </div>
  );
}

export default JuniorSeniorHistory;
