// composables/useWebSocket.js
export function useFinnhubStream(symbols) {
  const ws = new WebSocket('wss://ws.finnhub.io?token=' + import.meta.env.VITE_FINNHUB_KEY);
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // 更新 Pinia store
  };
}