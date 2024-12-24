<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="父节点：">
        <span class="text-readonly">{{ props.nodeData.parentName }}</span>
      </el-form-item>
      <el-form-item label="名称：">
        <span class="text-readonly">{{ props.nodeData.name }}</span>
      </el-form-item>
      <el-form-item label="类型：">
        <span class="text-readonly">{{ ['主应用', '子应用', '外链', '父级菜单', '权限按钮'][props.nodeData.targetType] }}</span>
      </el-form-item>

      <!-- 0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 -->
      <el-form-item label="路由路径：" v-if="[0, 1, 2].includes(props.nodeData.targetType)">
        <span class="text-readonly">{{ props.nodeData.path }}</span>
      </el-form-item>

      <el-form-item label="组件路径：" v-if="[0, 1].includes(props.nodeData.targetType)">
        <span class="text-readonly">{{ props.nodeData.componentStr }}</span>
      </el-form-item>

      <el-form-item label="图标：">
        <span class="text-readonly">{{ props.nodeData.icon }}</span>
      </el-form-item>
      <el-form-item label="排序号：">  
        <span class="text-readonly">{{ props.nodeData.sort }}</span>
      </el-form-item>
      <el-form-item label="是否显示：">
        <span class="text-readonly">{{ props.nodeData.hidden ? '隐藏': '显示' }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem } from 'element-plus';

const props  = defineProps({
    nodeData: {
        type: Object,
        required: true,
    },
})

</script>

<style lang="scss" scoped>
.text-readonly {
  color: #716969;
  font-size: 16px;
}
</style>
