
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iowbjwjqiepxmlivveqb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvd2Jqd2pxaWVweG1saXZ2ZXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzY1NjIsImV4cCI6MjA2NTUxMjU2Mn0.c1UeJH7e-jOG2vybSJmrOGwIDmAaW6Rxgz3bbV7wl4U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
