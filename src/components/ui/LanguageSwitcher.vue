<template>
  <select v-model="$i18n.locale" class="lang-select">
    <option value="zh-CN">简体中文</option>
    <option value="zh-TW">繁體中文</option>
    <option value="en">English</option>
    <option value="ja">日本語</option>
  </select>
</template>

<script setup lang="ts"></script>

<style scoped>
.lang-select {
  background: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.3rem;
}
</style>