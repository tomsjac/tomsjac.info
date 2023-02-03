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
        tooltip: {title : 'Cinéma', content:'J\'aime Cinéma'},
      },
      {
        name: 'mountainbike',
        tooltip: {title : 'Vtt', content:'J\'aime le velo'},
      },
      {
        name: 'cook',
        tooltip: {title : 'Cuisiner', content:'J\'aime la cuisine'},
      },
      {
        name: 'travel',
        tooltip: {title : 'Voyage', content:'J\'aime la Voyager'},
      },
      {
        name: 'lego',
        tooltip: {title : 'Légo', content:'J\'aime les légos'},
      },
  ] as Array<menuModel>
</script>