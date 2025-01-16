/* eslint-disable no-unused-vars */

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pbfdhvdibuecxhakttuv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZmRodmRpYnVlY3hoYWt0dHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTEzMDMsImV4cCI6MjA1MjQyNzMwM30.ftoWPl7orhcFA_SKYyPUE6ztUsggtPN6S4fjxesS0A0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
