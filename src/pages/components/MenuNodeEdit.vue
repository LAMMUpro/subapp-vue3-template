<template>
  <div class="MenuNodeEdit">
    
    <el-form
      label-width="130px"
      :ref="(ref: any) => dataMenuNodeEdit.ref = ref"
      :model="dataMenuNodeEdit.nodeData"
      :rules="dataMenuNodeEdit.rules" 
    >
      <el-form-item label="父节点：" prop="parentId">
        <el-tree-select
          v-model="dataMenuNodeEdit.nodeData.parentId"
          :data="props.nodeTreeData"
          :render-after-expand="false"
          :props="{
            label: 'name',
            value: 'id',
          }"
          style="width: 240px"
          check-strictly
          clearable
        >
        </el-tree-select>
      </el-form-item>
      <el-form-item label="节点名称：" prop="name">
        <el-input
          v-model="dataMenuNodeEdit.nodeData.name"
          placeholder="请输入菜单名称"
        ></el-input>
      </el-form-item>

      <!-- 0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 -->
      <el-form-item label="节点类型：" prop="targetType">
        <el-radio-group v-model="dataMenuNodeEdit.nodeData.targetType">
          <el-radio :value="0">主应用页面</el-radio>
          <el-radio :value="1">子应用页面</el-radio>
          <el-radio :value="2">外链链接</el-radio>
          <el-radio :value="3">父级菜单</el-radio>
          <el-radio :value="4">权限按钮</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="路由路径："
        prop="path"
        v-if="[0, 1, 2].includes(dataMenuNodeEdit.nodeData.targetType)"
      >
        <el-input
          v-model="dataMenuNodeEdit.nodeData.path"
          placeholder="请输入路由路径"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="组件路径："
        prop="componentStr"
        v-if="[0, 1].includes(dataMenuNodeEdit.nodeData.targetType)"
      >
        <el-input
          v-model="dataMenuNodeEdit.nodeData.componentStr"
          placeholder="请输入vue文件相对路径"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="菜单图标："
        prop="icon"
        v-if="[0, 1, 2, 3].includes(dataMenuNodeEdit.nodeData.targetType)"
      >
        <el-input
          v-model="dataMenuNodeEdit.nodeData.icon"
          placeholder="请输入url或svg图标名称"
        >
          <template #append>
            <el-select
              v-model="dataMenuNodeEdit.nodeData.icon"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option
                v-for="(svgName, index) in svgIconList"
                :key="index"
                :value="svgName"
              >
                <MicroComponent _is="UseSvg" :name="svgName"></MicroComponent>
              </el-option>
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="节点排序号：" prop="sort">
        <el-input-number
          v-model="dataMenuNodeEdit.nodeData.sort"
          :min="0"
          :max="1000"
          step-strictly
        />
      </el-form-item>
      <el-form-item
        label="菜单是否显示："
        prop="hidden"
        v-if="[0, 1, 2, 3].includes(dataMenuNodeEdit.nodeData.targetType)"
      >
        <el-switch
          :model-value="!dataMenuNodeEdit.nodeData.hidden"
          @update:model-value="
            dataMenuNodeEdit.nodeData.hidden = !dataMenuNodeEdit.nodeData.hidden
          "
          class="ml-2"
          width="60"
          inline-prompt
          active-text="显示"
          inactive-text="隐藏"
        />
      </el-form-item>
    </el-form>

    <div class="btn-group">
      <el-button type="primary" @click="dataMenuNodeEdit.submit()">提交</el-button>
      <el-button type="warning" @click="dataMenuNodeEdit.reset()">重置</el-button>
      <el-button type="default" @click="emit('cancel')">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addMenu, updateMenu } from '@/api/menu';
import { ElMessage, FormInstance, ElForm, ElFormItem, ElInput, ElTreeSelect, ElRadio, ElRadioGroup, ElButton, ElSwitch, ElInputNumber, ElSelect, ElOption } from 'element-plus';
import { PropType } from 'vue';
import { computed } from 'vue';
import { shallowReactive, watch } from 'vue';
import MicroComponent from 'micro-app-tools/vue3/MicroComponent.vue';

const props = defineProps({
  /** 如果nodeData.id为空则为新增 */
  nodeData: {
    type: Object as PropType<any>,
    required: true,
  },
  nodeTreeData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'success'): void;
  (e: 'cancel'): void;
}>();

/** 表单模式： 'add' | 'edit' */
const mode = computed(() => {
  return !!props.nodeData.id ? 'edit' : 'add';
})

// TODO，动态获取
const svgIconList = ['Github', 'react', 'vue', 'zhanwei', 'docs-question', 'arrow-bottom'];

///////////////////////////////// 菜单节点数据 ///////////////////////////////
const dataMenuNodeEdit = shallowReactive({
  ref: undefined as undefined | FormInstance,
  nodeData: shallowReactive({} as any),
  rules: {
    parentId: [{ required: false, message: "请输入父节点", trigger: "blur" }],
    name: [{ required: true, message: "请输入节点名称", trigger: "blur" }],
    targetType: [{ required: true, message: "请选择节点类型", trigger: "blur" }],
    path: [{ required: true, message: "请输入路由路径", trigger: "blur" }],
    componentStr: [{ required: true, message: "请输入组件路径", trigger: "blur" }],
    sort: [{ required: true, message: "请输入排序号", trigger: "blur" }],
  },
  async submit() {
    this.ref?.validate(async valid => {
      if (!valid) return;
      const api = mode.value === 'add' ? addMenu : updateMenu;
      const res = await api(this.nodeData);
      if (res.code == 1) {
        ElMessage.success(mode.value === 'add' ? '新增节点成功': '节点编辑成功');
        emit('success');
      }
    });
  },
  /** 从组件参数重置表单, 清空校验结果 */
  reset() {
    dataMenuNodeEdit.nodeData = shallowReactive({
      sort: 0,
      ...props.nodeData,
    });
    dataMenuNodeEdit.ref?.clearValidate();
  },
});

watch(
  () => props.nodeData,
  () => {
    dataMenuNodeEdit.reset();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.MenuNodeEdit {
  .btn-group {
    margin-top: 14px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
