// src/lib/profile.ts
import { supabase } from './supabaseClient'

export async function ensureProfile(userId: string, fullName = '') {
  const { data: existing } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (existing) return existing

  const { data, error } = await supabase
    .from('profiles')
    .insert({ user_id: userId, full_name: fullName })
    .select()
    .single()

  if (error) throw error
  return data
}
