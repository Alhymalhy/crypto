<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
    <div class="mt-4 text-sm font-bold">
      Your additional content can be added with default slot, You may put as many content as you
      want here.
    </div> -->

  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/coinList">coinList</RouterLink>
  </nav> -->
  <div class="w-6/12 mx-auto py-12">
    <el-page-header>
      <!-- <template #breadcrumb>
        <el-breadcrumb separator="|">
          <el-breadcrumb-item>
            <RouterLink to="/">Home</RouterLink>
          </el-breadcrumb-item>

          <el-breadcrumb-item>
            <RouterLink to="/coinList">coinList</RouterLink>
          </el-breadcrumb-item>

          <el-breadcrumb-item>
            <RouterLink to="/about">About</RouterLink>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <RouterLink to="/coin/1">BitcoinInfo</RouterLink>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <RouterLink to="/about">123123</RouterLink>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template> -->
      <template #content>
        <span class="text-large font-600 mr-3"> Title </span>
      </template>
    </el-page-header>

    <RouterView />
  </div>
</template>

<style scoped></style>
