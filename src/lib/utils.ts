import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEducationLevel({
  educationLevel, 
  year
} : {
  educationLevel: "มัธยม" | "มหาลัย" | "บัณฑิต";
  year: string;
}): string {
  switch (educationLevel) {
    case "มัธยม":
      return `ม. ${year}`;
    case "มหาลัย":
      return `ปี ${year}`;
    case "บัณฑิต":
      return "บัณฑิต";
    default:
      return "";
  }
}

export function formatRole(role: "junior" | "senior" | "moderator" | "superAdmin"): string {
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