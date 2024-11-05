<template>
  <div class="menuManage h-[var(--sub-app-container-height)] lt-md:(justify-center h-full)">
    <section class="left">
      <div class="btn-div">
        <el-button class="btn" type="primary" size="small" @click="dataMenuNodeEdit.edit()">新增节点</el-button>
      </div>
      <el-scrollbar class="scrollbar">
        <el-tree
          class="tree"
          default-expand-all
          :data="dataMenuManage.menuTreeData"
          :props="{
            children: 'children',
            label: 'name',
          }"
        >
          <template #default="{ data }">
            <div
              class="node-label"
              @click="dataMenuNodeView.view(data)"
            >
              <span>{{ data.name }}</span>

              <div>
                <el-button
                  text
                  type="success"
                  @click.stop="dataMenuNodeEdit.edit({ parentId: data.id })"
                  >新增下级</el-button
                >
                <el-button
                  text
                  type="primary"
                  @click.stop="dataMenuNodeEdit.edit(data)"
                  >编辑</el-button
                >
                <el-button
                  text
                  type="danger"
                  @click.stop="dataMenuNodeEdit.delete(data)"
                  >删除</el-button
                >
              </div>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </section>

    <section v-if="isDesktop" class="right">
      <MenuNodeView
        v-if="dataMenuNodeView.show"
        :nodeData="dataMenuNodeView.nodeData"
      />
      <MenuNodeEdit
        v-if="dataMenuNodeEdit.show"
        :nodeData="dataMenuNodeEdit.nodeData"
        :nodeTreeData="dataMenuManage.menuTreeData"
        @success="dataMenuNodeEdit.success()"
        @cancel="dataMenuNodeEdit.show = false"
      />
      <span v-if="!dataMenuNodeView.show && !dataMenuNodeEdit.show" class="text-readonly">点击左侧节点进行操作</span>
    </section>
    <template v-else-if="isPhone">
      <!-- 详情预览弹窗 -->
      <MicroComponent
        _is="ElDialog"
        v-model="dataMenuNodeView.show"
        title="节点详情查看"
      >
        <!-- //TODO, bug: 该组件下的element组件需要显式导入 -->
        <MenuNodeView
          v-if="dataMenuNodeView.show"
          :nodeData="dataMenuNodeView.nodeData"
        />
        <template #footer>
          <el-button type="default" size="default" @click="dataMenuNodeView.cancel()">关闭</el-button>
        </template>
      </MicroComponent>

      <!-- 新增/编辑弹窗 -->
      <MicroComponent
        _is="ElDialog"
        v-model="dataMenuNodeEdit.show"
        title="节点编辑"
      >
        <!-- //TODO, bug: 该组件下的element组件需要显式导入 -->
        <MenuNodeEdit
          v-if="dataMenuNodeEdit.show"
          :nodeData="dataMenuNodeEdit.nodeData"
          :nodeTreeData="dataMenuManage.menuTreeData"
          @success="dataMenuNodeEdit.success()"
          @cancel="dataMenuNodeEdit.show = false"
        />
      </MicroComponent>
    </template>
    
  </div>
</template>

<script lang="ts" setup>
import { shallowReactive } from 'vue';
import MenuNodeEdit from './components/MenuNodeEdit.vue';
import MenuNodeView from './components/MenuNodeView.vue';
import { deleteMenu, getMenuTree } from '@/api/menu';
import { onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import MicroComponent from 'micro-app-tools/vue3/MicroComponent.vue';
import { isDesktop, isPhone } from '@/hooks';

///////////////////////////////// 当前组件数据 ///////////////////////////////
const dataMenuManage = shallowReactive({
  menuTreeData: [],
  async getMenuTree() {
    const res = await getMenuTree();
    if (res.code == 1) {
      this.menuTreeData = res.data;
    }
  },
});

/** 获取组件树 */
onMounted(() => {
  dataMenuManage.getMenuTree();
});

///////////////////////////////// 节点查看 ///////////////////////////////
const dataMenuNodeView = shallowReactive({
  show: false,
  nodeData: {},
  view(nodeData: any) {
    dataMenuNodeEdit.show = false;
    this.nodeData = nodeData;
    this.show = true;
  },
  cancel() {
    this.show = false;
  },
});

///////////////////////////////// 节点编辑 ///////////////////////////////
const dataMenuNodeEdit = shallowReactive({
  show: false,
  nodeData: {},
  /** 新增/编辑 */
  edit(nodeData?: any) {
    dataMenuNodeView.show = false;
    this.nodeData = {...(nodeData || {})};
    this.show = true;
  },
  async delete(nodeData: any) {
    if (!nodeData.id) return;
    ElMessageBox.confirm(`是否删除【${nodeData.name}】节点及其子节点`, {
      title: '删除操作确认',
      type: 'warning',
      confirmButtonText: '确定删除',
    }).then(async() => {
      const res = await deleteMenu({ id: nodeData.id });
      if (res.code == 1) {
        ElMessage.success('删除成功');
        dataMenuManage.getMenuTree();
      }
    })
  },
  success() {
    dataMenuManage.getMenuTree();
    dataMenuNodeEdit.show = false;
    if (isDesktop) dataMenuNodeView.view(this.nodeData);
  },
});
</script>

<style lang="scss" scoped>
.menuManage {
  display: flex;
  background-color: white;
  overflow: hidden;
  .left {
    flex-basis: calc(10% + 300px);
    .btn-div {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 14px;
    }
    .scrollbar {
      height: calc(100% - 40px);
      .tree {
        margin: 10px 14px;
      }
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
    flex: 1;
    border-left: 1px solid #ebebeb;
  }
  .text-readonly {
    color: #716969;
    font-size: 16px;
  }
}
</style>
