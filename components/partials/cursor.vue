<template>
    <div id="cursor"></div>
</template>


<script setup lang="ts">
import {cursor} from "@/composables/cursor";

onMounted(() => {
    const pointer = document.querySelector('#cursor');

    //Cursor change
    window.addEventListener('mousemove', (e) => {
        cursor().cursorMover(e);
    });

    //The cursor reacts to certain items in passing
    const items = document.querySelectorAll('.svgIcon');
    items.forEach((item) => {
        item.addEventListener("mouseenter", (e) => {
            //The reaction is different with or without a link
            if (e.target.classList.contains('withLink')) {
                cursor().cursorHoverLink(e);
            } else {
                cursor().cursorHover(e);
            }
        })

        //Restore by default
        item.addEventListener("mouseleave", (e) => {
            cursor().cursorDefault(e);
        })
    });
})
</script>


<style lang="scss">
/** Include */
@import '/assets/scss/partials/variables';

#cursor {
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
  transition: scale .5s ease;
  transform: translate3d(818.099px, 489.434px, 0px);
}
</style>
