<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content
      :content-table-config="contentTableConfig"
      pageName="role"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :default-info="defaultInfo"
      :modal-config="modalConfig"
      pageName="role"
      :title="contentTableConfig.btnTitle"
      :other-info="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          node-key="id"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { useStore } from '@/store'

import { usePageModal } from '@/hooks/use-page-modal'
import { ref, computed, nextTick } from 'vue'
import { menuMapLeafKeys } from '@/utils/map-menus'
import type { ElTree } from 'element-plus'

// 处理 pageModal 的 hook
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  // ref 还没绑定， 用 nextTick
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}
const [pageModalRef, defaultInfo, handleEditData, handleNewData] = usePageModal(
  undefined,
  editCallback
)

const store = useStore()
const menus = computed(() => store.state.entireMenu)
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style lang="less" scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
