// utils/api.ts
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

export const fetchGlobalIndices = async () => {
  const symbols = ['^DJI', '^IXIC', '^GSPC', '^N225', '^GDAXI'];
  const promises = symbols.map(sym =>
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${API_KEY}`)
      .then(r => r.json())
  );
  return await Promise.all(promises);
};