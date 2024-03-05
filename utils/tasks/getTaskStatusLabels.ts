import { TASK_STATUS } from "~/constants/tasks/status"
import type { TaskStatus } from "~/types"

export function getTaskStatusLabels(): string[] {
  let arr = []

  for (const item in TASK_STATUS) {
    const label = TASK_STATUS[item as TaskStatus].label
    arr.push(label)
  }

  return arr
}
