<template>
    <div class="about-box">
        <div class="firstline"><span class="color">Thomas </span>Jacquey</div>
        <div class="secondline">
            Je suis
            <span class="txt-rotate color" data-period="1200" data-rotate="[ &quot; Lead dev.&quot;, &quot; Dev.&quot;, &quot; Chef de projet.&quot; ]">
                <span class="wrap"> Blogger.</span>
            </span>
            <span class="slash">|</span>
        </div>
    </div>

    <div>
        <img src="/img/separator_header.png" style="margin-top: 20px;" >                 
    </div>
</template>

<script setup>


</script>

<style lang="scss">
.about-box{
    z-index: 2;
    text-align: center;
    height: auto;
    padding-right: 60px;
    width: auto;

    .firstline{
        z-index: 2;
        font-weight:700;
        font-family: poppins;
        font-size: 65px;
    }

    .secondline{
        z-index: 2;
        font-size: 30px;
        padding-top:20px ;
        font-weight:500;
        color: rgb(255, 255, 255,.8);
    }

    .slash{
      animation-name: animateslash;
      animation-duration: .8s;
      animation-iteration-count: infinite;
      animation-play-state: running;
  }
}

</style>