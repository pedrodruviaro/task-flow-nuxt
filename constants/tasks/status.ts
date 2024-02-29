export type TaskStatus = "completed" | "on_review" | "in_progress"

export const TASK_STATUS: Record<TaskStatus, { color: string; label: string }> =
  {
    completed: {
      label: "Completed",
      color: "#00ff00",
    },
    on_review: {
      label: "On Review",
      color: "#ff02f2",
    },
    in_progress: {
      label: "In Progress",
      color: "#0000ff",
    },
  }
