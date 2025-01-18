/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import supabase from "./supabase.js";
import { supabaseUrl } from "./supabase.js";

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

export const createEditCabin = async (newCabin, id) => {
  // ---------------------------------  create or edit the cabin  -------------------------------------------------------------------------------------------------------
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // creating a unique image name to be save in the database
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // structure of the image saving url in database is like this
  // https://pbfdhvdibuecxhakttuv.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  // supabaseUrl = "https://pbfdhvdibuecxhakttuv.supabase.co";
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // create.edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Could not create a new Cabin");
  }

  // ---------------------------------  upload image ----------------------------------------------------------------------------------------
  // Upload file using standard upload

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }

  return data;
};
