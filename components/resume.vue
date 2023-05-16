<template>
    <div class="icons-box">
        Pour mieux me <span class="color">connaitre</span>
        <span class="icons-box-list withLink">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="resume"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
   import { menuModel } from  "@/composables/dataModel/menuModel"

    const iconList = [
        { 
            name: 'linkedin',
            tooltip: {title : 'Profil linkedin', content:'Retrouvez tous les informations sur mon parcours, mes formations, et mes attentes'},
            link: 'http://fr.linkedin.com/in/tomsjac',
            color: '#0A66C2',
            animation : 'tada'
        },
        { 
            name: 'resume',
            tooltip: {title : 'Curriculum vitae', content:'Gardez au chaud, ce beau PDF'},
            link: 'www.cv.fr',
            color: '#F48225',
            animation : 'pulse'
        },
        { 
            name: 'twitter',
            tooltip: {title : 'Twitter', content:'Compte Twitter pour me tenir à jour des nouveautés (Dev, Tech, Actualité)'},
            link: 'https://twitter.com/tomsjac',
            color: '#5DA9DD',
            animation : 'jello'
        },
        { 
            name: 'github',
            tooltip: {title : 'GitHub', content :'Mon dépot public pour mes expériences, mes tests ...'},
            link: 'https://github.com/tomsjac/tomsjac.info',
            color: '#7067E6',
            animation : 'rubberBand'
        }
    ] as Array<menuModel>
</script>