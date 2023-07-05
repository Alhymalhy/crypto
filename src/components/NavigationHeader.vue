<template>
  <div class="flex h-[80px] items-center gap-6">
    <RouterLink v-if="route.name !== 'coinList'" to="/">
      <el-button :icon="ArrowLeft">К таблице</el-button>
    </RouterLink>
    <SearchInput class="m-0" />
    <CategoriesDropDown v-if="route.name == 'coinList'" />
    <VSCurrSelect />
    <DarkModeBtn />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
</script>

<style scoped></style>
