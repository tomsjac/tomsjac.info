<template>
    <div class="icons-box">
        Pour me vider  <span class="color">l'esprit</span>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="hobby"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { menuModel } from  "@/composables/dataModel/menuModel"

    const iconList = [
        { 
            name: 'movie',
            tooltip: 'J\'aime le cinéma',

        },
        { 
            name: 'mountainbike',
            tooltip: 'J\'aime le vélo',

        },
        { 
            name: 'cook',
            tooltip: 'J\'aime la cuisine',

        },
        { 
            name: 'travel',
            tooltip: 'J\'aime voyager',

        },
        { 
            name: 'lego',
            tooltip: 'J\'aime les légos',

        },
    ] as Array<menuModel>

</script>