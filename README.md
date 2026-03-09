# stock.chat - 全球股市行情

## 🚀 如何使用
```bash
git clone https://github.com/fbee3157/stock-chat.git
cd stock.chat
npm install
npm run dev
```

## 功能特性

- 🌍 全球股市行情：实时显示各大指数和股票数据
- 💰 资金流向：WebSocket实时资金流监控
- 📊 图表可视化：使用ECharts展示市场趋势
- 🌐 多语言支持：支持中文、英文、繁体中文、日文
- 🗺️ 地球贴图：NASA地球贴图背景
- 📱 响应式设计：适配移动端和桌面端

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **国际化**: Vue I18n
- **3D图形**: Three.js
- **图表库**: ECharts

## 依赖

### 生产依赖
- vue: ^3.4.0
- pinia: ^2.1.7
- vue-router: ^4.3.0
- vue-i18n: ^9.9.0
- three: ^0.160.1
- echarts: ^5.5.0

### 开发依赖
- @vitejs/plugin-vue: ^5.0.0
- typescript: ^5.3.0
- vite: ^5.0.0
- vue-tsc: ^1.8.0

## 安装与运行

1. 克隆项目：
   ```bash
   git clone <repository-url>
   cd stock.chat
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

5. 预览构建结果：
   ```bash
   npm run preview
   ```

## 项目结构

```
stock.chat/
├── build-zip.sh
├── index.html
├── package.json
├── README.md
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   └── ThemeToggle.vue
│   │   └── ui/
│   │       └── LanguageSwitcher.vue
│   ├── composables/
│   │   ├── useChart.ts.txt
│   │   └── useWebSocket.ts
│   ├── config/
│   │   └── index.ts
│   ├── locales/
│   │   ├── en.json
│   │   ├── ja.json
│   │   ├── zh-CN.json
│   │   └── zh-TW.json
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   └── marketStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── api.ts
│   │   └── openclaw.ts
│   └── views/
│       ├── FundsView.vue
│       ├── HomeView.vue
│       ├── MarketView.vue
│       ├── NewsView.vue
│       └── SectorView.vue
├── public/
├── scripts/
│   └── generate-openclaw.mjs
├── OpenClaw/
│   └── skills/
│       ├── config.js
│       ├── market_skill.js
├── css/
│   └── style.css
├── docs/
│   ├── deployment.md
│   ├── openclaw.md
├── js/
│   └── script.js
├── locales/
│   ├── en.json
│   ├── ja.json
│   ├── zh-CN.json
│   ├── zh-TW.json
├── api.ts
├── build-zip.bat
├── Dockerfile
├── NewsAPI.ts
├── tsconfig.json
├── useWebSocket.js
├── vite.config.ts
└── vitest.config.ts
```

## 扩展

| 功能 | 扩展方式 |
|------|--------|
| 真实板块数据 | 在 `utils/api.ts` 添加 `fetchSectorData()`，对接 Alpha Vantage 或其他财经 API |
| WebSocket 实时资金流 | 在 `composables/useWebSocket.ts` 中监听 `fund_flow` 频道 |
| 自定义时间范围 | 在 `FundsView.vue` 添加日期选择器（如 `flatpickr`） |
| 导出 CSV | 使用 `xlsx` 库，添加“导出”按钮 |

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License
