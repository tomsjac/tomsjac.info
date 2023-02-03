<template>
    <div class="about-box">
        <div class="firstline"><span class="color">Thomas </span>Jacquey</div>
        <div class="secondline">
            Je suis
            <span id='txt-rotate' class="color" data-period="1200">
                <span class="wrap"> Moi.</span>
            </span>
            <span class="slash">|</span>
        </div>
    </div>

    <img src="/img/separator_header.png" class="separator"  alt="-">                 
</template>

<script setup>
    import {txtRotate} from "@/composables/txtRotate";

    const contentTextRotate = ['Lead dev.' ,  'Développeur.', 'Chef de projet.'];

    onMounted(() => {
        var element = document.getElementById('txt-rotate');
        var period = element.getAttribute('data-period');
        txtRotate().start(element, contentTextRotate, period);
    })
</script>

<style lang="scss">

/** Include */
@import '/assets/scss/partials/variables';
@import '/assets/scss/partials/mixins';
@import '/assets/scss/partials/animations';

.about-box{
    z-index: 2;
    text-align: center;
    height: auto;
    padding-right: 60px;
    width: auto;

    .firstline{
        z-index: 2;
        font-weight:700;
        font-family: $font2;
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

    .txt-rotate > .wrap { 
        border-right: 0 solid #666 ;
    }
}

/** Responsive */

/*For devices with smaller width like mobile phone*/
@include media-max("phone") {   
    .about-box{
        padding-right: 0;
    }
}


/*for tabs and large phones*/
@include media-between("phone", "desktop") {
    .about-box{
        padding-left: 0;
    }
}

</style>