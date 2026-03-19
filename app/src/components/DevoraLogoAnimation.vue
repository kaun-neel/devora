<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const phase = ref('flower') // 'flower' | 'logo'
const animationStarted = ref(false)
const isSpinning = ref(false)
const isFloating = ref(false)
let timeouts = []

onMounted(() => {
  // Intro fade in
  const t1 = setTimeout(() => {
    animationStarted.value = true
  }, 100)

  // Start the container's rapid spin (takes 2.5s)
  const t2 = setTimeout(() => {
    isSpinning.value = true
  }, 1200)

  // While it's spinning, start migrating the petals to horizontal overlap Devora Logo
  // This causes a beautiful organic "spiral" transition as they fold into a line
  const t3 = setTimeout(() => {
    phase.value = 'logo'
  }, 1600)

  // After the spin completes at ~3700ms, add a gentle floating animation
  const t4 = setTimeout(() => {
    isFloating.value = true
  }, 3800)

  timeouts = [t1, t2, t3, t4]
})

onUnmounted(() => {
  timeouts.forEach(t => clearTimeout(t))
})
</script>

<template>
  <div class="devora-animation-wrapper" :class="{ started: animationStarted, floating: isFloating }">
    <div class="container-spinner" :class="{ spinning: isSpinning }">
      <div class="circles-container" :class="[phase]">
        <div class="circle circle-1"><div class="circle-inner"></div></div>
        <div class="circle circle-2"><div class="circle-inner"></div></div>
        <div class="circle circle-3"><div class="circle-inner"></div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.devora-animation-wrapper {
  width: 360px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px) scale(0.85);
  transition: opacity 1s cubic-bezier(0.2, 0, 0, 1), transform 1s cubic-bezier(0.2, 0, 0, 1);
  will-change: transform, opacity;
}

.devora-animation-wrapper.started {
  opacity: 1;
  transform: translateY(0) scale(1.1); /* Slightly oversized for hero impact */
}

.devora-animation-wrapper.floating {
  animation: gentleFloat 4s ease-in-out infinite;
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0) scale(1.1); }
  50% { transform: translateY(-12px) scale(1.1); }
}

.container-spinner {
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
  transition: transform 2.5s cubic-bezier(0.65, 0, 0.25, 1); /* Elegant rapid spin */
  will-change: transform;
}

.container-spinner.spinning {
  transform: rotate(1080deg); /* 3 full spins */
}

.circles-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.circle {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transition: all 1.8s cubic-bezier(0.5, 0, 0.2, 1);
  will-change: top, left, opacity;
}

.circle-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/* Gradient Colors - matching the NavBar */
.circle-1 .circle-inner {
  background: radial-gradient(circle at 35% 35%, #7B52D9 0%, #5B3AC7 50%, #4A2DAF 100%);
  box-shadow: 0 0 40px rgba(91, 58, 199, 0.3), inset 0 -4px 12px rgba(0, 0, 0, 0.15);
}

.circle-2 .circle-inner {
  background: radial-gradient(circle at 35% 35%, #A48CE0 0%, #8B6FD4 50%, #7A5DC8 100%);
  box-shadow: 0 0 30px rgba(139, 111, 212, 0.3), inset 0 -4px 12px rgba(0, 0, 0, 0.1);
}

.circle-3 .circle-inner {
  background: radial-gradient(circle at 35% 35%, #D8CCF0 0%, #C4B5E8 50%, #B5A3DF 100%);
  box-shadow: 0 0 20px rgba(196, 181, 232, 0.3), inset 0 -4px 12px rgba(0, 0, 0, 0.08);
}

/* ===== PHASE 1: FLOWER ===== */
/* Container 360px -> center is 180px. 
   Circle top/left to center is calc(50% - 75px).
   Radius R = 65px */
.flower .circle-1 {
  top: calc(50% - 75px - 65px);
  left: calc(50% - 75px);
  z-index: 1;
}

.flower .circle-2 {
  top: calc(50% - 75px + 32.5px);
  left: calc(50% - 75px + 56.3px);
  z-index: 2;
}

.flower .circle-3 {
  top: calc(50% - 75px + 32.5px);
  left: calc(50% - 75px - 56.3px);
  z-index: 3;
}

/* Idle heartbeat in flower phase */
.flower .circle {
  animation: pulseFlower 2s ease-in-out infinite;
}

@keyframes pulseFlower {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

/* ===== PHASE 2: LOGO (overlapping circles horizontal line) ===== */
/* Offset is 90px between centers */
.logo .circle {
  animation: none;
  transform: scale(1);
}

/* Outermost Left (Darkest) */
.logo .circle-1 {
  top: calc(50% - 75px);
  left: calc(50% - 75px - 90px);
  z-index: 1;
  opacity: 1;
}

/* Middle */
.logo .circle-2 {
  top: calc(50% - 75px);
  left: calc(50% - 75px);
  z-index: 2;
  opacity: 0.8;
}

/* Right (Lightest) */
.logo .circle-3 {
  top: calc(50% - 75px);
  left: calc(50% - 75px + 90px);
  z-index: 3;
  opacity: 0.7;
}

/* Idle glow on logo state */
.logo .circle-1 { animation: glow 4s ease-in-out infinite; }
.logo .circle-2 { animation: glow 4s ease-in-out infinite 0.7s; }
.logo .circle-3 { animation: glow 4s ease-in-out infinite 1.4s; }

@keyframes glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.15); }
}
</style>
