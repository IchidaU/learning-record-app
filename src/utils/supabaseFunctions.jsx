import { supabase } from "./supabase";

export const getAllLogs = async () => {
    const logs = await supabase.from("study-record").select("*");
    return logs.data;
}