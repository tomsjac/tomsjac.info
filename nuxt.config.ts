// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    app:{
        head: {
            viewport: 'width=device-width, initial-scale=0.1, maximum-scale=3.0, minimum-scale=0.1',
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