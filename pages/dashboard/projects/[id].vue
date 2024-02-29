<script setup lang="ts">
import { TASK_STATUS, type TaskStatus } from "~/constants/tasks/status"
import {
  TASK_PRIORITIES,
  type TaskPriorities,
} from "~/constants/tasks/priorities"
import type { Database } from "@/supabase"

const route = useRoute()
const id = computed(() => Number(route.params.id))

const supabase = useSupabaseClient<Database>()

const { data: project } = await useAsyncData("project", async () => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("id", id.value)
    .single()

  if (error) {
    throw createError({
      fatal: true,
      statusCode: 500,
      statusMessage: "Something went wrong, refresh and try again",
    })
  }

  return data
})

const { data: tasks } = await useAsyncData("tasks", async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("project_id", id.value)

  if (error) {
    throw createError({
      fatal: true,
      statusCode: 500,
      statusMessage: "Something went wrong, refresh and try again",
    })
  }

  return data
})

console.log(project.value)

const isSlideOverOpen = ref(false)
</script>

<template>
  <div>
    <!-- infos do projeto -->
    <section class="border border-red-400">
      <h2>{{ project?.title }}</h2>
      <p>{{ project?.description }}</p>
      <p>Due Date: {{ project?.due_date }}</p>
      <UMeter
        :value="35"
        indicator
        icon="i-heroicons-chart-bar"
        label="Completed"
      />
    </section>

    <!-- 4 blocos com o resumo das tarefas (4 status) -->
    <section></section>

    <!-- bloco de criacao de tarefa -->
    <section></section>

    <!-- Listagem das tarefas -->
    <section class="border border-red-400 mt-10">
      <h2>Tasks</h2>
      <ul v-if="tasks && tasks.length > 0">
        <li v-for="task in tasks" class="grid grid-cols-4 gap-2">
          <span>
            {{ task.title }}
          </span>
          <span>
            {{ task.description }}
          </span>
          <span class="flex items-center gap-2">
            <span
              class="block w-3 h-3 rounded-full"
              :style="{ background: TASK_STATUS[task.status as TaskStatus].color }"
            ></span>
            {{ TASK_STATUS[task.status as TaskStatus].label }}
          </span>
          <UBadge
            :color="TASK_PRIORITIES[task.priority as TaskPriorities].color"
          >
            {{ TASK_PRIORITIES[task.priority as TaskPriorities].label }}
          </UBadge>
        </li>
      </ul>
    </section>

    <!-- quando clicar, abrir a sidebar com as infos da tarefa -->
    <div>
      <UButton label="Open" @click="isSlideOverOpen = true" />

      <USlideover v-model="isSlideOverOpen">
        <div class="p-4 w-screen flex-1"></div>
      </USlideover>
    </div>
  </div>
</template>
