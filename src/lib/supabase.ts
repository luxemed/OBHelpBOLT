import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pdzvcnzlffmbeyucjiuo.supabase.co';
declare const SUPABASE_ANON_KEY: string;
const supabaseAnonKey = (typeof SUPABASE_ANON_KEY !== 'undefined' ? SUPABASE_ANON_KEY : '') as string;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key existe:', supabaseAnonKey ? 'Sim (' + supabaseAnonKey.substring(0, 20) + '...)' : 'NAO');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'admin' | 'user';
export type UserStatus = 'pending' | 'approved' | 'blocked';

export interface UserProfile {
  id: string;
  email: string;
  nome: string;
  especialidade?: string;
  estado?: string;
  cidade?: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
}
