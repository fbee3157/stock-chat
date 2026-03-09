<!-- src/views/FundsView.vue -->
<template>
  <div class="funds-view">
    <h2>{{ $t('nav.funds') }}</h2>
    <table class="funds-table">
      <thead>
        <tr>
          <th>股票代码</th>
          <th>资金流向 (亿)</th>
          <th>趋势</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fund in fundFlowData" :key="fund.symbol">
          <td>{{ fund.symbol }}</td>
          <td>{{ (fund.flow / 100000000).toFixed(2) }}</td>
          <td :class="{ up: fund.flow > 0, down: fund.flow < 0 }">
            {{ fund.flow > 0 ? '▲' : '▼' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fundFlowData = ref([
  { symbol: 'AAPL', flow: 1500000000 },
  { symbol: 'GOOGL', flow: 1200000000 },
  { symbol: 'MSFT', flow: 1000000000 },
  { symbol: 'TSLA', flow: -800000000 },
  { symbol: 'AMZN', flow: 600000000 },
]);
</script>

<style scoped>
.funds-view {
  padding: 2rem;
}

.funds-table {
  width: 100%;
  border-collapse: collapse;
}

.funds-table th,
.funds-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.funds-table th {
  background: var(--card-bg);
  font-weight: bold;
}

.up { color: #28a745; }
.down { color: #dc3545; }
</style>