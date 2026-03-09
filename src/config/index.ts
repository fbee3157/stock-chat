// src/config/index.ts
export const APP_CONFIG = {
  // === API 配置（从环境变量读取）===
  api: {
    alphaVantage: {
      baseUrl: 'https://www.alphavantage.co/query',
      apiKey: import.meta.env.VITE_ALPHA_VANTAGE_KEY || '',
    },
    newsApi: {
      baseUrl: 'https://newsapi.org/v2',
      apiKey: import.meta.env.VITE_NEWS_API_KEY || '',
    },
    finnhub: {
      wsUrl: 'wss://ws.finnhub.io?token=',
      apiKey: import.meta.env.VITE_FINNHUB_KEY || '',
    },
  },

  // === 全球市场指数映射 ===
  globalIndices: [
    { id: 'DJI', symbol: '^DJI', name: '道琼斯', city: 'New York', lat: 40.7128, lng: -74.0060 },
    { id: 'IXIC', symbol: '^IXIC', name: '纳斯达克', city: 'New York', lat: 40.7128, lng: -74.0060 },
    { id: 'N225', symbol: '^N225', name: '日经225', city: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { id: 'GDAXI', symbol: '^GDAXI', name: '德国DAX', city: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
    { id: '000001.SS', symbol: '000001.SS', name: '上证指数', city: 'Shanghai', lat: 31.2304, lng: 121.4737 },
  ],

  // === 主题配置 ===
  theme: {
    default: 'light',
    storageKey: 'stock_theme',
  },

  // === 语言配置 ===
  i18n: {
    defaultLocale: 'zh-CN',
    fallbackLocale: 'en',
    availableLocales: ['zh-CN', 'zh-TW', 'en', 'ja'],
  },

  // === 地球模型配置 ===
  globe: {
    radius: 300,
    rotationSpeed: 0.001,
    autoRotate: true,
    enableZoom: true,
  },
} as const;

// 导出类型
export type AppConfig = typeof APP_CONFIG;