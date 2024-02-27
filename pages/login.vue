<script setup lang="ts">
const supabase = useSupabaseClient()

async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",

    options: {
      redirectTo: "http://localhost:3000/confirm",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })
}

async function logout() {
  const { error } = await supabase.auth.signOut()
}
</script>

<template>
  <div>
    <h2>Login with google</h2>
    <UButton
      @click="handleLogin"
      trailing-icon="i-heroicons-arrow-right-end-on-rectangle"
      size="lg"
      >Login</UButton
    >
    <!-- <UButton @click="logout">Logout</UButton> -->
  </div>
</template>
