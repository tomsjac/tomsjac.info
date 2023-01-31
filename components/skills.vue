<template>
    <div class="icons-box">
        Quelques une de mes  <span class="color">compétences</span>
        <span class="icons-box-list">
            <PartialsIcon  v-for="icon in iconList" :data="icon" section="skill"></PartialsIcon>
        </span>
    </div>
</template>

<script setup>

    const iconList = [
        { 
            name: 'plan',
            tooltip: 'J\'aime réfléchir',

        },
        { 
            name: 'php',
            tooltip: 'J\'aime php',

        },
        { 
            name: 'laravel',
            tooltip: 'J\'aime laravel',

        },
        { 
            name: 'gitlab',
            tooltip: 'J\'aime gitlab',

        },
        { 
            name: 'docker',
            tooltip: 'J\'aime docker',

        },
        { 
            name: 'vuejs',
            tooltip: 'J\'aime VueJs',

        },
        { 
            name: 'ninja',
            tooltip: 'Je suis un ninja',

        },
    ];
</script>