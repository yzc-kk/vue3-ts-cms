<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      pageName="users"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    >
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      :default-info="defaultInfo"
      :modal-config="modalConfigRef"
      pageName="users"
      :title="contentTableConfig.btnTitle"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStore } from '@/store'
import { computed } from 'vue'

const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

// pageModal 相关的 hook 逻辑
// 处理密码的逻辑
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}

const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}

// 动态添加部门和角色列表
const store = useStore()
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  departmentItem!.options = store.state.entireDepartment.map((item) => {
    return {
      title: item.name,
      value: item.id
    }
  })

  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entireRole.map((item) => {
    return {
      title: item.name,
      value: item.id
    }
  })
  return modalConfig
})

// 调用 hook 获取公共变量和函数
const [pageModalRef, defaultInfo, handleEditData, handleNewData] = usePageModal(
  newCallback,
  editCallback
)
</script>

<style scoped></style>
