<template>
    <div id="cursor"></div>
</template>


<script setup lang="ts">
  import {cursor} from "@/composables/cursor";

  onMounted(() => {
    const pointer = document.querySelector('#cursor');

    //All
    window.addEventListener('mousemove', (e) => {
      cursor(pointer).cursormover(e);
    });

    //Icons
    const svgIcon  = document.querySelectorAll('.svgIcon');

    svgIcon.forEach((item) => {
      item.addEventListener("mouseover", (e) => {

        if(e.target.classList.contains('withLink')){
          cursor(pointer).cursorhoverlink(e);
        }else{
          cursor(pointer).cursorhover(e);
        }
      })

      item.addEventListener("mouseout", (e) => {
        cursor(pointer).cursor(e);
      })
    });
  })
</script>



<style lang="scss">
  /** Include */
  @import '/assets/scss/partials/variables';

  #cursor{
      height: 50px;
      width: 50px;
      display: block;
      border-radius: 50%;
      border: 1px solid $cursor-color-hover;
      background: transparent;
      pointer-events: none;
      position: fixed;
      top: -25px;
      left: -25px;
      z-index: 10;
      opacity: .6;
      transition:  scale .5s ease;
      transform: translate3d(818.099px, 489.434px, 0px);
  }
</style>
