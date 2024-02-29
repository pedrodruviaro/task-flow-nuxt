<template>
  <main
    class="grid py-10 md:py-14 lg:grid-cols-[1fr_1.5fr] lg:py-0 lg:items-start xl:grid-cols-[1fr_1.15fr] xl:items-center"
  >
    <div class="hidden lg:block h-screen">
      <img
        src="/login-image.webp"
        alt=""
        class="object-cover object-right w-full h-full"
      />
    </div>

    <UContainer class="lg:py-20">
      <slot />
    </UContainer>
  </main>
</template>
