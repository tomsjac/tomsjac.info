<template>
    <div class="icons-box">
        Pour mieux me <span class="color">connaitre</span>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="resume"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
   import { menuModel } from  "@/composables/dataModel/menuModel"

    const iconList = [
        { 
            name: 'linkedin',
            tooltip: {title : 'linkedin', content:'Mon lien linkedin'},
            link: 'www.linkedin.fr'
        },
        { 
            name: 'resume',
            tooltip: {title : 'Cv', content:'<strong>Cv PDF</strong> A télécharger'},
            link: 'www.cv.fr'
        },
        { 
            name: 'twitter',
            tooltip: {title : 'Twitter', content:'Compte qui me sert de R&D'},
            link: 'www.twitter.fr'
        },
        { 
            name: 'github',
            tooltip: {title : 'GitHub', content :'Toutes mes expériences, mes tests ....'},
            link: 'www.github.fr'
        }
    ] as Array<menuModel>
</script>