<template>
  <div>
    <section class="-m-card lightgoldenrodyellow">
      <h3 class="-m-title">在vue3中访问react18路由</h3>
      <span>ps：同时react18页面使用了派发组件</span>
    </section>
    <MicroApp
      _name="react18"
      _path="/react18/#/home"
    ></MicroApp>
    <MicroApp
      _name="react18"
      _path="/react18/#/demo/micromainComponent"
    ></MicroApp>

    <section class="-m-card lightgoldenrodyellow">
      <h3 class="-m-title">在vue3中访问vue2路由</h3>
      <span>ps：同时vue2页面使用了派发组件</span>
    </section>
    <MicroApp
      _name="vue2"
      _path="/vue2/#/home"
    ></MicroApp>
  </div>
</template>

<script lang="ts" setup>
import MicroApp from 'micro-app-tools/vue3/MicroApp.vue';

</script>

<style lang="scss" scoped>
/** */
</style>
