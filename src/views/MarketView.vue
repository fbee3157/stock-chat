<template>
  <div class="market-view">
    <h2>{{ $t('nav.market') }}</h2>
    <div v-if="store.loading">加载中...</div>
    <div v-else>
      <div v-for="index in indices" :key="index.symbol" class="index-item">
        <span>{{ index.name }}</span>
        <span>{{ index.price }}</span>
        <span :class="{ up: index.changePercent >= 0, down: index.changePercent < 0 }">
          {{ index.changePercent >= 0 ? '▲' : '▼' }} {{ Math.abs(index.changePercent).toFixed(2) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMarketStore } from '@/stores/marketStore';
import { APP_CONFIG } from '@/config';

const store = useMarketStore();

onMounted(() => {
  store.loadIndices();
});

const indices = computed(() =>
  APP_CONFIG.globalIndices.map(idx => ({
    ...idx,
    price: store.getIndexPrice(idx.symbol),
    changePercent: store.getIndexChange(idx.symbol),
  }))
);
</script>

<style scoped>
.market-view {
  padding: 2rem;
}

.index-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.up { color: #28a745; }
.down { color: #dc3545; }
</style>