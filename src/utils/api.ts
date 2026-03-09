// src/utils/api.ts
import { APP_CONFIG } from '@/config';

export interface GlobalIndexData {
  symbol: string;
  price: number;
  changePercent: number;
  name: string;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
}

export const fetchGlobalIndices = async (): Promise<GlobalIndexData[]> => {
  const { baseUrl, apiKey } = APP_CONFIG.api.alphaVantage;
  const symbols = APP_CONFIG.globalIndices.map(i => i.symbol);
  const results: GlobalIndexData[] = [];

  for (const symbol of symbols) {
    const res = await fetch(`${baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
    const json = await res.json();
    const quote = json['Global Quote'];
    if (quote) {
      results.push({
        symbol,
        price: parseFloat(quote['05. price']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        name: APP_CONFIG.globalIndices.find(i => i.symbol === symbol)?.name || symbol
      });
    }
  }
  return results;
};

export const fetchMarketNews = async (lang = 'zh'): Promise<{ articles: NewsItem[] }> => {
  const { baseUrl, apiKey } = APP_CONFIG.api.newsApi;
  const url = `${baseUrl}/everything?q=stock market&language=${lang}&sortBy=publishedAt&apiKey=${apiKey}`;
  const res = await fetch(url);
  return await res.json();
};

// 真实板块数据（使用Alpha Vantage的行业数据）
export const fetchSectorData = async (): Promise<any[]> => {
  const { apiKey } = APP_CONFIG.api.alphaVantage;
  const url = `https://www.alphavantage.co/query?function=SECTOR&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return Object.values(data).slice(0, 5).map((item: any) => ({
    id: item['Sector'],
    name: item['Sector'],
    change: parseFloat(item['Price Change']),
    volume: parseFloat(item['Volume'])
  }));
};

// 资金流数据（模拟，实际可对接专门的资金流API）
export const fetchFundsFlow = async (): Promise<{ symbol: string; flow: number }[]> => {
  // 模拟资金流数据，实际可对接API
  return [
    { symbol: 'AAPL', flow: 1500000000 },
    { symbol: 'GOOGL', flow: 1200000000 },
    { symbol: 'MSFT', flow: 1000000000 },
  ];
};