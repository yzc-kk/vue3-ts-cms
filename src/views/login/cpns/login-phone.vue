<template>
  <div>
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phoneInfo.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phoneInfo.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const phoneInfo = reactive({
  number: '',
  code: ''
})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
