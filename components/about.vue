<!--
Short presentation
-->
<template>
    <div class="about-box">
        <h1 class="firstline"><span class="color">{{ $t('section.about.firstname') }}</span> {{ $t('section.about.lastname') }}</h1>
        <h2 class="secondline">
            Je suis
            <span id='txt-rotate' class="color" data-period="1200">
                <span class="wrap"> {{ $t('section.about.jobs.projectManager') }}, {{ $t('section.about.jobs.lead') }}, {{ $t('section.about.jobs.dev') }} </span>
            </span>
            <span class="slash">|</span>
        </h2>
    </div>

    <img src="/img/separator_header.png" class="separator_header"  alt="-">
</template>

<script setup>
    import {txtRotate} from "@/composables/txtRotate";
    const { t } = useI18n();
    const contentTextRotate = [t('section.about.jobs.projectManager'), t('section.about.jobs.lead'), t('section.about.jobs.dev')];

    onMounted(() => {
        //Init text rotate (jobs)
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
    //padding-right: 60px;
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

        .firstline{
          font-weight:500;
          font-size: 50px;
        }

        .secondline{
          font-size: 20px;
        }

    }
}


/*for tabs and large phones*/
@include media-between("phone", "desktop") {
    .about-box{
        padding-left: 0;
    }
}

</style>