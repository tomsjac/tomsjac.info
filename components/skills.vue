<template>
    <div class="icons-box">
        Quelques une de mes  <span class="color">compétences</span>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="skill"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
  import { menuModel } from  "@/composables/dataModel/menuModel"

  const iconList = [
      {
          name: 'plan',
          tooltip: {title : 'Réflexion', content:'J\'aime réfléchir'},
      },
      {
          name: 'php',
          tooltip: {title : 'PHP', content:'J\'aime php'},
      },
      {
        name: 'laravel',
        tooltip: {title : 'Laravel', content:'J\'aime Laravel'},
      },
      {
        name: 'gitlab',
        tooltip: {title : 'GitLab', content:'J\'aime Gitlab'},
      },
      {
        name: 'docker',
        tooltip: {title : 'Docker', content:'J\'aime Docker'},
      },
      {
        name: 'vuejs',
        tooltip: {title : 'VueJS', content:'J\'aime Vue'},
      },
      {
        name: 'ninja',
        tooltip: {title : 'Ninja', content:'J\'aime Tortue'},
      },
  ] as Array<menuModel>
</script>