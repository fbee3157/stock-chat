import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import { APP_CONFIG } from './config';
import en from '../locales/en.json';
import zhCN from '../locales/zh-CN.json';
import zhTW from '../locales/zh-TW.json';
import ja from '../locales/ja.json';

// 多语言
const i18n = createI18n({
  locale: APP_CONFIG.i18n.defaultLocale,
  fallbackLocale: APP_CONFIG.i18n.fallbackLocale,
  messages: {
    en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    ja,
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');