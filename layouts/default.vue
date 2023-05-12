<script setup>
  import { state, menuTrait } from "../composables/menu"

  useHead({
    title: 'Jacquey Thomas - Chef de projet - Lead Dev - Dev',
    // or, instead:
    // titleTemplate: (title) => `My App - ${title}`,
    charset: 'utf-8',
    meta: [
      { name: 'description', content: 'My amazing site.' }
    ],
    link: [
    //  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' }
    ],
    script: [
       { hid: 'particles', src: 'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js', defer: true }
    ],
    bodyAttrs: {
      class: 'tomsjac'
    }
  })
</script>

<template>
  <PartialsLoader></PartialsLoader>
  <PartialsCursor></PartialsCursor>

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
      <PartialsParticles></PartialsParticles>
      <slot />
    </div>

    <div class="profile-image">
        <img src="/img/man.png" alt="profile">
    </div>

</template>   