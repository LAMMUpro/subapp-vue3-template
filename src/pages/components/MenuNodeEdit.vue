<template>
  <div class="MenuNodeEdit">
    <el-form label-width="130px">
        <el-form-item label="父节点：">
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
            >

            </el-tree-select>
        </el-form-item>
        <el-form-item label="节点名称：">
            <el-input v-model="dataMenuNodeEdit.nodeData.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>

        <!-- 0-主应用, 1-子应用, 2-外链, 3-父级菜单, 4-权限按钮 -->
        <el-form-item label="节点类型：">
            <el-radio-group v-model="dataMenuNodeEdit.nodeData.targetType">
                <el-radio :value="0">主应用</el-radio>
                <el-radio :value="1">子应用</el-radio>
                <el-radio :value="2">外链链接</el-radio>
                <el-radio :value="3">父级菜单</el-radio>
                <el-radio :value="4">权限按钮</el-radio>
            </el-radio-group> 
        </el-form-item>

        
        <el-form-item label="路由路径：" v-if="[0, 1, 2].includes(dataMenuNodeEdit.nodeData.targetType)">
            <el-input v-model="dataMenuNodeEdit.nodeData.path" placeholder="请输入路由路径"></el-input>
        </el-form-item>


        <el-form-item label="菜单图标：" v-if="[0, 1, 2, 3].includes(dataMenuNodeEdit.nodeData.targetType)">
            <el-input v-model="dataMenuNodeEdit.nodeData.icon" placeholder="请输入菜单图标">
                <template #append>
                    <el-select v-model="dataMenuNodeEdit.nodeData.icon" placeholder="Select" style="width: 115px">
                        <el-option label="Restaurant" value="1" />
                        <el-option label="Order No." value="2" />
                        <el-option label="Tel" value="3" />
                    </el-select>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="节点排序号：">
            <el-input-number v-model="dataMenuNodeEdit.nodeData.sort" :min="0" :max="1000" step-strictly />
        </el-form-item>
        <el-form-item label="菜单是否显示：" v-if="[0, 1, 2, 3].includes(dataMenuNodeEdit.nodeData.targetType)">
            <el-switch
                :model-value="!dataMenuNodeEdit.nodeData.hidden"
                @update:model-value="dataMenuNodeEdit.nodeData.hidden=!dataMenuNodeEdit.nodeData.hidden"
                class="ml-2"
                width="60"
                inline-prompt
                active-text="显示"
                inactive-text="隐藏"
            />
        </el-form-item>
    </el-form>

    <div class="btn-group">
        <el-button type="primary" >提交</el-button>
        <el-button type="warning" >重置</el-button>
        <el-button type="default" >取消</el-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { shallowReactive, onMounted, watch } from 'vue';

const props  = defineProps({
    nodeData: {
        type: Object,
        required: true,
    },
    nodeTreeData: {
        type: Object,
        required: true,
    },
})

const dataMenuNodeEdit = shallowReactive({
    nodeData: shallowReactive({}),
})

watch(() => props.nodeData, () => {
    console.log('props.nodeData', props.nodeData)
    dataMenuNodeEdit.nodeData = shallowReactive(props.nodeData);
}, { immediate: true })

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
