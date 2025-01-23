<template>
  <div class="micromainComponent">
    <section class="-m-card">
      <span class="-m-title">vue3使用主应用的UseSvg</span>
      <MicroComponent
        _is="UseSvg"
        style="margin-right: 6px"
        name="Github"
      ></MicroComponent>
      <MicroComponent
        _is="UseSvg"
        style="margin-right: 6px"
        name="arrow-bottom"
      ></MicroComponent>
      <MicroComponent
        _is="UseSvg"
        style="margin-right: 6px"
        name="docs-question"
      ></MicroComponent>
      <MicroComponent
        _is="UseSvg"
        style="margin-right: 6px"
        name="zhanwei"
      ></MicroComponent>
    </section>

    <section class="-m-card">
      <span class="-m-title">vue3使用主应用的Dialog</span>
      <button
        class="btn"
        @click="dataBaseDialog.open()"
      >
        打开弹窗：{{ dataBaseDialog.formInfo.number }}
      </button>
      <MicroComponent
        _is="ElDialog"
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
          <section class="-m-card" style="margin-top: 10px;">
            <span class="-m-title">溢出滚动测试</span>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae delectus
              debitis corrupti dignissimos maxime nemo quasi ipsum ducimus exercitationem
              temporibus repellendus animi iure id neque, doloribus ab libero itaque
              accusamus, eveniet cumque laborum repudiandae? Voluptas reiciendis est
              alias! Ipsam sed nihil impedit maxime est amet minima atque itaque tenetur
              consectetur recusandae nisi quod quo quia molestiae reprehenderit
              dignissimos placeat aperiam, error dolor inventore dolorem. Consequuntur
              placeat distinctio aliquid sint? Magnam aperiam est iste? Doloribus magnam
              molestias consequuntur ut, amet, eos ipsum accusantium iste ab ex similique
              debitis veritatis voluptatem sed illo sunt rerum. Laudantium quibusdam,
              dignissimos voluptatum debitis eveniet cum velit delectus illum repellendus
              nam qui vero atque earum tempora odit culpa ea sed doloribus molestiae fuga
              neque. Molestias eaque ipsa minima! Adipisci iure aperiam provident! Tempora
              tenetur voluptatum, beatae non ipsa architecto illum rerum adipisci vero
              ratione soluta suscipit pariatur voluptas! Rem earum quasi hic, explicabo
              suscipit autem eligendi quia consequuntur vero excepturi, ex incidunt at
              fugit. Molestias ipsum ipsam minus modi assumenda, odit odio voluptatem
              nulla. Libero voluptatum magni recusandae aperiam asperiores doloribus
              delectus modi qui quam? Hic quam adipisci eveniet dicta, quo asperiores
              tenetur autem molestias aut optio sed pariatur unde. Exercitationem corporis
              consequuntur quos reiciendis ducimus inventore culpa rerum, corrupti, natus
              et fuga nesciunt expedita eveniet sed ut laudantium quas sit magnam ullam
              vero ea libero voluptatem dignissimos! Magni, porro iusto eum iste atque
              maxime accusamus id possimus doloribus quibusdam reprehenderit quasi
              laborum, corporis quia voluptates modi! Accusantium obcaecati, minima
              voluptatem architecto incidunt, asperiores odio a nesciunt, ipsa tenetur
              excepturi. Modi deserunt optio provident dolore atque, doloribus quis
              mollitia doloremque ducimus ratione suscipit necessitatibus iste tempora
              facere repudiandae quae numquam est ipsum. Impedit quas dolor, suscipit
              consequuntur soluta voluptates accusantium quasi esse eaque officiis
              voluptate laudantium dolorum doloribus rerum possimus alias qui id,
              accusamus doloremque distinctio labore iure placeat! Quam alias, eum
              corporis laborum, placeat ipsum ducimus ex illum unde ratione blanditiis
              iusto tempora obcaecati, distinctio veritatis pariatur quas sapiente saepe
              earum repudiandae quaerat voluptatum. Obcaecati perspiciatis ab architecto
              eaque amet, ea sit ex eum, saepe, praesentium reiciendis nostrum optio.
              Inventore cum tempora culpa nam. Autem soluta ipsam totam sit laudantium
              neque eius libero, eaque repellendus facilis ab dolor, accusantium a dolorem
              cumque? Blanditiis cum, modi, beatae ratione quasi, ipsum recusandae ex aut
              autem sit ullam exercitationem dicta ut impedit explicabo! Porro quisquam,
              nostrum labore minus ab fugit a tempora officiis quaerat enim perferendis
              cumque nihil, suscipit consectetur! Dolor esse nam quod blanditiis. Veniam
              facere perspiciatis quo nulla sapiente accusamus minima odio aperiam illo,
              laudantium architecto vitae impedit, quis velit quod quisquam laborum
              necessitatibus? Iusto eius, tempora corporis a officiis molestiae libero
              dolores illum aut ad provident ipsum placeat quis enim, sint delectus unde
              ab debitis autem rem labore obcaecati consectetur. Incidunt aliquam,
              officiis vel temporibus maxime laboriosam harum voluptatem vitae fuga magni
              necessitatibus, unde porro odit! Illum, deleniti cupiditate sint doloremque
              asperiores qui quasi, natus eligendi tenetur voluptates reprehenderit ex
              nobis molestiae architecto, quaerat odit iusto ipsum saepe. Iste fugit
              pariatur rerum possimus totam quia.
            </div>
          </section>
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

    <section class="-m-card">
      <span class="-m-title">vue3使用主应用的Tinymce</span>
      <MicroComponent _is="UseTinymce" v-model="tinymceValue"></MicroComponent>
      <button @click="() => console.log(tinymceValue)">点击打印对应值</button>
    </section>
  </div>
</template>

<script lang="ts" setup>
import MicroComponent from 'micro-app-tools/vue3/MicroComponent.vue';
import { reactive, ref } from 'vue';
import { shallowReactive } from 'vue';

const tinymceValue = ref('<div> <h1><strong>更新历史</strong></h1> <h2>1.2.0（排期中）</h2> <div>- 项目解耦</div> <div>&nbsp; - 将micro-app-tools独立成一个npm库</div> <div>- 动态菜单</div> <br> <h2>1.1.0（开发中）</h2> <div>- [wwj]react18子应用</div> <div>&nbsp; - 接入路由 ✔</div> <div>&nbsp; &nbsp; - 路由拦截 ✔</div> <div>- [cyc]主应用支持将Element组件注册成派发组件(按需加载) ✔</div> <div>- [cyc]vue2子应用 ✔</div> <div>&nbsp; - 路由 ✔</div> <div>- [cyc]vue3子应用 ✔</div> <div>&nbsp; - 路由 ✔</div> <div>- [cyc]线上demo ✔</div> <div>- [cyc]子应用复用主应用的404/403/login页面（派发组件形式） ✔</div> <div>- [cyc]输入url在线预览网址 ✔</div> <div>- 路由组件优化</div> <div>&nbsp; - 命名唯一性</div> <div>&nbsp; - 解决循环嵌套问题 ✔</div> <div>&nbsp; - 加载状态 ✔</div> <div>&nbsp; - 加载失败处理 ✔</div> <div>- 派发组件优化</div> <div>&nbsp; - 插槽渲染 ✔</div> <div>&nbsp; - 插槽参数传递 ✔</div> <div>&nbsp; - 插槽内数据响应式 ✔</div> <div>&nbsp; - 微前端多层嵌套下的事件穿透 ✔</div> <div>&nbsp; - react插槽局部更新</div> <div>&nbsp; - 销毁时机 ✔</div> <div>- 路由拦截</div> <h2>1.0.0</h2> <div>- 项目初始化</div> <div>&nbsp; - vitest 测试框架 ✔</div> <div>&nbsp; - monorepo 共享 microapp 工具 / shared ... ✔</div> <div>&nbsp; - micro-app-tools 基于 micro-app 的二次封装 ✔</div> <div>&nbsp; - shared 常用模块共享 ✔</div> <div>&nbsp; - sass ✔</div> <div>&nbsp; - router ✔</div> <div>&nbsp; - 公共组件 ✔</div> <div>&nbsp; &nbsp; - svg-icon ✔</div> <div>&nbsp; - Prettier 文件格式化(需要 vscode 安装 Prettier) ✔</div> <div>&nbsp; - eslint 代码规范(需要 vscode 安装 ESLint 2.4.4) ✔</div> <div>&nbsp; - element-plus (组件及样式按需引入) ✔</div> <div>&nbsp; - react18 子应用 ✔</div> </div>');

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
