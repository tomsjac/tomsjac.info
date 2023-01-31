<template>
    <img :src="'/img/icons/'+section+'/'+data.name+'.svg'" class="svgIcon" >
</template>

<script setup lang="ts">
    import { menuModel } from  "@/composables/dataModel/menuModel"

    interface propsModel {
        data: menuModel,
        section: string
    }
    defineProps<propsModel>()


</script>


<style>
.svgIcon{
    width:50px;
    padding-right: 20px;
    fill:red !important;
    fill-rule: evenodd;
}
</style>