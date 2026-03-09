<template>
  <header class="header">
    <div class="logo">stock.chat</div>
    <nav>
        <router-link to="/">{{ $t('nav.home') }}</router-link>
        <router-link to="/market">{{ $t('nav.market') }}</router-link>
        <router-link to="/sector">{{ $t('nav.sector') }}</router-link>
        <router-link to="/funds">{{ $t('nav.funds') }}</router-link>
    </nav>
    <div class="controls">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue';
import ThemeToggle from '@/components/layout/ThemeToggle.vue';
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--card-bg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: var(--text-primary);
}

.controls {
  display: flex;
  gap: 1rem;
}
</style>