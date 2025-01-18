import { supabase } from './supabase';

export const getAllLogs = async () => {
  const logs = await supabase.from('study-record').select('*');
  return logs.data;
};

export const addRecord = async (title, time) => {
  await supabase
    .from('study-record')
    .insert([{ title: title, time: time }])
    .select();
};
