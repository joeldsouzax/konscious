import { Database, Enums } from "@/types";
import { createClient } from "@supabase/supabase-js";

export * from "./qrcodegen";

export const normalUsers = ["MEMBER", "ANON"];

export const memberTypes: Array<{ value: Enums<"user_type">; label: string }> =
  [
    { value: "CELEBRITY", label: "Celebrity" },
    { value: "EXHIBITOR", label: "Exhibitor" },
    { value: "PARTICIPANT", label: "Participant for Summit" },
    { value: "PRESS", label: "Press" },
    { value: "PROTOCOL", label: "Protocol" },
    { value: "PUBLIC", label: "Public Attendant" },
    { value: "VIP", label: "VIP Card Holder" },
  ];

export const adminTypes = [
  "admin",
  "manager",
  "controller",
  "anon",
  "member",
] as const;
export type AdminTypes = (typeof adminTypes)[number];

export const adminOptions: Array<{ value: AdminTypes; label: string }> = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "controller", label: "Controller" },
];
