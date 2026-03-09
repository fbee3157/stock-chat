<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <h1>Stock.Chat - 全球股市行情</h1>
    <div ref="globeContainer" class="globe-container"></div>
    <div v-if="selectedHotspot" class="hotspot-popup">
      <h3>{{ selectedHotspot.name }}</h3>
      <p>{{ $t('index.value') }}: {{ selectedHotspot.price }}</p>
      <p :class="{ up: selectedHotspot.change > 0, down: selectedHotspot.change < 0 }">
        {{ selectedHotspot.change > 0 ? '▲' : '▼' }} {{ Math.abs(selectedHotspot.change).toFixed(2) }}%
      </p>
      <button @click="goToNews">{{ $t('news.related') }}</button>
      <button @click="closePopup">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMarketStore } from '@/stores/marketStore';
import { useWebSocket } from '@/composables/useWebSocket';
import { APP_CONFIG } from '@/config';

const globeContainer = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let globe: THREE.Mesh;
let hotspots: THREE.Mesh[] = [];
let animationId: number | null = null;

const store = useMarketStore();
const router = useRouter();
const selectedHotspot = ref<{ name: string; price: number; change: number } | null>(null);

// 使用WebSocket实时数据
const { isConnected, realTimeData } = useWebSocket();

// 初始化地球
const initGlobe = () => {
  if (!globeContainer.value) return;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 800;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(globeContainer.value.clientWidth, globeContainer.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  globeContainer.value.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Earth Geometry & Texture
  const geometry = new THREE.SphereGeometry(APP_CONFIG.globe.radius, 64, 64);
  const texture = new THREE.TextureLoader().load('/earth_texture.jpg');
  const material = new THREE.MeshPhongMaterial({ map: texture });
  globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  // Add Hotspots
  createHotspots();

  // Auto rotate
  if (APP_CONFIG.globe.autoRotate) {
    animate();
  }

  // Resize handler
  window.addEventListener('resize', onWindowResize);
};

// 创建热点
const createHotspots = () => {
  hotspots.forEach(h => scene.remove(h));
  hotspots = [];

  APP_CONFIG.globalIndices.forEach((index) => {
    const { lat, lng } = index;
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lng + 180) * Math.PI) / 180;

    const x = -APP_CONFIG.globe.radius * Math.sin(phi) * Math.cos(theta);
    const y = APP_CONFIG.globe.radius * Math.cos(phi);
    const z = APP_CONFIG.globe.radius * Math.sin(phi) * Math.sin(theta);

    const geometry = new THREE.SphereGeometry(10, 16, 16);
    const color = store.getIndexChange(index.symbol) >= 0 ? 0x00ff00 : 0xff0000;
    const material = new THREE.MeshBasicMaterial({ color });
    const hotspot = new THREE.Mesh(geometry, material);
    hotspot.position.set(x, y, z);
    hotspot.userData = { ...index, price: store.getIndexPrice(index.symbol), change: store.getIndexChange(index.symbol) };
    scene.add(hotspot);
    hotspots.push(hotspot);

    // Raycaster for click
    hotspot.userData.clickable = true;
  });
};

// 动画循环
const animate = () => {
  if (!APP_CONFIG.globe.autoRotate) return;
  globe.rotation.y += APP_CONFIG.globe.rotationSpeed;
  render();
  animationId = requestAnimationFrame(animate);
};

const render = () => {
  controls.update();
  renderer.render(scene, camera);
};

// 窗口缩放
const onWindowResize = () => {
  if (!globeContainer.value) return;
  camera.aspect = globeContainer.value.clientWidth / globeContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(globeContainer.value.clientWidth, globeContainer.value.clientHeight);
};

// 点击处理
const handlePointerDown = (event: MouseEvent) => {
  if (!renderer || !camera || !globeContainer.value) return;

  const rect = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(hotspots);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    selectedHotspot.value = obj.userData;
  }
};

// 路由跳转
const goToNews = () => {
  router.push({ name: 'market', query: { tab: 'news' } });
  selectedHotspot.value = null;
};

const closePopup = () => {
  selectedHotspot.value = null;
};

// 生命周期
onMounted(() => {
  initGlobe();
  globeContainer.value?.addEventListener('pointerdown', handlePointerDown);
  
  // 监听实时数据更新
  watch(realTimeData, (newData) => {
    if (newData.length > 0) {
      store.updateRealTimeData(newData);
    }
  }, { deep: true });
  
  // 监听数据更新，刷新热点颜色
  store.$subscribe(() => {
    createHotspots();
  });
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onWindowResize);
  globeContainer.value?.removeEventListener('pointerdown', handlePointerDown);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.globe-container {
  width: 100%;
  height: 100%;
}

.hotspot-popup {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--bg-primary);
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
}

.up { color: #28a745; }
.down { color: #dc3545; }

.hotspot-popup button {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>