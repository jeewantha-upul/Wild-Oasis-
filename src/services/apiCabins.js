/* eslint-disable no-unused-vars */
import supabase from "./supabase.js";

export const getCabins = async () => {
  // gives from supabse API
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};
