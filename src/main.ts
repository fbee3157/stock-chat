import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import { APP_CONFIG } from './config';

// 多语言
const i18n = createI18n({
  locale: APP_CONFIG.i18n.defaultLocale,
  fallbackLocale: APP_CONFIG.i18n.fallbackLocale,
  messages: {
    en: require('../locales/en.json'),
    'zh-CN': require('../locales/zh-CN.json'),
    'zh-TW': require('../locales/zh-TW.json'),
    ja: require('../locales/ja.json'),
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');