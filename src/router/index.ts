import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MarketView from '@/views/MarketView.vue';
import SectorView from '@/views/SectorView.vue';
import FundsView from '@/views/FundsView.vue';

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/market', component: MarketView, name: 'market' },
  { path: '/sector', component: SectorView, name: 'sector' },
  { path: '/funds', component: FundsView, name: 'funds' },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});