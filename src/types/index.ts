export interface GlobalIndexData {
  symbol: string;
  price: number;
  changePercent: number;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
}