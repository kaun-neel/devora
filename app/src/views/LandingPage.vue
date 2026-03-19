<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DevoraLogoAnimation from '@/components/DevoraLogoAnimation.vue'

const canvasRef = ref(null)
let animationId = null
let mouseX = -1000
let mouseY = -1000
const INFLUENCE_RADIUS = 120
const DOT_SPACING = 32
const BASE_DOT_RADIUS = 1.8
const MAX_DOT_RADIUS = 5
const BASE_COLOR = { r: 210, g: 180, b: 140 }
const HOVER_COLOR = { r: 184, g: 134, b: 11 }

function handleMouseMove(e) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

function handleMouseLeave() {
  mouseX = -1000
  mouseY = -1000
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1

  canvas.width = canvas.offsetWidth * dpr
  canvas.height = canvas.offsetHeight * dpr
  ctx.scale(dpr, dpr)

  const w = canvas.offsetWidth
  const h = canvas.offsetHeight

  ctx.clearRect(0, 0, w, h)

  const cols = Math.ceil(w / DOT_SPACING) + 1
  const rows = Math.ceil(h / DOT_SPACING) + 1
  const offsetX = (w % DOT_SPACING) / 2
  const offsetY = (h % DOT_SPACING) / 2

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetX + col * DOT_SPACING
      const y = offsetY + row * DOT_SPACING

      const dx = x - mouseX
      const dy = y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)

      let radius = BASE_DOT_RADIUS
      let r = BASE_COLOR.r
      let g = BASE_COLOR.g
      let b = BASE_COLOR.b
      let alpha = 0.5

      if (dist < INFLUENCE_RADIUS) {
        const t = 1 - (dist / INFLUENCE_RADIUS)
        const ease = t * t * (3 - 2 * t)

        radius = BASE_DOT_RADIUS + (MAX_DOT_RADIUS - BASE_DOT_RADIUS) * ease
        r = Math.round(BASE_COLOR.r + (HOVER_COLOR.r - BASE_COLOR.r) * ease)
        g = Math.round(BASE_COLOR.g + (HOVER_COLOR.g - BASE_COLOR.g) * ease)
        b = Math.round(BASE_COLOR.b + (HOVER_COLOR.b - BASE_COLOR.b) * ease)
        alpha = 0.5 + 0.5 * ease
      }

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
      ctx.fill()
    }
  }

  animationId = requestAnimationFrame(draw)
}

onMounted(() => {
  draw()
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="font-display bg-[#FFF8E7] text-slate-900 relative">
    <!-- Interactive Dot Grid Canvas Background -->
    <canvas
      ref="canvasRef"
      class="fixed inset-0 w-full h-full pointer-events-none z-0"
      @mouseleave="handleMouseLeave"
    ></canvas>
    <div
      class="fixed inset-0 z-[1]"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      style="pointer-events: all;"
    ></div>

    <!-- Hero Section — Split Layout: Text Left, Rubik's Cubes Right -->
    <section class="relative z-10 min-h-screen flex items-center pointer-events-none">
      <!-- Devora Logo Animation -->
      <div class="logo-animation-container">
        <DevoraLogoAnimation />
      </div>

      <!-- Text content on the left — aligned to same left edge -->
      <div class="max-w-7xl mx-auto px-6 w-full pt-28 pb-20">
        <div class="flex flex-col space-y-8">
          <p class="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-slate-500 pl-1">Hello, friends. Meet Devora.</p>
          <h1 class="hero-text-container text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] uppercase italic">
            <span class="text-primary">Code it,</span><br/>
            <span class="text-primary-dark">Build it.</span>
          </h1>
          <div class="flex flex-wrap gap-5 pointer-events-auto pt-2">
            <RouterLink to="/code" class="bg-primary text-white font-black uppercase px-8 py-4 border-3 border-brutal-black neubrutal-shadow-lg active-neubrutal flex items-center gap-3 text-base hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150">
              Generate Code <span class="material-symbols-outlined text-base font-black">arrow_forward</span>
            </RouterLink>
            <RouterLink to="/debugger" class="bg-white text-brutal-black font-black uppercase px-8 py-4 border-3 border-brutal-black neubrutal-shadow-lg active-neubrutal text-base hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150">
              Debug My Code
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: What DEVORA Does -->
    <section class="relative z-10 py-24 bg-white/80 backdrop-blur-sm pointer-events-auto">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center gap-6 mb-16">
          <h2 class="text-5xl font-black text-brutal-black uppercase italic">What DEVORA Does</h2>
          <div class="h-3 grow bg-primary border-y-3 border-brutal-black"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Inquiry Card -->
          <div class="bg-background-light p-10 border-3 border-brutal-black neubrutal-shadow-lg">
            <div class="flex items-center justify-between mb-8">
              <div class="size-16 bg-primary border-3 border-brutal-black neubrutal-shadow-sm flex items-center justify-center text-white">
                <span class="material-symbols-outlined text-3xl font-black">chat_bubble</span>
              </div>
              <span class="px-4 py-1 border-3 border-brutal-black bg-yellow-300 text-brutal-black text-xs font-black uppercase tracking-widest">Interactive</span>
            </div>
            <h3 class="text-3xl font-black mb-4 uppercase italic">Generate Code</h3>
            <p class="text-slate-700 font-medium mb-8 leading-relaxed">Ask questions and generate code snippets with full AI context of your workspace.</p>
            <div class="bg-white border-3 border-brutal-black p-6 font-mono text-sm neubrutal-shadow-sm">
              <div class="flex items-center gap-2 mb-4 border-b-2 border-brutal-black pb-2">
                <div class="size-4 border-2 border-brutal-black bg-red-400"></div>
                <div class="size-4 border-2 border-brutal-black bg-yellow-400"></div>
                <div class="size-4 border-2 border-brutal-black bg-green-400"></div>
              </div>
              <p class="text-primary font-bold mb-2">// Suggestion: use map()</p>
              <p class="text-slate-500 font-bold">const doubled = numbers.<span class="text-primary-dark underline">map</span>(n =&gt; n * 2);</p>
            </div>
          </div>

          <!-- Debugger Card -->
          <div class="bg-background-light p-10 border-3 border-brutal-black neubrutal-shadow-lg">
            <div class="flex items-center justify-between mb-8">
              <div class="size-16 bg-primary-dark border-3 border-brutal-black neubrutal-shadow-sm flex items-center justify-center text-white">
                <span class="material-symbols-outlined text-3xl font-black">bug_report</span>
              </div>
              <span class="px-4 py-1 border-3 border-brutal-black bg-green-400 text-brutal-black text-xs font-black uppercase tracking-widest">Automation</span>
            </div>
            <h3 class="text-3xl font-black mb-4 uppercase italic">Debug Code</h3>
            <p class="text-slate-700 font-medium mb-8 leading-relaxed">Identify and fix bugs in your codebase with detailed diff previews and explanations.</p>
            <div class="bg-white border-3 border-brutal-black p-6 font-mono text-xs neubrutal-shadow-sm">
              <div class="bg-red-100 text-red-700 p-2 mb-2 border-2 border-red-200 font-bold">- return user.id === id</div>
              <div class="bg-green-100 text-green-700 p-2 border-2 border-green-200 font-bold">+ return user.uuid === id</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Language Strip — Animated Marquee -->
    <section class="relative z-10 py-6 bg-primary-dark overflow-hidden border-y-3 border-brutal-black pointer-events-auto">
      <div class="marquee-animated">
        <div class="marquee-track">
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">PYTHON</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">JAVASCRIPT</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">TYPESCRIPT</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">RUST</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">GO</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">C++</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">SWIFT</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">RUBY</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">JAVA</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">C#</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">PHP</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">KOTLIN</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">SCALA</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">SQL</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">.NET</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">DART</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">LUA</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
        </div>
        <div class="marquee-track" aria-hidden="true">
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">PYTHON</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">JAVASCRIPT</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">TYPESCRIPT</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">RUST</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">GO</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">C++</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">SWIFT</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">RUBY</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">JAVA</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">C#</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">PHP</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">KOTLIN</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">SCALA</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">SQL</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">.NET</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">DART</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
          <span class="text-xl font-black text-white px-6 italic uppercase tracking-tighter">LUA</span>
          <span class="text-xl font-black text-white/40 px-2">◆</span>
        </div>
      </div>
    </section>

    <!-- Section 4: Stats Bar -->
    <section class="relative z-10 py-20 bg-[#FFF3CD]/80 backdrop-blur-sm border-b-3 border-brutal-black pointer-events-auto">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="p-8 border-3 border-brutal-black bg-white neubrutal-shadow text-center">
          <div class="text-5xl font-black mb-2 italic">15+</div>
          <div class="text-primary font-black uppercase text-xs tracking-widest">Languages</div>
        </div>
        <div class="p-8 border-3 border-brutal-black bg-white neubrutal-shadow text-center">
          <div class="text-5xl font-black mb-2 italic">&lt;3s</div>
          <div class="text-primary font-black uppercase text-xs tracking-widest">Response</div>
        </div>
        <div class="p-8 border-3 border-brutal-black bg-white neubrutal-shadow text-center">
          <div class="text-5xl font-black mb-2 italic">98.7%</div>
          <div class="text-primary font-black uppercase text-xs tracking-widest">Uptime</div>
        </div>
        <div class="p-8 border-3 border-brutal-black bg-white neubrutal-shadow text-center">
          <div class="text-5xl font-black mb-2 italic">100+</div>
          <div class="text-primary font-black uppercase text-xs tracking-widest">Fixed Bugs</div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.marquee-animated {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  animation: scroll-left 30s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.hero-text-container {
  position: relative;
}

.logo-animation-container {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  z-index: 5;
  pointer-events: none;
}
</style>
