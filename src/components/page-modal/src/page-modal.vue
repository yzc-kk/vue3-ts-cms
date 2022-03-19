<template>
  <div class="page-modal">
    <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      :title="title"
      width="30%"
      center
    >
      <y-form v-bind="modalConfig" v-model="formData"></y-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import yForm from '@/base-ui/form'
import { useStore } from '@/store'
import { ref, watch } from 'vue'

interface Props {
  modalConfig: InstanceType<typeof Object>
  defaultInfo?: InstanceType<typeof Object>
  otherInfo?: InstanceType<typeof Object>
  pageName: InstanceType<typeof String>
  title?: string
}
// withDefaults 给默认值
const props = withDefaults(defineProps<Props>(), {
  defaultInfo: () => ({}),
  otherInfo: () => ({}),
  title: ''
})

// const props = defineProps({
//   modalConfig: {
//     type: Object,
//     required: true
//   },
//   defaultInfo: {
//     type: Object,
//     default: () => ({})
//   },
//   otherInfo: {
//     type: Object,
//     default: () => ({})
//   },
//   pageName: {
//     type: String,
//     required: true
//   },
//   title: {
//     type: String,
//     default: ''
//   }
// })

const dialogVisible = ref(false)
const formData = ref<any>({})
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)
const store = useStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      editData: { ...formData.value, ...props.otherInfo },
      pageName: props.pageName,
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}

defineExpose({
  dialogVisible,
  formData
})
</script>

<style lang="less" scoped></style>
