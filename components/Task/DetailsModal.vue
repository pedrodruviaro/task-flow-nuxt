<script setup lang="ts">
const props = defineProps(["modelValue"])
const emits = defineEmits(["update:modelValue"])

const isTaskModalOpen = computed({
  get() {
    return props.modelValue
  },

  set(value) {
    emits("update:modelValue", value)
    return
  },
})
</script>

<template>
  <UModal v-model="isTaskModalOpen" prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base">Tarefa</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isTaskModalOpen = false"
          />
        </div>
      </template>
      <div>asoddo</div>
    </UCard>
  </UModal>
</template>
