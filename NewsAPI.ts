export const fetchMarketNews = async (lang = 'zh') => {
  const url = `https://newsapi.org/v2/everything?q=stock market&language=${lang}&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
  return await fetch(url).then(r => r.json());
};