// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@nuxtjs/supabase"],

  colorMode: {
    preference: "light",
  },

  googleFonts: {
    families: {
      Inter: [400, 600, 700],
    },
  },

  supabase: {
    redirectOptions: {
      exclude: ["/"],
    },
  },
})
