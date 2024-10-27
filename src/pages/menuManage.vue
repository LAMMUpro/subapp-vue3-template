<template>
  <div class="menuManage">
    <section class="left">
        <el-scrollbar height="100%">
            <el-tree
                class="tree"
                default-expand-all
                :data="menuTreeData"
                :props="{
                    children: 'children',
                    label: 'name',
                }"
            >
                <template #default="{ node, data }">
                    <div class="node-label" @click="dataMenuNodeView.view(data)">
                        <span>{{ data.name }}</span>

                        <div>
                            <el-button text type="success" @click.stop="">新增</el-button>
                            <el-button text type="primary" @click.stop="dataMenuNodeEdit.edit(data)">编辑</el-button>
                            <el-button text type="danger" @click.stop="">删除</el-button>
                        </div>
                    </div>
                </template>

            </el-tree>
        </el-scrollbar>
    </section>
    <section class="right">
        <MenuNodeView
            v-if="dataMenuNodeView.show"
            :nodeData="dataMenuNodeView.nodeData"
        />
        <MenuNodeEdit
            v-if="dataMenuNodeEdit.show"
            :nodeData="dataMenuNodeEdit.nodeData"
            :nodeTreeData="menuTreeData"
        />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowReactive } from 'vue';
import MenuNodeEdit from './components/MenuNodeEdit.vue';
import MenuNodeView from './components/MenuNodeView.vue';

const menuTreeData = ref([
    {
      id: '4445',
      parentId: '0',
      children: [
        // {
        //   id: '555',
        //   parentId: '111',
        //   prefixName: '/主应用页面',
        //   name: '登录页',
        //   componentStr: '/login.vue',
        //   sort: 0,
        //   hidden: false,
        //   path: '/login',
        //   targetType: 0,
        // },
        // {
        //   id: '666',
        //   parentId: '111',
        //   prefixName: '/主应用页面',
        //   name: '无菜单页面',
        //   componentStr: '/noMenu.vue',
        //   sort: 0,
        //   hidden: false,
        //   path: '/noMenu',
        //   targetType: 0,
        // },
        // {
        //   id: '667',
        //   parentId: '111',
        //   prefixName: '/主应用页面',
        //   name: '404页面',
        //   componentStr: '/404.vue',
        //   sort: 0,
        //   hidden: false,
        //   path: '/404',
        //   targetType: 0,
        // },
        {
          id: '667888',
          parentId: '111',
          prefixName: '/主应用页面',
          name: '在线预览网站',
          componentStr: '/404.vue',
          sort: 0,
          hidden: false,
          path: '/onlinePreview',
          targetType: 0,
        },
        // {
        //   id: '667',
        //   parentId: '111',
        //   prefixName: '/主应用页面',
        //   name: '派发组件源测试',
        //   componentStr: '/404.vue',
        //   sort: 0,
        //   hidden: false,
        //   path: '/demo/micromainComponent',
        //   targetType: 0,
        // },
        // {
        //   id: '667',
        //   parentId: '111',
        //   prefixName: '/主应用页面',
        //   name: 'lottie源测试',
        //   componentStr: '/demo/lottie.vue',
        //   sort: 0,
        //   hidden: false,
        //   path: '/demo/lottie',
        //   targetType: 0,
        // },
        {
          id: '667',
          parentId: '111',
          prefixName: '/主应用页面',
          name: 'react组件测试',
          componentStr: '/demo/reactComponent.vue',
          sort: 0,
          hidden: false,
          path: '/demo/reactComponent',
          targetType: 0,
        },
        {
          id: '667',
          parentId: '111',
          prefixName: '/主应用页面',
          name: 'vueFlow测试',
          componentStr: '/demo/vueFlow.vue',
          sort: 0,
          hidden: false,
          path: '/demo/vueFlow',
          targetType: 0,
        },
        {
          id: '667',
          parentId: '111',
          prefixName: '/主应用页面',
          name: '阿里低代码',
          componentStr: '/demo/lowcodeEngine.vue',
          sort: 0,
          hidden: false,
          path: '/demo/lowcodeEngine',
          targetType: 0,
        },
        {
          id: '667',
          parentId: '111',
          prefixName: '/主应用页面',
          name: '菜单管理',
          componentStr: '/menuManage.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/menuManage',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: '主应用页面',
      icon: 'Github',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '333',
          parentId: '111',
          prefixName: '/react子应用',
          name: '首页',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/home',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/react子应用',
          name: '派发组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/demo/micromainComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/react子应用',
          name: '路由组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/demo/routeComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/react18子应用',
          name: '404',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/404',
          targetType: 1,
        },
        {
          id: '333',
          parentId: '111',
          prefixName: '/react子应用',
          name: 'element',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/react18/#/demo/test-element',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: 'react子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: '首页',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/home',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: '派发组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/demo/micromainComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: '路由组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/demo/routeComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: '404',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/404',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue3子应用',
          name: 'react组件测试',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue3/#/demo/reactComponent',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: 'vue3子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: '首页',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/home',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: '派发组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/demo/micromainComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: '路由组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/demo/routeComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: '404',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/404',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2子应用',
          name: 'react组件测试',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2/#/demo/reactComponent',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: 'vue2子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
    {
      id: '111',
      parentId: '0',
      children: [
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2v子应用',
          name: '首页',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2v/#/home',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2v子应用',
          name: '派发组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2v/#/demo/micromainComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2v子应用',
          name: '路由组件',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2v/#/demo/routeComponent',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2v子应用',
          name: '404',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2v/#/404',
          targetType: 1,
        },
        {
          id: '222',
          parentId: '111',
          prefixName: '/vue2v子应用',
          name: 'react组件测试',
          componentStr: '/manage/center.vue',
          sort: 0,
          hidden: false,
          path: '/vue2v/#/demo/reactComponent',
          targetType: 1,
        },
      ],
      prefixName: '/',
      name: 'vue2+vite子应用',
      icon: 'https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg',
      sort: 0,
      hidden: false,
      targetType: 3,
    },
]);

const dataMenuNodeView = shallowReactive({
    show: false,
    nodeData: {},
    view(nodeData: any) {
        dataMenuNodeEdit.show = false;
        this.nodeData = nodeData;
        this.show = true;
    },
})

const dataMenuNodeEdit = shallowReactive({
    show: false,
    nodeData: {},
    edit(nodeData: any) {
        dataMenuNodeView.show = false;
        this.nodeData = nodeData;
        this.show = true;
    },
})

</script>

<style lang="scss" scoped>
.menuManage {
    display: flex;
    height: 80vh;
    background-color: white;
    .left {
        flex-basis: calc(10% + 300px);
        flex-shrink: 0;
        .tree {
            margin: 10px 14px;
        }
        .node-label {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            :deep(.el-button) {
                padding: 0;
            }
        }
    }
    .right {
        padding: 14px;
        flex-grow: 1;
        flex-shrink: 0;
        border-left: 1px solid #ebebeb;
    }
}
</style>
