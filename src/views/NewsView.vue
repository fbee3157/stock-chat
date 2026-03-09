<!-- src/views/NewsView.vue -->
<template>
  <div class="news-view">
    <div class="news-header">
      <h1>{{ $t('news.title') }}</h1>
      <div class="news-meta">
        <span>{{ $t('news.lastUpdated') }}: {{ lastUpdated }}</span>
        <span class="lang-switch">
          <select v-model="currentLang" @change="updateLanguage">
            <option value="zh-CN">简体中文</option>
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
            <option value="ja">日本語</option>
          </select>
        </span>
      </div>
    </div>

    <div v-if="loading" class="loading-spinner"></div>
    
    <div v-else-if="news.length === 0" class="no-data">
      {{ $t('news.noData') }}
    </div>

    <div v-else class="news-list">
      <div v-for="article in news" :key="article.url" class="news-item">
        <h2 class="title">{{ article.title }}</h2>
        <div class="meta">
          <span class="source">{{ article.source.name }}</span>
          <span class="date">{{ formatDate(article.publishedAt) }}</span>
        </div>
        <p class="description">{{ article.description }}</p>
        <a :href="article.url" target="_blank" class="read-more">
          {{ $t('news.readMore') }} →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { APP_CONFIG } from '@/config';
import { fetchMarketNews } from '@/utils/api';

const route = useRoute();
const { t, locale } = useI18n();
const loading = ref(true);
const news = ref<any[]>([]);
const currentLang = ref(locale.value);
const lastUpdated = ref('');

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString(locale.value, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const updateLanguage = () => {
  locale.value = currentLang.value;
  fetchNews();
};

const fetchNews = async () => {
  loading.value = true;
  try {
    const lang = currentLang.value.split('-')[0];
    const data = await fetchMarketNews(lang);
    news.value = data.articles || [];
    lastUpdated.value = new Date().toLocaleString();
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.news-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.news-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.lang-switch {
  margin-left: 1rem;
}

.news-list {
  margin-top: 1.5rem;
}

.news-item {
  border-bottom: 1px solid #eee;
  padding: 1.5rem 0;
}

.title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  color: #888;
  font-size: 0.9rem;
}

.description {
  line-height: 1.5;
  margin-bottom: 1rem;
  color: #555;
}

.read-more {
  color: #0d6efd;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

.load