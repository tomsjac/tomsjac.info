<template>
    <div class="cursor" style="transform: translate3d(818.099px, 489.434px, 0px);"></div>
</template>

<style>
.cursor{
    height: 50px;
    width: 50px;
    display: block;
    border-radius: 50%;
    border: 1px solid whitesmoke;
    background: transparent;
    pointer-events: none;
    position: fixed;
    top: -25px;
    left: -25px;
    z-index: 10;
    opacity: .6;
    transition:  scale .5s ease;
}

.cursor-small{
    height: 50px;
    width: 50px;
    display: block;
    border-radius: 50%;
    border: 1px solid whitesmoke;
    background: transparent;
    pointer-events: none;
    position: fixed;
    top: -25px;
    left: -25px;
    z-index: 10;
    opacity: .6;
    transition:  scale .4s ease;
}
</style>
