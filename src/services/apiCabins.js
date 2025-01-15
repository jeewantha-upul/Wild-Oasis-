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

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const createCabin = async (newCabin) => {
  const { data, error } = await supabase
    .from("cabins")
    // .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not create a new Cabin");
  }

  return data;
};
