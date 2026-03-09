<!-- src/views/FundsView.vue -->
<template>
  <div class="funds-view">
    <h2>{{ $t('funds.title') }}</h2>
    
    <div class="time-filter">
      <button
        v-for="period in periods"
        :key="period.value"
        @click="selectedPeriod = period.value"
        :class="{ active: selectedPeriod === period.value }"
      >
        {{ period.label }}
      </button>
    </div>

    <!-- 资金流概览图表 -->
    <div class="overview-chart" ref="overviewChartRef"></div>

    <!-- 行业资金流明细 -->
    <div class="detail-list">
      <div
        v-for="item in fundFlowData"
        :key="item.sector"
        class="detail-item"
        :class="{ inflow: item.net > 0, outflow: item.net < 0 }"
      >
        <span>{{ item.sector }}</span>
        <span>{{ formatMoney(item.net) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

// === 时间周期选项 ===
const periods = [
  { value: '1d', label: '1日' },
  { value: '5d', label: '5日' },
  { value: '1m', label: '1月' },
];

const selectedPeriod = ref('1d');

// === 模拟资金流数据 ===
const mockFundFlow = {
  '1d': [
    { sector: '科技', net: 12.5 },
    { sector: '金融', net: -8.2 },
    { sector: '新能源', net: 9.7 },
    { sector: '医药', net: -3.1 },
    { sector: '消费', net: 5.4 },
  ],
  '5d': [
    { sector: '科技', net: 35.2 },
    { sector: '金融', net: -12.8 },
    { sector: '新能源', net: 28.9 },
    { sector: '医药', net: -7.5 },
    { sector: '消费', net: 15.3 },
  ],
  '1m': [
    { sector: '科技', net: 120.5 },
    { sector: '金融', net: -45.2 },
    { sector: '新能源', net: 98.7 },
    { sector: '医药', net: -22.1 },
    { sector: '消费', net: 67.8 },
  ],
};

// === 响应式数据 ===
const fundFlowData = ref(mockFundFlow['1d']);
const overviewChartRef = ref<HTMLDivElement | null>(null);

// === 格式化金额（单位：亿元）===
const formatMoney = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}亿`;
};

// === 初始化概览图 ===
let overviewChart: echarts.ECharts | null = null;

const initOverviewChart = () => {
  if (!overviewChartRef.value) return;
  overviewChart = echarts.init(overviewChartRef.value);
  updateOverviewChart();
};

const updateOverviewChart = () => {
  if (!overviewChart) return;
  const totalIn = fundFlowData.value.filter(i => i.net > 0).reduce((sum, i) => sum + i.net, 0);
  const totalOut = Math.abs(fundFlowData.value.filter(i => i.net < 0).reduce((sum, i) => sum + i.net, 0));
  
  overviewChart.setOption({
    tooltip: { formatter: '{b}: {c}亿' },
    series: [{
      type: 'gauge',
      progress: { show: true },
      axisLine: {
        lineStyle: {
          width: 10,
          color: [[0.5, '#dc3545'], [1, '#28a745']]
        }
      },
      pointer: { show: false },
      detail: { valueAnimation: true, formatter: '{value}亿' },
      data: [{ value: totalIn - totalOut, name: '净流入' }]
    }]
  });
};

// === 监听周期切换 ===
watch(selectedPeriod, (newVal) => {
  fundFlowData.value = mockFundFlow[newVal as keyof typeof mockFundFlow];
  updateOverviewChart();
});

// === 生命周期 ===
onMounted(() => {
  initOverviewChart();
});

onUnmounted(() => {
  if (overviewChart) {
    overviewChart.dispose();
    overviewChart = null;
  }
});
</script>

<style scoped>
.funds-view {
  padding: 2rem;
}

.time-filter {
  margin: 1rem 0;
}

.time-filter button {
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background: var(--card-bg);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
}

.time-filter button.active {
  background: #0d6efd;
  color: white;
}

.overview-chart {
  height: 250px;
  margin: 1.5rem 0;
}

.detail-list {
  margin-top: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--card-bg);
}

.inflow { color: #28a745; }
.outflow { color: #dc3545; }
</style>