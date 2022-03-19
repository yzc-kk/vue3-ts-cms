<template>
  <div class="page-search">
    <y-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon><refresh /></el-icon><span>重置</span></el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><search /></el-icon><span>搜索</span></el-button
          >
        </div>
      </template>
    </y-form>
  </div>
</template>

<script lang="ts" setup>
import yForm from '@/base-ui/form'
import { ref } from 'vue'
let props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

let emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

// formData中的属性应该动态来决定
const formItems: any[] = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 重置
const handleResetClick = () => {
  // formData.value = formOriginData
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  emit('resetBtnClick')
}

// 搜索
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style lang="less" scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
