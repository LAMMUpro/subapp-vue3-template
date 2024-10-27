<template>
  <div>
    <el-form-item label="父节点">
        {{ props.nodeData.parentId }}
    </el-form-item>
    <el-form-item label="名称">
        {{ props.nodeData.name }}
    </el-form-item>
    <el-form-item label="类型">
        {{ !props.nodeData.targetType }}
    </el-form-item>

    <!-- 0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 -->
    <el-form-item label="路径" v-if="[0, 1, 2].includes(props.nodeData.targetType)">
        {{ !props.nodeData.path }}
    </el-form-item>

    

    <el-form-item label="图标">
        {{ props.nodeData.icon }}
    </el-form-item>
    <el-form-item label="排序号">  
        {{ props.nodeData.sort }}
    </el-form-item>
    <el-form-item label="是否显示">
        {{ !props.nodeData.hidden }}
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>

const props  = defineProps({
    nodeData: {
        type: Object,
        required: true,
    },
})

</script>

<style lang="scss" scoped>

</style>
