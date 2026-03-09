<!-- src/views/SectorView.vue -->
<template>
  <div class="sector-view">
    <div class="controls">
      <input
        v-model="searchQuery"
        :placeholder="$t('sector.searchPlaceholder')"
        class="search-input"
      />
      <select v-model="sortKey" class="sort-select">
        <option value="change">{{ $t('sector.sortByChange') }}</option>
        <option value="volume">{{ $t('sector.sortByVolume') }}</option>
      </select>
    </div>

    <div class="chart-container" ref="chartRef"></div>

    <div class="sector-list">
      <div
        v-for="sector in filteredSectors"
        :key="sector.id"
        class="sector-item"
        :class="{ up: sector.change > 0, down: sector.change < 0 }"
      >
        <span class="name">{{ sector.name }}</span>
        <span class="change">{{ sector.change > 0 ? '▲' : '▼' }} {{ Math.abs(sector.change).toFixed(2) }}%</span>
        <span class="volume">{{ formatVolume(sector.volume) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useMarketStore } from '@/stores/marketStore';

// === 响应式状态 ===
const searchQuery = ref('');
const sortKey = ref<'change' | 'volume'>('change');
const chartRef = ref<HTMLDivElement | null>(null);

// === 模拟板块数据（实际可从 API 获取）===
const mockSectors = [
  { id: 'tech', name: '科技', change: 2.34, volume: 12500000000 },
  { id: 'finance', name: '金融', change: -1.21, volume: 8900000000 },
  { id: 'energy', name: '能源', change: 3.56, volume: 7200000000 },
  { id: 'health', name: '医疗', change: -0.89, volume: 5400000000 },
  { id: 'consumer', name: '消费', change: 1.78, volume: 6300000000 },
];

// === 计算属性 ===
const filteredSectors = computed(() => {
  let result = mockSectors.filter(s =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  result.sort((a, b) => {
    if (sortKey.value === 'change') {
      return b.change - a.change; // 涨幅降序
    } else {
      return b.volume - a.volume; // 成交量降序
    }
  });

  return result;
});

// === 格式化成交量 ===
const formatVolume = (vol: number): string => {
  if (vol >= 1e9) return (vol / 1e9).toFixed(2) + 'B';
  if (vol >= 1e6) return (vol / 1e6).toFixed(2) + 'M';
  return vol.toString();
};

// === 初始化 ECharts ===
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);
  updateChart();
};

const updateChart = () => {
  if (!chartInstance) return;
  const data = filteredSectors.value.slice(0, 5); // 取前5
  chartInstance.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(d => d.name) },
    yAxis: { type: 'value' },
    series: [{
      data: data.map(d => d.change),
      type: 'bar',
      itemStyle: {
        color: (params: any) => params.value >= 0 ? '#28a745' : '#dc3545'
      }
    }]
  });
};

// === 生命周期 & 监听 ===
onMounted(() => {
  initChart();
});

watch(filteredSectors, () => {
  updateChart();
});

// === 清理 ===
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped>
.sector-view {
  padding: 2rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input,
.sort-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: var(--card-bg);
  color: var(--text-primary);
}

.chart-container {
  height: 300px;
  margin: 1.5rem 0;
}

.sector-list {
  margin-top: 1rem;
}

.sector-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--card-bg);
}

.up { color: #28a745; }
.down { color: #dc3545; }

.name { flex: 1; }
.change { width: 100px; text-align: right; }
.volume { width: 100px; text-align: right; font-size: 0.9em; color: #888; }
</style>