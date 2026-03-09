import { defineStore } from 'pinia';
import { fetchGlobalIndices, fetchSectorData, fetchFundsFlow } from '@/utils/api';
import type { GlobalIndexData } from '@/types';

export const useMarketStore = defineStore('market', {
  state: () => ({
    indices: {} as Record<string, GlobalIndexData>,
    sectors: [] as any[],
    fundsFlow: [] as any[],
    realTimeData: [] as any[],
    loading: false,
  }),

  actions: {
    async loadIndices() {
      this.loading = true;
      try {
        const data = await fetchGlobalIndices();
        data.forEach(item => {
          this.indices[item.symbol] = item;
        });
      } finally {
        this.loading = false;
      }
    },

    async loadSectors() {
      this.loading = true;
      try {
        this.sectors = await fetchSectorData();
      } finally {
        this.loading = false;
      }
    },

    async loadFundsFlow() {
      this.loading = true;
      try {
        this.fundsFlow = await fetchFundsFlow();
      } finally {
        this.loading = false;
      }
    },

    // 更新实时数据
    updateRealTimeData(data: any) {
      this.realTimeData = data;
      // 更新对应股票的价格
      data.forEach((trade: any) => {
        if (this.indices[trade.s]) {
          this.indices[trade.s].price = trade.p;
          // 计算涨跌幅（需要基准价格，这里简化处理）
          this.indices[trade.s].changePercent = Math.random() * 2 - 1; // 临时随机值
        }
      });
    },

    getIndexPrice(symbol: string): number {
      return this.indices[symbol]?.price || 0;
    },

    getIndexChange(symbol: string): number {
      return this.indices[symbol]?.changePercent || 0;
    },
  },
});