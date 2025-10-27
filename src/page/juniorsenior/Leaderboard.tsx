import { useSearchParams } from "react-router-dom";

function JuniorSeniorLeaderboard() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  return (
    <div className="w-full min-h-screen h-fit bg-white flex flex-col">
      This is role {role} page
    </div>
  );
}

export default JuniorSeniorLeaderboard;
