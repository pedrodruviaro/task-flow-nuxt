import type { Database } from "./supabase"

export type Task = Database["public"]["Tables"]["tasks"]["Row"]
export type TaskPriorities = "low" | "mid" | "high"
export type TaskStatus = "completed" | "on_review" | "in_progress"
export type Project = Database["public"]["Tables"]["projects"]["Row"]
