import { STATUS } from "@/constants/projects/status"

export function getProjectsStatusLabels(): string[] {
  return STATUS.map((s) => s.label)
}
