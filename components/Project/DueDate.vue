<script setup lang="ts">
import { isPast } from "date-fns"

interface Props {
  dueDate: string
}

const props = defineProps<Props>()

const isDelayed = computed(() => {
  return isPast(props.dueDate)
})

const badgeStyles = computed(() => {
  return {
    variant: isDelayed.value ? "solid" : "soft",
    color: isDelayed.value ? "red" : "orange",
  }
})
</script>

<template>
  <div class="flex items-center gap-1">
    <UIcon name="i-heroicons-exclamation-triangle" v-if="isDelayed" />
    <UBadge :variant="badgeStyles.variant" :color="badgeStyles.color"
      ><strong class="pr-1">Due Date:</strong> {{ dueDate }}</UBadge
    >
  </div>
</template>
