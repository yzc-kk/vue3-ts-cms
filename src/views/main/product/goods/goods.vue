<template>
  <div class="goods">
    <page-content page-name="goods" :content-table-config="contentTableConfig">
      <template #image="scope">
        <el-image
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported
        ></el-image>
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style lang="less" scoped></style>
