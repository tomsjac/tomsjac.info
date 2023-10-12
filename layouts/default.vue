<script setup>
  const { locale, t } = useI18n();

  // Intitializing header project
  useHead({
    title: t('layout.title'),
    charset: 'utf-8',
    meta: [
      { name: 'description', content: t('layout.seo.description')},
      { name: 'keywords', content: t('layout.seo.keywords')},
      { name: 'author', content: t('layout.seo.author')},
      { name: 'language', content: locale.value},
      { name: 'robots', content: 'index, follow'},
      { property:  'og:title', 'content':  t('layout.seo.ogTitle')},
      { property:  'og:image', 'content':  './img/favicons/favicon-196x196.png',},
      { property:  'og:url', 'content':  'https://www.tomsjac.info',},
    ],
    link: [
        { rel: 'canonical', href: 'https://www.tomsjac.info' },
        { rel: 'icon', type: 'image/x-icon', href: './img/favicons/favicon-32x32.png' }
    //  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' }
    ],
    script: [
    //   { hid: 'particles', src: '', defer: true }
    ],
    htmlAttrs: {
      lang: 'fr'
    },
    bodyAttrs: {
      class: 'tomsjac'
    }
  })
</script>

<template>
  <!-- Loading component -->
  <PartialsLoader></PartialsLoader>
  <!-- Mouse customization component -->
  <PartialsCursor></PartialsCursor>

    <div class="content">
      <!-- Particle component -->
      <PartialsParticles></PartialsParticles>
      <!-- Content -->
      <slot />
    </div>

    <!-- Profile image -->
    <div class="profile-image">
        <img src="/img/man.png" alt="profile">
    </div>

</template>   