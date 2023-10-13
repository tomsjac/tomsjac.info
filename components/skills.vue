<template>
    <div class="icons-box">
        <h3>
          {{ $t('section.skill.title') }} <span class="color">{{ $t('section.skill.titleImportantItem') }}</span>
        </h3>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="skill"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
  import { menuModel } from  "@/composables/dataModel/menuModel"
  const { t } = useI18n();

  // List of information to display as icons
  const iconList = [
      {
          name: 'plan',
          tooltip: {title : t('section.skill.icons.plan.title'), content: t('section.skill.icons.plan.desc')},
          color: '#FFF5CF',
          animation : 'jello'
      },
      {
          name: 'php',
          tooltip: {title : t('section.skill.icons.php.title'), content: t('section.skill.icons.php.desc')},
          color: '#7377AD',
          animation : 'jello'
      },
      {
        name: 'laravel',
        tooltip: {title : t('section.skill.icons.laravel.title'), content: t('section.skill.icons.laravel.desc')},
        color: '#F72B1F',
        animation : 'jello'
      },
      {
        name: 'gitlab',
        tooltip: {title : t('section.skill.icons.gitlab.title'), content: t('section.skill.icons.gitlab.desc')},
        color: '#DC4128',
        animation : 'jello'
      },
      {
        name: 'docker',
        tooltip: {title : t('section.skill.icons.docker.title'), content: t('section.skill.icons.docker.desc')},
        color: '#119AD4',
        animation : 'jello'
      },
      {
        name: 'vuejs',
        tooltip: {title : t('section.skill.icons.vuejs.title'), content: t('section.skill.icons.vuejs.desc')},
        color: '#3FB27F',
        animation : 'jello'
      },
      {
        name: 'ninja',
        tooltip: {title : t('section.skill.icons.ninja.title'), content: t('section.skill.icons.ninja.desc')},
        color: '#A58CBD',
        animation : 'flip'
      },
  ] as Array<menuModel>
</script>