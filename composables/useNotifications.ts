import type { NotificationColor } from "#ui/types"

interface Notify {
  title: string
  description?: string
  type: "success" | "error"
}

export function useNotifications() {
  const toast = useToast()

  function notify({ title, description, type }: Notify) {
    const styles = {
      icon: type === "success" ? "i-heroicons-check" : "i-heroicons-x-circle",
      color: type === "success" ? "green" : "red",
    }

    toast.add({
      title,
      description,
      icon: styles.icon,
      color: styles.color as NotificationColor,
    })
  }

  return { notify }
}
