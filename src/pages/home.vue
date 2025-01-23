<template>
  <div>
    <section
      class="-m-card"
      style="text-align: center"
    >
      <MicroComponent
        _is="Lottie"
        width="50%"
        height="50%"
        :animation-link="getLottieJsonLink('front')"
      ></MicroComponent>

      <div>vue3子应用首页</div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import MicroComponent from 'micro-app-tools/vue3/MicroComponent.vue';
import { getLottieJsonLink } from '@/utils';

</script>

<style lang="scss" scoped>
@keyframes App-logo-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
}
.animation {
  display: inline-block;
  animation: App-logo-spin 20s linear infinite;
}
</style>
