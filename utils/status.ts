import { STATUS } from "@/constants/projects/status"

export function getStatusLabels(): string[] {
  return STATUS.map((s) => s.label)
}
