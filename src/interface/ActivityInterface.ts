export interface ActivityInterface {
  activity_code: string;
  activity_name: string;
  reward_coin: number;
  reward_exp: number;
  max_usages: number;
  target_role: "junior" | "senior";
  created_at: string;
  expires_at: string;
}