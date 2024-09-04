<template>
  <div class="micromainComponent">
    <section class="-m-card lightblue">
      <span class="-m-title">SvgIcon图标</span>
      <MicroComponent
        _is="SvgIcon"
        style="margin-right: 6px"
        name="Github"
      ></MicroComponent>
      <MicroComponent
        _is="SvgIcon"
        style="margin-right: 6px"
        name="arrow-bottom"
      ></MicroComponent>
      <MicroComponent
        _is="SvgIcon"
        style="margin-right: 6px"
        name="docs-question"
      ></MicroComponent>
      <MicroComponent
        _is="SvgIcon"
        style="margin-right: 6px"
        name="zhanwei"
      ></MicroComponent>
    </section>

    <section class="-m-card lightcoral">
      <span class="-m-title">Dialog弹窗</span>
      <button
        class="btn"
        @click="dataBaseDialog.open()"
      >
        打开弹窗
      </button>
      <MicroComponent
        _is="BaseDialog"
        v-model="dataBaseDialog.show"
        title="主应用的弹窗"
      >
        <div>
          <div>默认插槽：{{ dataBaseDialog.formInfo.number }}</div>
          <button
            class="btn"
            style="background-color: lightskyblue"
            @click="dataBaseDialog.add()"
          >
            点击计数器加1
          </button>
        </div>
        <template #footer>
          <button
            class="btn"
            @click="dataBaseDialog.cancel()"
          >
            确定
          </button>
          <button
            class="btn"
            style="margin-left: 10px; background-color: rgb(241, 241, 241); color: gray"
            @click="dataBaseDialog.cancel()"
          >
            关闭
          </button>
        </template>
      </MicroComponent>
    </section>
  </div>
</template>

<script lang="ts" setup>
import MicroComponent from 'micro-app-utils/vue3/MicroComponent.vue';
import { reactive } from 'vue';
import { shallowReactive } from 'vue';

const dataBaseDialog = shallowReactive({
  show: false,
  formInfo: reactive({
    number: 1,
  }),
  add() {
    this.formInfo.number += 1;
  },
  open() {
    this.show = true;
  },
  cancel() {
    this.show = false;
  },
});
</script>

<style lang="scss" scoped>
.micromainComponent {
  .btn {
    background-color: rgb(35, 48, 224);
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 14px;
    color: white;
  }
}
</style>
