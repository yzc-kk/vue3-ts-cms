<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><circle-close /></el-icon>
            退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>
            <el-icon><user /></el-icon>用户信息</el-dropdown-item
          >
          <el-dropdown-item
            ><el-icon><tools /></el-icon>系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

const store = useStore()
const router = useRouter()
const name = computed(() => store.state.login.userInfo.name)

// 退出登录
const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/main')
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
  }
}
</style>
