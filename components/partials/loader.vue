<!--
Application loading page
-->
<template>
    <div id="loader">
        <span class="color">{{ $t('section.about.firstname') }}</span>{{ $t('section.about.lastname') }}
    </div>
</template>

<script setup lang="ts">
  import gsap from "~/node_modules/gsap";

  onMounted(() => {
    setTimeout(function(){
      gsap.to('#loader',1,{y:"-100%"});
      gsap.to('#loader',1,{opacity:0});
      gsap.to('#loader',0,{display:"none",delay:1});
    }, 1000);
  })
</script>


<style lang="scss">
  /** Include */
  @import '/assets/scss/partials/variables';
  @import '/assets/scss/partials/mixins';

  #loader{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height:100vh;
      position: absolute;
      z-index:100;
      font-family: $font2;
      background-color: #202020;
      color: $text-color;
      font-size: 70px;
      width: 100%;
  }

  /** Responsive */

  /*For devices with smaller width like mobile phone*/
  @include media-max("phone") {
    #loader{
      font-size: 40px;
    }
  }

</style>