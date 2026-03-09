<template>
  <div id="app" :data-theme="theme">
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { APP_CONFIG } from '@/config';
import Header from '@/components/layout/Header.vue';

const theme = ref(APP_CONFIG.theme.default);

onMounted(() => {
  const saved = localStorage.getItem(APP_CONFIG.theme.storageKey);
  if (saved) theme.value = saved;
  else localStorage.setItem(APP_CONFIG.theme.storageKey, theme.value);
});
</script>

<style>
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  --card-bg: #f8f9fa;
}

[data-theme="dark"] {
  --bg-primary: #121212;
  --text-primary: #e0e0e0;
  --card-bg: #1e1e1e;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>