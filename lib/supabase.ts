import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cnhtaniqrailgkbysfzm.supabase.co'
const supabaseKey = 'sb_publishable_--1QMJqhvQGb-lfJxc74gA_PvjEIEyd'

export const supabase = createClient(supabaseUrl, supabaseKey)
