<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"
import { getProjectsStatusLabels } from "@/utils/projects/status"

const categories = ["Website", "Android", "iOS"]

// schema and form state
const schema = z.object({
  title: z.string({ required_error: "Title is requred" }),
  description: z.string({ required_error: "Description is required" }),
  due_date: z.string({ required_error: "Provide the due date" }),
  categories: z
    .string({ required_error: "Select the categories" })
    .array()
    .nonempty({ message: "Select at least one category" }),
  status: z.string({ required_error: "Select the project status" }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  title: undefined,
  description: undefined,
  due_date: undefined,
  categories: [],
  status: undefined,
})

// submit
const isLoading = ref(false)
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const router = useRouter()

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true

    const newProject: any = {
      title: event.data.title,
      description: event.data.description,
      due_date: event.data.due_date,
      status: event.data.status,
      categories: event.data.categories,
      created_by: user?.value?.id as string,
    }

    const { error, data } = await supabase
      .from("projects")
      .insert(newProject)
      .select()

    if (error) {
      throw new Error("Failed to create the project")
    }

    toast.add({
      title: "Project created!",
      color: "green",
      icon: "i-heroicons-check",
    })

    if (data && data[0].id) {
      router.push(`/dashboard/projects/${data[0].id}`)
    } else {
      router.push(`/dashboard/projects`)
    }

    state.title = undefined
    state.description = undefined
    state.due_date = undefined
    state.categories = []
    state.status = undefined
  } catch (error) {
    toast.add({
      title: "Failed to create the project",
      color: "red",
      icon: "i-heroicons-x-circle",
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <h1 class="text-xl font-bold mb-8">Create a new Project</h1>

  <UForm
    :schema="schema"
    :state="state"
    @submit="handleSubmit"
    class="space-y-2"
  >
    <UFormGroup required label="Title" name="title">
      <UInput v-model="state.title" placeholder="New app launch on store" />
    </UFormGroup>

    <UFormGroup required label="Description" name="description">
      <UTextarea
        v-model="state.description"
        placeholder="Describe the project main idea"
      />
    </UFormGroup>

    <UFormGroup required label="Date" name="due_date">
      <UInput type="date" v-model="state.due_date" />
    </UFormGroup>

    <UFormGroup required label="Categories" name="categories">
      <USelectMenu
        multiple
        :options="categories"
        v-model="state.categories"
        placeholder="Select the categories"
      />
    </UFormGroup>

    <UFormGroup required label="Status" name="status">
      <USelect
        :options="getProjectsStatusLabels()"
        v-model="state.status"
        placeholder="Project Status"
      />
    </UFormGroup>

    <UButton icon="i-heroicons-plus" type="submit" :loading="isLoading"
      >Create</UButton
    >
  </UForm>
</template>
