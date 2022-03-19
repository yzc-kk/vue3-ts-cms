<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs
      type="border-card"
      stretch
      class="login-panel-tabs"
      v-model="currentTab"
    >
      <el-tab-pane name="account">
        <template #label>
          <span
            ><el-icon><avatar /></el-icon>账号登录</span
          >
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span
            ><el-icon><cellphone /></el-icon>手机登录</span
          >
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick()"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

const isKeepPassword = ref<boolean>(false)
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()
const currentTab = ref('account')

// 2.定义方法
const handleLoginClick = () => {
  // console.log(currentTab.value)
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    // console.log('phoneRef调用loginAction')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 360px;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .account-control {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }

  .login-panel-tabs {
    width: 100%;
  }
  svg {
    width: 1em;
    height: 1em;
    position: relative;
    top: 1px;
    right: 2px;
  }
}
</style>
