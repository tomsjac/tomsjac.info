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
    modules: [
        '@nuxtjs/i18n',
    ],
    css: [
      "@/assets/scss/style.scss",
      'animate.css/animate.min.css'
      //"@/assets/css/style.css"
    ],
    vite: {
      define: {
        "process.env.DEBUG": true,
      },
    },
    experimental: {
      payloadExtraction: true
    },
    i18n: {
        vueI18n: './i18n.config.ts' // if you are using custom path, default
    }
})