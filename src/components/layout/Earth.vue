<template>
  <div class="earth-container" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ref, onMounted, onUnmounted } from 'vue';

const container = ref<HTMLDivElement | null>(null);
let animationId: number | null = null;

onMounted(() => {
  if (!container.value) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0.1);
  container.value.appendChild(renderer.domElement);

  // 创建地球
  const geometry = new THREE.SphereGeometry(5, 64, 64);
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('/earth_texture.jpg');
  const material = new THREE.MeshPhongMaterial({ map: earthTexture });
  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(5, 3, 5);
  scene.add(light);

  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.z = 15;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // 动画
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    earth.rotation.y += 0.001;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // 窗口调整
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  });
});
</script>

<style scoped>
.earth-container {
  width: 100%;
  height: 100%;
}
</style>