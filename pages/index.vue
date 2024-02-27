<script setup lang="ts">
definePageMeta({
  redirect: "/dashboard",
})

const router = useRouter()

router.push("/dashboard")
</script>

<template>
  <h2>home</h2>
</template>
