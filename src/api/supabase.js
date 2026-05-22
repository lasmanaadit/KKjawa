// src/api/supabase.js
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://dweiiqetoywchlkfzapd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7ca8gwXWu1E25S1Rsaz7Ow_Y_xGObZD';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});