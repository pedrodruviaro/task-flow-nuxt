<script setup lang="ts">
import { BASE_TITLE, BASE_DESCRIPTION } from "@/constants/siteInfos"

definePageMeta({
  layout: "auth",
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const { notify } = useNotifications()
const REDIRECT_URL = useRuntimeConfig().public.baseUrl

if (user?.value?.id) {
  router.push("/dashboard")
}

async function handleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",

    options: {
      redirectTo: `${REDIRECT_URL}/confirm`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })

  if (error) {
    notify({ title: "Failed to authenticate", type: "error" })
  }
}
</script>

<template>
  <section>
    <div class="flex flex-col justify-center text-center">
      <div class="flex items-center gap-4 mx-auto mb-6">
        <img src="/logo.svg" width="60" height="60" />
        <span class="font-semibold text-4xl md:text-6xl">{{ BASE_TITLE }}</span>
      </div>
      <h1 class="max-w-[50ch] text-xl">
        {{ BASE_DESCRIPTION }}
      </h1>
    </div>

    <UCard class="max-w-max mx-auto mt-10">
      <h2 class="text-center">Enter with your Google account</h2>
      <UButton
        @click="handleLogin"
        trailing-icon="i-heroicons-arrow-right-end-on-rectangle"
        size="xl"
        class="mx-auto flex mt-4"
        >Login</UButton
      >
    </UCard>
  </section>
</template>
