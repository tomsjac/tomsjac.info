<template>
    <div class="icons-box">
        Pour mieux me <span class="color">connaitre</span>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="resume"></PartialsIcon>
        </span>
    </div>
</template>

<script setup>
    const iconList = [
        { 
            name: 'linkedin',
            tooltip: 'Mon lien linkedin',

        },
        { 
            name: 'resume',
            tooltip: 'Cv PDF',

        },
        { 
            name: 'twitter',
            tooltip: 'Twitter',

        },
        { 
            name: 'github',
            tooltip: 'Mon Github',

        }
    ];

</script>