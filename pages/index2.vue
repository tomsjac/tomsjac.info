<template>
  <div>
    <h1>Welcome to the homepage <b>index</b></h1>
    
    <button @click="count++">You clicked me {{ count }} times.</button>

    <div class="row align-items-start">
      <div class="col">
        <h2>Icon 1</h2>
        <div class="card-deck">
          <Icon v-for="icon, index in icons1" :key="'icon1_'+index" :name="icon.name" v-on:iconBt="clickme"></Icon>
        </div>

        <h2>Icon 2</h2>
        <div class="card-deck">
          <Icon v-for="icon, index in icons2" :key="'icon2_'+index" :name="icon.name"></Icon>
        </div>
      </div>
      
      <div class="col">
        <h2>T'as cliqué</h2>
        <div class="card-deck">
          <Icon v-for="icon, index in iconClick" :key="'iconSelect_'+index" :name="icon.name"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>  

<script setup>
  import { ref } from 'vue'
  import { state } from "/traits/menu"

  state.menu[0].isActive = true;

  const count = ref(0)

  const icons1 = [
    { name: 'google' },
    { name: 'yahoo' },
    { name: 'github' },
    { name: 'gitlab' }
  ];

  const icons2 = [
    { name: 'php' },
    { name: 'laravel' },
    { name: 'vuejs' },
    { name: 'turtle' }
  ];

  const iconClick = ref([]);
  

  function clickme(name)
  {
    //iconClick.push({name : name});
    iconClick.value.push({name : name});
    console.log(iconClick.value);
  }

</script>
