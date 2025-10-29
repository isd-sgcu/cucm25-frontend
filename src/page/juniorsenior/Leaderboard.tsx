import RankBar from "@/components/Rankbar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { LeaderboardUser } from "@/interface/user";
import { mockLeaderboardUsers, mockSeniorUser } from "@/utils/const";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function JuniorSeniorLeaderboard() {
  const user = mockSeniorUser;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [leaderboardFilter, setLeaderboardFilter] = useState(role);
  const [filteredLeaderboardUsers, setFilteredLeaderboardUsers] = useState<
    LeaderboardUser[]
  >([]);

  // Leaderboard Filter
  useEffect(() => {
    if (!leaderboardFilter) {
      setFilteredLeaderboardUsers(mockLeaderboardUsers);
      return;
    }

    const filteredUsers = mockLeaderboardUsers.filter(
      (u) => u.role === leaderboardFilter
    );
    setFilteredLeaderboardUsers(filteredUsers);
  }, [leaderboardFilter]);

  return (
    <div className="w-full h-fit min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full h-fit flex flex-col gap-6 bg-yellow border rounded-b-xl shadow-make-cartoonish mb-6 px-2 py-4">
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
          <h1 className="display-small truncate overflow-hidden whitespace-nowrap">
            <span className="font-medium">Leaderboard</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-fit flex bg-white flex-col flex-1 px-4">
        {/* Buttons */}
        <div className="grid grid-cols-[1fr_1fr] gap-2 w-full justify-center min-h-6 mb-4">
          <Button
            variant={leaderboardFilter != "senior" ? "outline" : "default"}
            color={leaderboardFilter != "senior" ? "black" : "vivid-pink"}
            className={`w-auto h-fit rounded-full transition-colors duration-200 ${
              leaderboardFilter == "senior" && "shadow-make-cartoonish-2"
            }`}
            onClick={() => {
              setLeaderboardFilter("senior");
            }}
          >
            พี่ค่าย
          </Button>
          <Button
            variant={leaderboardFilter != "junior" ? "outline" : "default"}
            color={leaderboardFilter != "junior" ? "black" : "vivid-pink"}
            className={`w-auto h-fit rounded-full transition-colors duration-200 ${
              leaderboardFilter == "junior" && "shadow-make-cartoonish-2"
            }`}
            onClick={() => {
              setLeaderboardFilter("junior");
            }}
          >
            น้องค่าย
          </Button>
        </div>

        {/* Leaderboard */}
        <div className="flex flex-col gap-4 w-full h-full mb-6">
          {/* Bars */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 w-full justify-center">
            {filteredLeaderboardUsers.map((u, idx) => {
              return (
                <RankBar
                  key={idx}
                  rank={idx + 1}
                  nickname={u.nickname}
                  role={u.role}
                  fullname={u.fullname}
                  year={u.year}
                  points={u.cumulative_points}
                />
              );
            })}
          </div>

          {/* Table */}
          <Container className="flex flex-col flex-1">
            {filteredLeaderboardUsers.slice(3, 31).length > 0 ? (
              <table className="w-full border-collapse border-spacing-y-2">
                <tbody>
                  {filteredLeaderboardUsers.slice(3, 31).map((u, idx) => (
                    <tr key={idx}>
                      <td className="title-small p-1">
                        <span className="font-semibold">{idx + 3}</span>
                      </td>
                      <td className="title-small p-1">{u.nickname}</td>
                      <td className="label-medium p-1">
                        {u.fullname} {u.role === "senior" ? "P" : "N"}#{u.year}
                      </td>
                      <td className="title-small p-1 text-right">
                        <span className="font-semibold">
                          {u.cumulative_points}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-black text-center title-medium">
                No data provided
              </p>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default JuniorSeniorLeaderboard;
