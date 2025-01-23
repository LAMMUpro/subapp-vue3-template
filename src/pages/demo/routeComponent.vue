<template>
  <div style="margin-bottom: 10px;">
    <section class="-m-card lightgray">
      <h3 class="-m-title">在vue3中访问react18首页</h3>
    </section>
    <section style="margin-left: 16px;">
      <MicroApp
        _name="react18"
        _path="/react18/#/home"
      ></MicroApp>
    </section>
  </div>
  
  <div style="margin-bottom: 10px;">
    <section class="-m-card lightgray">
      <h3 class="-m-title">在vue3中访问react18路由</h3>
      <span>ps：同时react页面使用了派发组件</span>
    </section>
    <section style="margin-left: 16px;">
      <MicroApp
        _name="react18"
        _path="/react18/#/demo/micromainComponent"
      ></MicroApp>
    </section>
  </div>

  <div style="margin-bottom: 10px;">
    <section class="-m-card lightgray">
      <h3 class="-m-title">在vue3中访问vue2首页</h3>
    </section>
    <section style="margin-left: 16px;">
      <MicroApp
        _name="vue2"
        _path="/vue2/#/home"
      ></MicroApp>
    </section>
  </div>
  
  <div style="margin-bottom: 10px;">
    <section class="-m-card lightgray">
      <h3 class="-m-title">在vue3中访问vue2路由</h3>
      <span>ps：同时vue2页面使用了派发组件</span>
    </section>
    <section style="margin-left: 16px;">
      <MicroApp
        _name="vue2"
        _path="/vue2/#/demo/micromainComponent"
      ></MicroApp>
    </section>
  </div>
</template>

<script lang="ts" setup>
import MicroApp from 'micro-app-tools/vue3/MicroApp.vue';

</script>

<style lang="scss" scoped>
/** */
</style>
