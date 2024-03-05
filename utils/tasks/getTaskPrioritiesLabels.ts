import { TASK_PRIORITIES } from "~/constants/tasks/priorities"
import type { TaskPriorities } from "~/types"

export function getTaskPrioritiesLabels(): string[] {
  let arr = []

  for (const item in TASK_PRIORITIES) {
    const label = TASK_PRIORITIES[item as TaskPriorities].label
    arr.push(label)
  }

  return arr
}
