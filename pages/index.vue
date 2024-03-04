<script setup lang="ts">
import { BASE_DESCRIPTION, BASE_TITLE } from "~/constants/siteInfos"

definePageMeta({
  layout: "landing-page",
})

useSeoMeta({
  title: "",
  description: BASE_DESCRIPTION,
})
</script>

<template>
  <header class="bg-white py-6">
    <UContainer
      ><span class="flex items-center gap-2">
        <img src="/logo.svg" width="30" height="30" />
        <span class="font-semibold text-xl md:text-2xl">{{ BASE_TITLE }}</span>
      </span></UContainer
    >
  </header>
  <section class="bg-white">
    <UContainer
      class="py-10 lg:py-16 grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-center"
    >
      <div>
        <h1 class="font-bold text-3xl lg:text-5xl max-w-[17ch]">
          One App To Manage Your Projects, Tasks and Business.
        </h1>
        <p class="text-lg my-4 lg:my-8 max-w-[50ch]">
          Lovely to look at and easy-to-use, Projećt gives teams a visual
          overview of who’s doing what, and what’s coming up next. That means
          less stress and better results.
        </p>
        <UButton size="lg" trailing-icon="i-heroicons-arrow-right">
          <NuxtLink to="/login">Login Now</NuxtLink></UButton
        >
      </div>
      <div>
        <NuxtImg
          src="/lp/hero-img.png"
          alt="Dashboard Image"
          width="646"
          height="500"
        />
      </div>
    </UContainer>
  </section>

  <section
    class="py-10 lg:py-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500"
  >
    <UContainer class="text-center">
      <span
        class="font-bold mb-4 block bg-white rounded-full max-w-max mx-auto px-4 py-1"
        >How it works</span
      >
      <h2 class="font-bold text-4xl text-white">Easy Steps to Get Started</h2>
      <p class="text-white text-lg mt-3 max-w-[55ch] mx-auto">
        Follow this steps below to start use of Projećt Software. For personal
        guide you can insert your mail here.
      </p>
    </UContainer>
  </section>

  <UContainer as="section" class="py-10 lg:py-16">
    <h2 class="text-center text-3xl font-bold">Frequently Ask Question</h2>
    <p class="text-lg max-w-[60ch] text-center my-7 mx-auto">
      Be a self-service superhero by providing your customers with an FAQ
      section through a company knowledge base. Read on to learn how.
    </p>

    <div class="max-w-[60ch] mx-auto">
      <UAccordion
        color="primary"
        variant="solid"
        size="xl"
        :items="[
          {
            label: '1. What is Nuxt UI?',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          },
          {
            label: '2. Getting Started',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          },
          {
            label: '3. Theming',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          },
          {
            label: '4. Components',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          },
        ]"
      />
    </div>
  </UContainer>

  <section class="bg-white py-10 lg:py-16">
    <UContainer
      as="section"
      class="py-10 bg-gradient-to-r from-sky-900 to-blue-900 rounded-xl text-white max-w-[60rem]"
    >
      <h2
        class="text-4xl lg:text-5xl font-bold text-center max-w-[30ch] mx-auto"
      >
        See everything the team is working on in
        <span class="text-orange-400">one place</span>
      </h2>
      <UButton
        size="xl"
        trailing-icon="i-heroicons-arrow-right"
        class="mx-auto max-w-max flex mt-10"
      >
        <NuxtLink to="/login"> Get Started Now </NuxtLink>
      </UButton>
    </UContainer>
  </section>

  <UiFooter />
</template>
