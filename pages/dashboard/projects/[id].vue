<script setup lang="ts">
import { theme } from "#tailwind-config"
import { STATUS } from "~/constants/tasks/status"
import { PRIORITIES } from "~/constants/tasks/priorities"

const route = useRoute()
const id = computed(() => Number(route.params.id))

const supabase = useSupabaseClient()

const { data: project, error } = await useAsyncData("project", async () => {
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

const loadingTasks = ref(false)
const tasks = ref([])

onMounted(async () => {
  try {
    loadingTasks.value = true

    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("project_id", id.value)

    if (data && !error) {
      tasks.value = data
    }
  } catch (error) {
    console.error(error)
  } finally {
    loadingTasks.value = false
  }
})

console.log(project.value)
</script>

<template>
  <div>
    <section class="border border-red-400">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
      <p>Due Date: {{ project.due_date }}</p>
      <UMeter
        :value="35"
        indicator
        icon="i-heroicons-chart-bar"
        label="Completed"
      />
    </section>

    <section class="border border-red-400 mt-10">
      <h2>Tasks</h2>
      <ul v-if="tasks.length > 0 && !loadingTasks">
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
              :style="{ background: STATUS[task.status].color }"
            ></span>
            {{ task.status }}
          </span>
          <UBadge :color="PRIORITIES[task.priority].color">
            {{ task.priority }}
          </UBadge>
        </li>
      </ul>
    </section>
  </div>
</template>
