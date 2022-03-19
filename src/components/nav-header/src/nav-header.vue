<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="toggle">
      <expand v-if="collapse" />
      <fold v-else />
    </el-icon>
    <div class="content">
      <y-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserInfo from './user-info.vue'
import yBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

let props = defineProps<{
  collapse: boolean
}>()

let emits = defineEmits(['update:collapse'])

// 面包屑数据
const breadcrumbs = computed(() => {
  const store = useStore()
  const route = useRoute()
  const userMenus = store.state.login.userMenus
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})

const toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    margin-left: 20px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
