<script setup>
  import { state } from "../composables/menu"

  state.menu[1].isActive = true;

</script>

<template>
  <section>
    <p>This page will be displayed at the <b>/about</b> route.</p>
  </section>
</template>

