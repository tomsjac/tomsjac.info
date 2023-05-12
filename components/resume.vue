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
            tooltip: {title : 'Profil linkedin', content:'Retrouvez tous les informations sur mon parcours, mes formations, et mes attentes'},
            link: 'http://fr.linkedin.com/in/tomsjac',
            color: '#116be0',
            animation : 'tada'
        },
        { 
            name: 'resume',
            tooltip: {title : 'Curriculum vitae', content:'Gardez au chaud, ce beau PDF'},
            link: 'www.cv.fr',
            animation : 'pulse'
        },
        { 
            name: 'twitter',
            tooltip: {title : 'Twitter', content:'Compte Twitter pour me tenir à jour des nouveautés (Dev, Tech, Actualité)'},
            link: 'https://twitter.com/tomsjac',
            animation : 'jello'
        },
        { 
            name: 'github',
            tooltip: {title : 'GitHub', content :'Mon dépot public pour mes expériences, mes tests ...'},
            link: 'www.github.fr',
            animation : 'rubberBand'
        }
    ] as Array<menuModel>
</script>