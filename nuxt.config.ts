// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    build: {
      //transpile: ["vuetify"],
    },
    css: [
      "@/assets/scss/style.scss"
      //"@/assets/css/style.css"
    ],
    vite: {
      define: {
        "process.env.DEBUG": true,
      },
    },
})