import { defineStore } from 'pinia';
import { fetchGlobalIndices } from '@/utils/api';
import type { GlobalIndexData } from '@/types';

export const useMarketStore = defineStore('market', {
  state: () => ({
    indices: {} as Record<string, GlobalIndexData>,
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

    getIndexPrice(symbol: string): number {
      return this.indices[symbol]?.price || 0;
    },

    getIndexChange(symbol: string): number {
      return this.indices[symbol]?.changePercent || 0;
    },
  },
});