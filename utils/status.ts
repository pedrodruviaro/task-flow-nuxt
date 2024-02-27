import { status } from "@/constants/projects/status"

export function getStatusLabels(): string[] {
  return status.map((s) => s.label)
}

export function getStatusValues(): string[] {
  return status.map((s) => s.value)
}
