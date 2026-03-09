<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { APP_CONFIG } from '@/config';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  localStorage.setItem(APP_CONFIG.theme.storageKey, isDark.value ? 'dark' : 'light');
};

onMounted(() => {
  const saved = localStorage.getItem(APP_CONFIG.theme.storageKey);
  isDark.value = saved === 'dark';
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
});
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>