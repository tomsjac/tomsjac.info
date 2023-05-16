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
          tooltip: {title : 'Réflexion', content:'Suivi de projet, Expertise, Estimation'},
          color: '#FFF5CF',
          animation : 'jello'
      },
      {
          name: 'php',
          tooltip: {title : 'PHP', content:'Language principalement utilisé depuis mes débuts'},
          color: '#7377AD',
          animation : 'jello'
      },
      {
        name: 'laravel',
        tooltip: {title : 'Laravel', content:'Outils principal pour mes développements d\'application'},
        color: '#F72B1F',
        animation : 'jello'
      },
      {
        name: 'gitlab',
        tooltip: {title : 'GitLab', content:'Idéal pour gérer le déploiment des projets et suivre l\'équipe technique'},
        color: '#DC4128',
        animation : 'jello'
      },
      {
        name: 'docker',
        tooltip: {title : 'Docker', content:'Peut importe votre système d`\'exploitation, tout le monde code dans le même environment'},
        color: '#119AD4',
        animation : 'jello'
      },
      {
        name: 'vuejs',
        tooltip: {title : 'VueJS', content:'Comme il n\'y as pas que le backend qui compte, Faissons un peu de front'},
        color: '#3FB27F',
        animation : 'jello'
      },
      {
        name: 'ninja',
        tooltip: {title : 'Ninja', content:'Trouve toujours une solution pour s\'en sortir et aime apprendre'},
        color: '#A58CBD',
        animation : 'flip'
      },
  ] as Array<menuModel>
</script>