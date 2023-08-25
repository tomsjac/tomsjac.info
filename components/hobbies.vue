<template>
    <div class="icons-box">
        {{ $t('section.hobbie.title') }} <span class="color">{{ $t('section.hobbie.titleImportantItem') }}</span>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="hobby"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
  import { menuModel } from  "@/composables/dataModel/menuModel"
  const { t } = useI18n();

  // List of information to display as icons
  const iconList = [
      {
        name: 'movie',
        tooltip: {title : t('section.hobbie.icons.movie.title'), content: t('section.hobbie.icons.movie.desc')},
        color: '#E43100',
        animation : 'tada'
      },
      {
        name: 'mountainbike',
        tooltip: {title : t('section.hobbie.icons.mountainbike.title'), content: t('section.hobbie.icons.mountainbike.desc')},
        color: '#5D5C5A',
        animation : 'tada'
      },
      {
        name: 'cook',
        tooltip: {title : t('section.hobbie.icons.cook.title'), content: t('section.hobbie.icons.cook.desc')},
        color: '#D8B063',
        animation : 'tada'
      },
      {
        name: 'travel',
        tooltip: {title : t('section.hobbie.icons.travel.title'), content: t('section.hobbie.icons.travel.desc')},
        color: '#83CFD6',
        animation : 'tada'
      },
      {
        name: 'lego',
        tooltip: {title : t('section.hobbie.icons.lego.title'), content: t('section.hobbie.icons.lego.desc')},
        color: '#F0D864',
        animation : 'shakeY'
      },
  ] as Array<menuModel>
</script>