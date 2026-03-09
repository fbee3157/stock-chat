// src/composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from 'vue';
import { APP_CONFIG } from '@/config';

export function useWebSocket() {
  const isConnected = ref(false);
  const message = ref<string | null>(null);
  const ws = ref<WebSocket | null>(null);

  const connect = () => {
    if (ws.value) return;
    
    const url = `${APP_CONFIG.api.finnhub.wsUrl}${APP_CONFIG.api.finnhub.apiKey}`;
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      isConnected.value = true;
      console.log('WebSocket connected');
      // 订阅实时数据
      ws.value?.send(JSON.stringify({ 
        type: 'subscribe', 
        data: ['AAPL', 'GOOG', 'MSFT', 'TSLA'] 
      }));
    };

    ws.value.onmessage = (event) => {
      message.value = event.data;
      console.log('WebSocket message:', event.data);
    };

    ws.value.onclose = () => {
      isConnected.value = false;
      console.log('WebSocket disconnected');
      // 自动重连
      setTimeout(connect, 5000);
    };
  };

  const disconnect = () => {
    if (ws.value) {
      ws.value.close();
      ws.value = null;
    }
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    disconnect();
  });

  return {
    isConnected,
    message,
    connect,
    disconnect,
  };
}