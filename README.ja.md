# stock.chat - グローバル株式市場相場

🌍 地球マップ説明：
 NASA 公開地球マップ：
URL: https://visibleearth.nasa.gov/images/73909/8192x4096.jpg

📥 パッケージ ZIP：
npm install
npm run build
# 出力は dist/ → stock.chat に名前変更
mv dist stock.chat
zip -r stock.chat.zip stock.chat

## プロジェクト拡張
| 機能 | 拡張方法 |
|------|--------|
| リアルセクターデータ | `utils/api.ts` に `fetchSectorData()` を追加、Alpha Vantage などの金融 API と統合 |
| WebSocket リアルタイム資金フロー | `composables/useWebSocket.ts` で `fund_flow` チャンネルを監視 |
| カスタム時間範囲 | `FundsView.vue` に日付ピッカー（例: `flatpickr`）を追加 |
| CSV エクスポート | `xlsx` ライブラリを使用、「エクスポート」ボタンを追加 |