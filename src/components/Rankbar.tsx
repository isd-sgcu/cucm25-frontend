import { Icon } from "@iconify/react";

interface RankBarProps {
  rank: 1 | 2 | 3;
  nickname: string;
  role: "junior" | "senior";
  name: string;
  year: string;
  points: number;
}

const RankBar: React.FC<RankBarProps> = ({
  rank,
  nickname,
  role,
  name,
  year,
  points,
}) => {
  const rankStyles = {
    1: { height: 250, bgColor: "bg-pink", icon: "solar:cup-star-linear" },
    2: {
      height: 200,
      bgColor: "bg-yellow",
      icon: "solar:medal-ribbon-star-linear",
    },
    3: {
      height: 150,
      bgColor: "bg-light-blue",
      icon: "solar:medal-ribbon-star-linear",
    },
  } as const;

  const { height, bgColor, icon } = rankStyles[rank];

  const roleTag = role === "junior" ? "N" : "P";

  return (
    <div className="flex flex-col gap-2 items-center justify-end">
      <Icon icon={icon} className="w-5 h-5" />
      <div
        className={`${bgColor} w-full flex flex-col justify-between px-1 py-3 rounded-2xl border shadow-make-cartoonish`}
        style={{ height }}
      >
        {/* Name */}
        <div className="flex flex-col items-center">
          <p className="title-medium text-center line-clamp-2">
            <span className="font-semibold">{nickname}</span>
          </p>
          <p className="label-small text-center line-clamp-2">{name}</p>
          <p className="label-small text-center line-clamp-2">
            {roleTag} #{year}
          </p>
        </div>

        {/* Points */}
        <div className="flex flex-col items-center">
          <p className="title-medium text-center">
            <span className="font-semibold">{points}</span>
          </p>
          <p className="label-small text-center">
            {points == 1 ? "Point" : "Points"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankBar;
