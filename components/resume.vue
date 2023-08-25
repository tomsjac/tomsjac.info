<template>
    <div class="icons-box">
        {{ $t('section.resume.title') }} <span class="color">{{ $t('section.resume.titleImportantItem') }}</span>
        <span class="icons-box-list withLink">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="resume"></PartialsIcon>
        </span>
    </div>
</template>

<script setup lang="ts">
   import { menuModel } from  "@/composables/dataModel/menuModel"
   const { t } = useI18n();

   // List of information to display as icons
   const iconList = [
        { 
            name: 'linkedin',
            tooltip: {title : t('section.resume.icons.linkedin.title'), content: t('section.resume.icons.linkedin.desc')},
            link: 'http://fr.linkedin.com/in/tomsjac',
            color: '#0A66C2',
            animation : 'tada'
        },
        { 
            name: 'resume',
            tooltip: {title : t('section.resume.icons.resume.title'), content: t('section.resume.icons.resume.desc')},
            link: 'https://github.com/tomsjac/resume.tomsjac.info/blob/089692182e36049bc97a3ae134852166bb779cf7/Thomas_JACQUEY_Resume.pdf',
            color: '#F48225',
            animation : 'pulse'
        },
        { 
            name: 'twitter',
            tooltip: {title : t('section.resume.icons.twitter.title'), content: t('section.resume.icons.twitter.desc')},
            link: 'https://twitter.com/tomsjac',
            color: '#5DA9DD',
            animation : 'jello'
        },
        { 
            name: 'github',
            tooltip: {title : t('section.resume.icons.github.title'), content: t('section.resume.icons.github.desc')},
            link: 'https://github.com/tomsjac/tomsjac.info',
            color: '#7067E6',
            animation : 'rubberBand'
        }
    ] as Array<menuModel>
</script>