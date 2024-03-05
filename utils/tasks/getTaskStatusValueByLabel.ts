import { TASK_STATUS } from "~/constants/tasks/status"
import type { TaskStatus } from "~/types"

export function getTaskStatusValueByLabel(label: string): string {
  let target = ""

  for (const item in TASK_STATUS) {
    const itemLabel = TASK_STATUS[item as TaskStatus].label

    if (itemLabel === label) {
      target = item
    }
  }

  return target
}
