<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  startX: Number,
  startY: Number,
  endX: Number,
  endY: Number,
  delay: Number
})

const visible = ref(false)

onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, props.delay)
})
</script>

<template>
  <div 
    class="particle-cube"
    :class="{ 'visible': visible }"
    :style="{
      '--start-x': `${startX}px`,
      '--start-y': `${startY}px`,
      '--end-x': `${endX}px`,
      '--end-y': `${endY}px`,
      '--delay': `${delay}ms`
    }"
  >
    <div class="mini-cube"></div>
  </div>
</template>

<style scoped>
.particle-cube {
  position: fixed;
  left: var(--start-x);
  top: var(--start-y);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
}

.particle-cube.visible {
  animation: particleFly 1.5s ease-in-out var(--delay) forwards;
}

.mini-cube {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #6c3ce9 0%, #8b5cf6 100%);
  border: 2px solid #1a1a2e;
  transform: rotate(45deg);
}

@keyframes particleFly {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5) rotate(0deg);
  }
  20% {
    opacity: 1;
    transform: translate(10px, -20px) scale(1) rotate(45deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    left: var(--end-x);
    top: var(--end-y);
    opacity: 0;
    transform: scale(0.3) rotate(180deg);
  }
}
</style>
