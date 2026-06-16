// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2025-01-01',
    app:{
        head: {
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:300&display=swap' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:300&display=swap' },
            ],
        }
    },
    modules: [
        '@nuxtjs/i18n',
    ],
    css: [
      "@/assets/scss/style.scss",
      'animate.css/animate.min.css'
    ],
    experimental: {
      payloadExtraction: true
    },
    i18n: {
        // No URL prefix: single-page portfolio, locale switched in-app
        strategy: 'no_prefix',
        defaultLocale: 'fr',
        locales: [
            { code: 'fr', language: 'fr-FR', name: 'Français' },
            { code: 'en', language: 'en-US', name: 'English' },
        ],
        vueI18n: 'i18n.config.ts',
        bundle: {
            // Déprécié et source de bugs en v9, sera retiré en v10
            optimizeTranslationDirective: false,
        },
    }
})
