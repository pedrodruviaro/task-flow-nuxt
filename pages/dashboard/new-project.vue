<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

const categories = ["Website", "Android", "iOS"]

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

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
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
        :options="getStatusLabels()"
        v-model="state.status"
        placeholder="Project Status"
      />
    </UFormGroup>

    <UButton icon="i-heroicons-plus" type="submit">Create</UButton>
  </UForm>
</template>
