<!-- src/views/SectorView.vue -->
<template>
  <div class="sector-view">
    <h2>{{ $t('nav.sector') }}</h2>
    <div v-if="mock" class="sectors-grid">
      <div v-for="sector in mockSectors" :key="sector.id" class="sector-card">
        <h3>{{ sector.name }}</h3>
        <p :class="{ up: sector.change >= 0, down: sector.change < 0 }">
          {{ sector.change >= 0 ? '▲' : '▼' }} {{ Math.abs(sector.change).toFixed(2) }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mock = ref(true);
const mockSectors = [
  { id: 'tech', name: '科技', change: 2.34 },
  { id: 'finance', name: '金融', change: -1.21 },
  { id: 'energy', name: '能源', change: 3.56 },
  { id: 'health', name: '医疗', change: -0.89 },
  { id: 'consumer', name: '消费', change: 1.78 },
];
</script>

<style scoped>
.sector-view {
  padding: 2rem;
}

.sectors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.sector-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: var(--card-bg);
}

.sector-card h3 {
  margin: 0.5rem 0;
}

.up { color: #28a745; }
.down { color: #dc3545; }
</style>