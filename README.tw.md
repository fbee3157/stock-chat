# stock.chat - 全球股市行情

🌍 地球貼圖說明：
 NASA 公開地球貼圖：
URL: https://visibleearth.nasa.gov/images/73909/8192x4096.jpg

📥 打包 ZIP：
npm install
npm run build
# 輸出在 dist/ → 重新命名為 stock.chat
mv dist stock.chat
zip -r stock.chat.zip stock.chat

## 專案擴展
| 功能 | 擴展方式 |
|------|--------|
| 真實板塊資料 | 在 `utils/api.ts` 新增 `fetchSectorData()`，對接 Alpha Vantage 或其他財經 API |
| WebSocket 即時資金流 | 在 `composables/useWebSocket.ts` 中監聽 `fund_flow` 頻道 |
| 自訂時間範圍 | 在 `FundsView.vue` 新增日期選擇器（如 `flatpickr`） |
| 匯出 CSV | 使用 `xlsx` 程式庫，新增「匯出」按鈕 |