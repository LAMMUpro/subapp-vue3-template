<template>
  <div class="micromainComponent">
    <section class="card lightblue">
      <p class="title">SvgIcon图标</p>
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

    <section class="card lightcoral">
      <p class="title">BaseDialog弹窗</p>
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
.card {
  border-radius: 4px;
  padding: 10px 6px;
  margin-bottom: 10px;
  &.lightcoral {
    background-color: lightcoral;
  }
  &.lightblue {
    background-color: lightblue;
  }
  .title {
    position: relative;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    padding-left: 8px;
    margin-bottom: 8px;
    &::after {
      position: absolute;
      content: '';
      top: 50%;
      left: 0;
      width: 3px;
      height: 15px;
      transform: translate(0, -50%);
      background-color: #358cff;
    }
  }
}
</style>
