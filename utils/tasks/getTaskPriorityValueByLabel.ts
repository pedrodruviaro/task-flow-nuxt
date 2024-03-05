import { TASK_PRIORITIES } from "~/constants/tasks/priorities"
import type { TaskPriorities } from "~/types"

export function getTaskPriorityValueByLabel(label: string): string {
  let target = ""

  for (const item in TASK_PRIORITIES) {
    const itemLabel = TASK_PRIORITIES[item as TaskPriorities].label

    if (itemLabel === label) {
      target = item
    }
  }

  return target
}
