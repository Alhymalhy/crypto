<template>
  <div class="flex h-[80px] items-center gap-10">
    <RouterLink v-if="$route.name !== 'coinList'" to="/">
      <el-button :icon="ArrowLeft">К таблице</el-button>
    </RouterLink>
    <SearchInput class="m-0" />
    <CategoriesDropDown v-if="$route.name == 'coinList'" />
    <DarkModeBtn />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
</script>

<style scoped></style>
