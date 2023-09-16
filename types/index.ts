/** @format */

export * from "./database";
export * from "./generated_supabase";

export interface UserData {
  id: string;
  hash: string;
  email: string;
}
