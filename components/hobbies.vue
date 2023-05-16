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
        tooltip: {title : 'Cinéma', content:'Une bonne scéane avec un son dolby Atmos et un écran géant'},
        color: '#E43100',
        animation : 'tada'
      },
      {
        name: 'mountainbike',
        tooltip: {title : 'Vtt', content:'Idéal pour se vider l\'esprit et se faire plaisir en pleine nature'},
        color: '#5D5C5A',
        animation : 'tada'
      },
      {
        name: 'cook',
        tooltip: {title : 'Cuisiner', content:'Oui c\'est un pêcher de gourmandise, je l\'avoue'},
        color: '#D8B063',
        animation : 'tada'
      },
      {
        name: 'travel',
        tooltip: {title : 'Voyage', content:'Découvrir des nouvelles cultures, saveurs, lieux ...'},
        color: '#83CFD6',
        animation : 'tada'
      },
      {
        name: 'lego',
        tooltip: {title : 'Légo', content:'Qui n\'aime pas, il n\'y a pas d\'âge'},
        color: '#F0D864',
        animation : 'shakeY'
      },
  ] as Array<menuModel>
</script>