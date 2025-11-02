export interface UserInterface {
  studentId: string;
  username: string;
  firstname: string;
  lastname: string;
  nickname: string;
  education_level: "มัธยม" | "มหาลัย" | "บัณฑิต";
  year: string;
  role: "junior" | "senior" | "moderator" | "superAdmin";
  school: string;
}