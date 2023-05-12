<template>
    <div class="icons-box">
        Pour me vider  <span class="color">l'esprit</span>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="hobby"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
  import { menuModel } from  "@/composables/dataModel/menuModel"

  const iconList = [
      {
        name: 'movie',
        tooltip: {title : 'Cinéma', content:'Une bonne scéane avec un son dolby Atmos et un grand écran'},
        animation : 'tada'
      },
      {
        name: 'mountainbike',
        tooltip: {title : 'Vtt', content:'Idéal pour se vider l\'esprit et se faire plaisir en pleine nature'},
        animation : 'tada'
      },
      {
        name: 'cook',
        tooltip: {title : 'Cuisiner', content:'Oui c\'est un pêcher de gourmandise, je l\'avoue'},
        animation : 'tada'
      },
      {
        name: 'travel',
        tooltip: {title : 'Voyage', content:'Découvrir des nouvelles cultures, saveurs, lieux ...'},
        animation : 'tada'
      },
      {
        name: 'lego',
        tooltip: {title : 'Légo', content:'Qui n\'aime pas, il n\'y a pas d\'âge'},
        animation : 'shakeY'
      },
  ] as Array<menuModel>
</script>