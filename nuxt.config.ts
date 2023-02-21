// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    app:{
        head: {
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
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