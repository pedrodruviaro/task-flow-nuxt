<script setup lang="ts">
import { STATUS } from "@/constants/projects/status"

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const activeFilter = ref("All Projects")
const projects = ref([])
const projectsByStatus = computed(() => {
  let projectsRelate: any = {}

  STATUS.forEach((l) => {
    if (!projectsRelate[l.label]) {
      projectsRelate[l.label] = []
    }
  })

  projectsRelate["All Projects"] = projects.value

  projects.value.forEach((p) => {
    projectsRelate[p.status].push(p)
  })

  return projectsRelate
})

const { data, pending } = await useAsyncData("projects", async () => {
  const response = await supabase
    .from("projects")
    .select()
    .eq("created_by", user?.value?.id)
    .order("due_date", { ascending: true })

  if (response.data) {
    return response.data
  } else {
    throw createError({
      fatal: true,
      statusCode: 500,
      statusMessage: "Something went wrong, refresh and try again",
    })
  }
})

if (data.value) {
  projects.value = data.value
}
</script>

<template>
  <section>
    <p v-if="pending">Loading...</p>
    <div class="flex items-center gap-2 mb-4 flex-wrap">
      <UButton
        :variant="activeFilter === 'All Projects' ? 'outline' : 'ghost'"
        color="gray"
        @click="activeFilter = 'All Projects'"
        >All Projects ({{ projectsByStatus["All Projects"].length }})</UButton
      >
      <UButton
        :variant="activeFilter === 'In Progress' ? 'outline' : 'ghost'"
        color="gray"
        @click="activeFilter = 'In Progress'"
        >In Progress ({{ projectsByStatus["In Progress"].length }})</UButton
      >
      <UButton
        :variant="activeFilter === 'On Hold' ? 'outline' : 'ghost'"
        color="gray"
        @click="activeFilter = 'On Hold'"
        >On Hold ({{ projectsByStatus["On Hold"].length }})</UButton
      >
      <UButton
        :variant="activeFilter === 'Complete' ? 'outline' : 'ghost'"
        color="gray"
        @click="activeFilter = 'Complete'"
        >Complete ({{ projectsByStatus["Complete"].length }})</UButton
      >
    </div>

    <div
      class="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      v-if="projectsByStatus[activeFilter].length > 0"
    >
      <ProjectCard
        v-for="project in projectsByStatus[activeFilter]"
        :key="project.title"
        :project="project"
      />
    </div>

    <div v-else>
      <h3 class="mt-6 pl-2">No projects here.</h3>
    </div>
  </section>
</template>
