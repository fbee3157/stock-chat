# stock.chat - Global Stock Market Quotes

🌍 Earth Map Description:
NASA Public Earth Map:
URL: https://visibleearth.nasa.gov/images/73909/8192x4096.jpg

📥 Package ZIP:
npm install
npm run build
# Output in dist/ -> Rename to stock.chat
mv dist stock.chat
zip -r stock.chat.zip stock.chat

## Project Extensions
| Feature | Extension Method |
|---------|------------------|
| Real Sector Data | Add `fetchSectorData()` in `utils/api.ts`, integrate with Alpha Vantage or other financial APIs |
| WebSocket Real-time Fund Flow | Listen to `fund_flow` channel in `composables/useWebSocket.ts` |
| Custom Time Range | Add date picker (e.g., `flatpickr`) in `FundsView.vue` |
| Export CSV | Use `xlsx` library, add "Export" button |