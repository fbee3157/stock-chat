// src/composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from 'vue';
import { APP_CONFIG } from '@/config';

export function useWebSocket() {
  const isConnected = ref(false);
  const message = ref<string | null>(null);
  const realTimeData = ref<any[]>([]);
  const ws = ref<WebSocket | null>(null);

  const connect = () => {
    if (ws.value) return;
    
    const url = `${APP_CONFIG.api.finnhub.wsUrl}${APP_CONFIG.api.finnhub.apiKey}`;
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      isConnected.value = true;
      console.log('WebSocket connected');
      // 订阅主要股票的实时数据
      const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
      symbols.forEach(symbol => {
        ws.value?.send(JSON.stringify({ 
          type: 'subscribe', 
          symbol: symbol 
        }));
      });
    };

    ws.value.onmessage = (event) => {
      const data = JSON.parse(event.data);
      message.value = event.data;
      console.log('WebSocket message:', data);
      
      if (data.type === 'trade') {
        // 处理实时交易数据
        realTimeData.value.push(data);
        // 保持最近100条数据
        if (realTimeData.value.length > 100) {
          realTimeData.value.shift();
        }
      }
    };

    ws.value.onclose = () => {
      isConnected.value = false;
      console.log('WebSocket disconnected');
      // 自动重连
      setTimeout(connect, 5000);
    };

    ws.value.onerror = (error) => {
      console.error('WebSocket error:', error);
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
    realTimeData,
    connect,
    disconnect,
  };
}