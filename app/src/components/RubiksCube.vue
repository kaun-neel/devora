<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particles = ref([])
const cubesReady = ref(false)
let animationFrame = null

const createParticles = () => {
  const textElement = document.querySelector('.hero-text-container')
  const cubeContainer = document.querySelector('.cubes-container')
  
  if (!textElement || !cubeContainer) {
    setTimeout(createParticles, 100)
    return
  }

  const textRect = textElement.getBoundingClientRect()
  const containerRect = cubeContainer.getBoundingClientRect()

  const particleCount = 27
  
  for (let i = 0; i < particleCount; i++) {
    const delay = i * 50
    const startX = textRect.left + Math.random() * textRect.width
    const startY = textRect.top + Math.random() * textRect.height
    const endX = containerRect.left + Math.random() * containerRect.width
    const endY = containerRect.top + Math.random() * containerRect.height

    setTimeout(() => {
      particles.value.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        delay: 0
      })
      
      if (i === particleCount - 1) {
        setTimeout(() => {
          cubesReady.value = true
        }, 1500)
      }
    }, delay)
  }
}

onMounted(() => {
  setTimeout(createParticles, 500)
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div class="rubiks-cube-wrapper">
    <div class="cube" :class="{ 'ready': cubesReady }">
      <div class="cube__face cube__face--front"></div>
      <div class="cube__face cube__face--back"></div>
      <div class="cube__face cube__face--right"></div>
      <div class="cube__face cube__face--left"></div>
      <div class="cube__face cube__face--top"></div>
      <div class="cube__face cube__face--bottom"></div>
    </div>
  </div>
</template>

<style scoped>
.rubiks-cube-wrapper {
  width: 100px;
  height: 100px;
  perspective: 600px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-20deg) rotateY(-25deg);
  transition: transform 0.8s ease-out;
}

.cube.ready {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotateX(-20deg) rotateY(0deg);
  }
  to {
    transform: rotateX(-20deg) rotateY(360deg);
  }
}

.cube__face {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 3px solid #1a1a2e;
  background: linear-gradient(135deg, #6c3ce9 0%, #8b5cf6 50%, #a78bfa 100%);
  box-shadow: inset 0 0 20px rgba(167, 139, 250, 0.3);
}

.cube__face--front {
  transform: translateZ(50px);
  background: 
    linear-gradient(90deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(0deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%);
}

.cube__face--back {
  transform: rotateY(180deg) translateZ(50px);
  background: 
    linear-gradient(90deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(0deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(135deg, #6c3ce9 0%, #8b5cf6 100%);
}

.cube__face--right {
  transform: rotateY(90deg) translateZ(50px);
  background: 
    linear-gradient(90deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(0deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%);
}

.cube__face--left {
  transform: rotateY(-90deg) translateZ(50px);
  background: 
    linear-gradient(90deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(0deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(135deg, #6c3ce9 0%, #8b5cf6 100%);
}

.cube__face--top {
  transform: rotateX(90deg) translateZ(50px);
  background: 
    linear-gradient(90deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(0deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
}

.cube__face--bottom {
  transform: rotateX(-90deg) translateZ(50px);
  background: 
    linear-gradient(90deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(0deg, transparent 32%, #1a1a2e 32%, #1a1a2e 34%, transparent 34%),
    linear-gradient(135deg, #6c3ce9 0%, #4c1d95 100%);
}
</style>
