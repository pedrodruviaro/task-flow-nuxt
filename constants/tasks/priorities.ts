export type TaskPriorities = "low" | "mid" | "high"

export const TASK_PRIORITIES: Record<
  TaskPriorities,
  { color: string; label: string }
> = {
  low: {
    label: "Low",
    color: "green",
  },
  mid: {
    label: "Mid",
    color: "yellow",
  },
  high: {
    label: "High",
    color: "red",
  },
}
