import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for API routes
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Types for our database
export interface Profile {
  id: string
  role: "candidate" | "recruiter" | "admin"
  email: string
  full_name: string | null
  avatar_url: string | null
  github_username: string | null
  linkedin_url: string | null
  location: string | null
  bio: string | null
  skills: string[]
  experience_years: number
  availability: boolean
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  company_id: string
  recruiter_id: string
  title: string
  description: string
  requirements: string[]
  skills_required: string[]
  experience_min: number
  experience_max: number
  salary_min: number | null
  salary_max: number | null
  location: string | null
  remote_allowed: boolean
  status: "draft" | "active" | "paused" | "closed"
  ai_matching_score: number
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_id: string
  candidate_id: string
  status: "pending" | "screening" | "interview" | "offer" | "rejected" | "hired"
  ai_match_score: number
  cover_letter: string | null
  resume_url: string | null
  applied_at: string
  updated_at: string
}
