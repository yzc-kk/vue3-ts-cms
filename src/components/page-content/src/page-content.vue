<template>
  <div class="page-content">
    <y-table
      :propList="contentTableConfig.propList"
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          type="primary"
          size="default"
          v-if="isCreate"
          @click="handleNewClick"
          >{{ contentTableConfig.btnTitle }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="small"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><edit /></el-icon>
            编辑
          </el-button>
          <el-button
            size="small"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            ><el-icon><delete /></el-icon>删除</el-button
          >
        </div>
      </template>

      <!-- 在 page-content 中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </y-table>
  </div>
</template>

<script lang="ts" setup>
import yTable from '@/base-ui/table'
import { useStore } from '@/store'
import { ref, watch, computed } from 'vue'
import { usePermission } from '@/hooks/use-permission'

interface Props {
  contentTableConfig: InstanceType<typeof Object>
  pageName: string
  btnTitle?: string
}
const props = withDefaults(defineProps<Props>(), {
  btnTitle: ''
})
// const props = defineProps({
//   contentTableConfig: {
//     type: Object,
//     required: true
//   },
//   pageName: {
//     type: String,
//     required: true
//   },
//   btnTitle: {
//     type: String,
//     default: ''
//   }
// })

const store = useStore()

// 获取操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 双向绑定 pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())

const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()

defineExpose({
  getPageData
})

// vuex中获取数据
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
)

const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
)

// 获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig.propList.filter((item: any) => {
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

// 删除
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  })
}

const emit = defineEmits(['newBtnClick', 'editBtnClick'])
// 新建数据
const handleNewClick = () => {
  emit('newBtnClick')
}

// 编辑数据
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
