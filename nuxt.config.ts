// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    app:{
        head: {
            viewport: 'width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86',
        }
    },
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