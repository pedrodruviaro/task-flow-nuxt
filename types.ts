import type { Database } from "./supabase"

export type Task = Database["public"]["Tables"]["tasks"]["Row"]
export type Project = Database["public"]["Tables"]["projects"]["Row"]
