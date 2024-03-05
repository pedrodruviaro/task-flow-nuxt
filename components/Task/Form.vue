<script setup lang="ts">
import { z } from "zod"
import { getTaskPrioritiesLabels } from "~/utils/tasks/getTaskPrioritiesLabels"
import { getTaskStatusLabels } from "~/utils/tasks/getTaskStatusLabels"
import type { FormSubmitEvent } from "#ui/types"
import type { Database } from "~/supabase"
import { getTaskPriorityValueByLabel } from "~/utils/tasks/getTaskPriorityValueByLabel"
import { getTaskStatusValueByLabel } from "~/utils/tasks/getTaskStatusValueByLabel"

const props = defineProps<{
  projectId: number
}>()

const emits = defineEmits<{
  (e: "submited", value: boolean): void
}>()

const schema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  priority: z.string({ required_error: "Priority is required" }),
  status: z.string({ required_error: "Status is required" }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  title: "",
  description: "",
  priority: "",
  status: "",
})

const isLoading = ref(false)
const { notify } = useNotifications()
const supabase = useSupabaseClient<Database>()

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true

    // supabase
    const { error } = await supabase.from("tasks").insert({
      project_id: props.projectId,
      title: state.title,
      description: state.description,
      priority: getTaskPriorityValueByLabel(state.priority || ""),
      status: getTaskStatusValueByLabel(state.status || ""),
    })

    if (!error) {
      emits("submited", true)

      notify({ title: "Task created!", type: "success" })
    }
  } catch (error) {
    notify({ title: "Failed to create the task", type: "error" })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    class="space-y-3"
    @submit="handleSubmit"
  >
    <UFormGroup label="Title" required name="title">
      <UInput placeholder="Refactor home page" v-model="state.title" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea placeholder="Description" v-model="state.description" />
    </UFormGroup>

    <UFormGroup label="Task Priority" required name="priority">
      <USelect :options="getTaskPrioritiesLabels()" v-model="state.priority" />
    </UFormGroup>

    <UFormGroup label="Task Status" required name="status">
      <USelect :options="getTaskStatusLabels()" v-model="state.status" />
    </UFormGroup>

    <UButton type="submit" :loading="isLoading">Create</UButton>
  </UForm>
</template>
