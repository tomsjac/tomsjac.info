<script setup>
  import { state, menuTrait } from "../composables/menu"

  useHead({
    title: 'My App 2',
    // or, instead:
    // titleTemplate: (title) => `My App - ${title}`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: 'My amazing site.' }
    ],
    script: [
     // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
    //  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' }
    ],
    bodyAttrs: {
      class: 'test'
    }
  })
</script>

<template>
   <PartialsCursor></PartialsCursor>
   <PartialsLoader></PartialsLoader>
   <PartialsParticles></PartialsParticles>

   <!--
    <nav>
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="item, index in state.menu">
          <NuxtLink class="nav-link" :class='{"active": item.isActive}' :key="'menu'+index" @click='menuTrait().handleNavClick(index)' :to="item.to">{{item.title}}</NuxtLink>
        </li>
      </ul>      
    </nav>
  -->

    <div class="content">
       <slot />
    </div>

    <div class="profile-image">
        <img src="/img/man.png" alt="profile">
    </div>
</template>   