<!--
Particle management and display (Package)
-->
<template>
  <div id="particles">
    <canvas id="particles-js-canvas-el"></canvas>
  </div>
</template>


<script setup>
  import {Particles} from "@/composables/particules.js";

  onMounted(() => {
    Particles.init({
      selector: '#particles-js-canvas-el',
      color: '#FFFFFF',
      connectParticles: true,
      maxParticules: 80,
      speed: 0.4,
      minDistance: 40,
      // options for breakpoints
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 30,
            minDistance: 40,
          }
        }
      ]
    });
  })
</script>

<style lang="scss">
  #particles {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background-size: cover;
    background-position: 50% 50%;
    display: block;
    opacity: 0.8;
  }
</style>