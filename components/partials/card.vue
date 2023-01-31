<template>
    <div class="card-deck">
        <div class="card bg-dark text-white mb-3" style="max-width: 18rem;">
            <div class="card-header">{{ name }}</div>
            <div class="card-boby">
                <p class="card-text">
                    <button @click="$emit('iconBt', name)" class="btn btn-success">Click me</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    //<Icon v-for="icon, index in icons1" :key="'icon1_'+index" :name="icon.name" v-on:iconBt="clickme"></Icon>


    defineProps({ 
        name: {
            type: String,
            default: 'Thomas'
        }
    })
    defineEmits(['iconBt'])
</script>