<!--
Icon management and display
-->
<template>
    <Popper hover placement="top">
        <div v-bind:class="(data.link)? 'svgIcon withLink' : 'svgIcon'"
             @click="target(data.link, true)"
             @dblclick="target(data.link, false)"
        >
            <inline-svg :src="'/img/icons/'+section+'/'+data.name+'.svg'" width="100%" height="100%"
                 @mouseenter="mouseOver($event, data.color, data.animation)"
                 @mouseleave="mouseDefault($event, data.color, data.animation)"
            />
        </div>

        <!-- Tooltips for icon-->
        <template #content>
            <div class='popper-title' v-html="data.tooltip.title"></div>
            <div class='popper-content' v-html="data.tooltip.content"></div>
            <div class='popper-doubleClk' v-if="displayMobile && data.link">{{ $t('tooltip.mobile') }}</div>
        </template>
    </Popper>
</template>

<script setup lang="ts">
    import {menuModel} from "@/composables/dataModel/menuModel"
    import Popper from "~/node_modules/vue3-popper";
    import isMobile from '~/node_modules/ismobilejs';
    import InlineSvg from '~/node_modules/vue-inline-svg';

    interface propsModel {
        data: menuModel,
        section: string
    }
    defineProps<propsModel>()

    //Detection env
    const displayMobile = (isMobile(window.navigator).phone || isMobile(window.navigator).tablet) as boolean;

    /**
     * When the cursor passes over the icon
     * @param e event mouse
     * @param color
     * @param animation icon animation
     */
    function mouseOver(e: Event, color: string, animation: string) {
        _mouseIconEvent(e, 'add', animation, color);
    }

    /**
     * Default return of the icon
     * @param e event mouse
     * @param color
     * @param animation icon animation
     */
    function mouseDefault(e: Event, color: string, animation: string) {
        _mouseIconEvent(e, 'remove', animation, '#FFF');
    }

    /**
     * Mouse over icon management
     * @param e event mouse
     * @param action 'add' or 'remove'
     * @param animation icon animation
     * @param color
     */
    function _mouseIconEvent(e: Event, action: string,  animation: string, color: string){
        if (e.target.tagName !== 'svg') {
          return;
        }

        if (typeof animation !== 'undefined') {
            if(action === 'add'){
              e.target.classList.add('animate__animated', 'animate__' + animation)
            }else{
              e.target.classList.remove('animate__animated', 'animate__' + animation)
            }
        }

        if (typeof color !== 'undefined') {
          e.target.style.fill = color;
        }
    }

    /**
     * When you click on the icon
     * @param link
     * @param oneClick
     */
    function target(link: string, oneClick: boolean) {
        if (typeof link === 'undefined') {
            return
        }

        //Depending on the device, either click or double-click to open the link
        if (oneClick && (!isMobile(window.navigator).phone && !isMobile(window.navigator).tablet)) {
            window.open(link);
        } else if (!oneClick && (isMobile(window.navigator).phone || isMobile(window.navigator).tablet)) {
            window.open(link);
        }
    }
</script>


<style lang="scss">

:root {
  --popper-theme-background-color: #000000;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 15px;
  //--popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0);
}

.popper {
  .popper-title {
    font-size: 16px;
  }

  .popper-content {
    font-size: 14px;
  }

  .popper-doubleClk {
    font-size: 10px;
    margin-top: 5px;
  }
}

.svgIcon {
  width: 60px;
  height: 60px;
  padding: 10px 15px;
  opacity: .8;
  // animation-duration: 800ms;
  animation-delay: 0.3s;
}
</style>