import type { UserRoleType, EducationLevelType } from "./const";

export function convertDateToDateString(date: Date) {
  const thaiDate = date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${time} น. ${thaiDate}`;
}

export function formatEducationLevel({
  educationLevel, 
  year
} : {
  educationLevel: EducationLevelType;
  year: string;
}): string {
  switch (educationLevel) {
    case "มัธยม":
      return `ม. ${year}`;
    case "มหาลัย":
      if(year === "บัณฑิต") {
        return "บัณฑิต";
      } else {
        return `ปี ${year}`;
      }
    default:
      return "";
  }
}

export function formatRole(role: UserRoleType): string {
  switch (role) {
    case "junior":
      return "น้องค่าย";
    case "senior":
      return "พี่ค่าย";
    case "moderator":
      return "ผู้ดูแล";
    case "superAdmin":
      return "โทนี่";
    default:
      return "";
  }
}
