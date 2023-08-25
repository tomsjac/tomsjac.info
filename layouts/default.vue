<script setup>
  const { t } = useI18n();

  // Intitializing header project
  useHead({
    title: t('layout.title'),
    charset: 'utf-8',
    meta: [
      { name: 'description', content: t('layout.seo.description') }
    ],
    link: [
    //  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' }
    ],
    script: [
    //   { hid: 'particles', src: '', defer: true }
    ],
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