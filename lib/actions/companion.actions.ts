"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { CreateCompanion } from "@/types";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");
  return data[0];
};

// export const createCompanion = async (formData: CreateCompanion) => {
//   const { userId: author } = await auth();
//   const supabase = createSupabaseClient();

//   const { data, error } = await supabase
//     .from("Companions")
//     .insert({ ...formData, author })
//     .select();

//   if (error) {
//     console.error("❌ Supabase insert error:", error);
//     throw new Error(error.message || "Failed to create a companion");
//   }

//   if (!data) {
//     console.error("❌ No data returned from Supabase.");
//     throw new Error("No companion created.");
//   }

//   console.log("✅ Companion created:", data);
//   return data[0];
// };

// export async function submitCompanion(values: CreateCompanionType) {
//   const data = await createCompanion(values);
//   return data;
// }
