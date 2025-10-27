import type { UserInterface } from "@/interface/user";

export const CHULALONGKORN_UNIVERSITY = "Chulalongkorn University";

export const mockJuniorUser: UserInterface = {
  studentId: "329102",
  username: "N001",
  firstname: "แคนคะนวย",
  lastname: "คงรวย คงทวยแทน",
  nickname: "หัวแคน",
  education_level: "5",
  year: "-",
  role: "junior",
  school: "Hua Can School",
};

export const mockSeniorUser: UserInterface = {
  studentId: "6612312321",
  username: "P001",
  firstname: "จ้าวทระนง",
  lastname: "คงทวย คงควรคอย",
  nickname: "หัวทวย",
  education_level: "1",
  year: "-",
  role: "senior",
  school: CHULALONGKORN_UNIVERSITY,
};
