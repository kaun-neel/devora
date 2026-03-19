<script setup>
import { ref, computed, onMounted } from 'vue'
import { debugCode, executeCode } from '@/api/devora.js'

const code = ref('')
const result = ref(null)
const loading = ref(false)
const error = ref('')

const isExecuting = ref(false)
const executionOutput = ref('')
const terminalOpen = ref(false)

const usageCount = ref(0)
onMounted(() => {
  usageCount.value = parseInt(localStorage.getItem('devora_usage_count') || '0', 10)
})

const incrementUsage = () => {
  if (usageCount.value < 10) {
    usageCount.value++
    localStorage.setItem('devora_usage_count', usageCount.value)
  }
}

const realTimeLanguage = computed(() => {
  const c = code.value.trim()
  if (!c) return 'Awaiting Input...'
  
  if (c.includes('#include') || c.includes('std::')) return 'C++'
  if (c.includes('public class ') && c.includes('System.out')) return 'Java'
  if (c.includes('def ') || (c.includes('import ') && !c.includes('{'))) return 'Python'
  if (c.includes('const ') || c.includes('let ') || c.includes('=>') || c.includes('console.log')) return 'JavaScript'
  if (c.includes('<?php')) return 'PHP'
  if (c.includes('func ') || c.includes('fmt.Println')) return 'Go'
  if (c.includes('<html') || c.includes('<div')) return 'HTML'
  if (c.match(/SELECT.*FROM/i)) return 'SQL'
  
  return result.value ? result.value.language : 'Auto-detecting...'
})

const handleDebug = async () => {
  if (!code.value.trim()) return
  if (usageCount.value >= 10) {
    error.value = "Tokens depleted (10/10). Please upgrade or refresh."
    return
  }
  
  loading.value = true
  error.value = ''
  result.value = null
  try {
    incrementUsage()
    result.value = await debugCode(code.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const applyFixes = () => {
  if (result.value && result.value.fixed_code) {
    code.value = result.value.fixed_code
  }
}

const runCode = async () => {
  if (!code.value.trim()) return
  terminalOpen.value = true
  isExecuting.value = true
  executionOutput.value = 'Compiling and running...'
  
  try {
    const lang = result.value ? result.value.language : 'python'
    const res = await executeCode(code.value, lang)
    if (res.error && !res.output) {
      executionOutput.value = `[System Error]\n${res.error}`
    } else {
      executionOutput.value = res.output + (res.error ? `\n[Stderr]\n${res.error}` : '')
      if (!executionOutput.value.trim()) {
        executionOutput.value = 'Execution finished with no output.'
      }
    }
  } catch (err) {
    executionOutput.value = `[Internal Error]\n${err.message}`
  } finally {
    isExecuting.value = false
  }
}
</script>

<template>
  <div class="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
    <!-- Navigation Replacement (We use the global NavBar) -->

    <main class="max-w-[1440px] mx-auto px-6 py-24 space-y-10">
      <!-- Header Section -->
      <div class="flex flex-col gap-2">
        <h1 class="text-6xl font-black tracking-tighter text-black dark:text-white uppercase italic">Debugger</h1>
        <p class="text-black dark:text-slate-400 max-w-2xl font-bold bg-white dark:bg-slate-800 brutal-border p-4 brutal-shadow inline-block">Identify and resolve code issues with AI-powered diagnosis. Upload your snippet or connect your repository to start the analysis.</p>
      </div>

      <!-- Debugger Interface -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        <!-- Left Panel: Editor -->
        <div class="bg-white dark:bg-slate-900 brutal-border-thick brutal-shadow-lg overflow-hidden flex flex-col h-[700px]">
          <div class="p-4 border-b-2 border-black flex justify-between items-center bg-primary/10 dark:bg-slate-800">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined font-black">code</span>
              <h3 class="font-black uppercase tracking-tight">Your Code</h3>
              <span class="text-xs font-black px-2 py-0.5 border-2 border-black bg-white dark:bg-slate-700">source_code</span>
            </div>
            <div class="flex items-center gap-4">
              <span v-if="error" class="text-red-500 font-bold text-sm bg-red-100 px-2 py-1 border border-red-500">{{ error }}</span>
              <button @click="runCode" :disabled="isExecuting" class="bg-black text-emerald-400 border-2 border-black px-4 py-2 font-black brutal-shadow transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-2 disabled:opacity-50 hover:bg-zinc-900">
                <span v-if="isExecuting" class="material-symbols-outlined text-sm font-black animate-spin">sync</span>
                <span v-else class="material-symbols-outlined text-sm font-black">play_arrow</span>
                RUN CODE
              </button>
              <button @click="handleDebug" :disabled="loading" class="bg-primary border-2 border-black text-white px-6 py-2 font-black brutal-shadow transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="loading" class="material-symbols-outlined text-sm font-black animate-spin">refresh</span>
                <span v-else class="material-symbols-outlined text-sm font-black">bolt</span>
                {{ loading ? 'ANALYSING...' : 'ANALYSE & FIX' }}
              </button>
            </div>
          </div>
          <div class="flex-1 flex flex-col overflow-hidden relative">
            <div class="flex-1 flex overflow-hidden relative">
              <!-- Line Numbers -->
              <div class="w-12 bg-white dark:bg-slate-950 text-black dark:text-slate-400 text-right pr-3 pt-4 text-xs select-none border-r-2 border-black leading-6 font-mono font-bold whitespace-pre">
                {{ Array.from({length: code.split('\n').length || 1}, (_, i) => i + 1).join('\n') }}
              </div>
              <!-- Editor Area -->
              <div class="flex-1 bg-black p-0 overflow-hidden relative">
                <textarea v-model="code" spellcheck="false" class="absolute inset-0 w-full h-full bg-transparent text-emerald-300 font-mono text-sm leading-6 p-4 focus:outline-none resize-none" placeholder="Paste your broken code here..."></textarea>
              </div>
            </div>
            
            <!-- Terminal Drawer -->
            <div v-if="terminalOpen" class="h-48 bg-zinc-950 border-t-4 border-black flex flex-col relative w-full">
              <div class="bg-zinc-900 border-b-2 border-black p-2 flex justify-between items-center text-zinc-400">
                <span class="text-xs font-black uppercase tracking-widest flex items-center gap-2"><span class="material-symbols-outlined text-sm">terminal</span> Console Output</span>
                <button @click="terminalOpen = false" class="hover:text-white material-symbols-outlined text-sm">close</button>
              </div>
              <div class="flex-1 overflow-auto p-4 text-xs font-mono whitespace-pre-wrap word-break-all text-white">
                <span :class="{'text-emerald-400': !executionOutput.includes('Error') && !executionOutput.includes('Exception'), 'text-red-400': executionOutput.includes('Error') || executionOutput.includes('Exception')}">{{ executionOutput }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Diagnosis -->
        <div class="bg-white dark:bg-slate-900 brutal-border-thick brutal-shadow-lg overflow-hidden flex flex-col h-[700px]">
          <div class="p-4 border-b-2 border-black flex justify-between items-center bg-yellow-400 dark:bg-slate-800">
            <div class="flex items-center gap-2 text-black dark:text-white">
              <span class="material-symbols-outlined font-black">analytics</span>
              <h3 class="font-black uppercase tracking-tight">Diagnosis</h3>
            </div>
            <div v-if="result" class="flex items-center gap-2">
              <span class="flex items-center gap-1 bg-white border-2 border-black px-3 py-1 text-xs font-black uppercase text-black">
                <span class="size-3 bg-red-600 brutal-border-sm" :class="{'bg-emerald-500': result.errors.length === 0}"></span>
                {{ result.errors.length }} errors found
              </span>
            </div>
          </div>
          
          <div v-if="!result" class="flex-1 flex items-center justify-center p-8 text-center text-black/50 dark:text-white/50 font-bold">
            <div class="flex flex-col items-center gap-4">
              <span class="material-symbols-outlined text-6xl">youtube_searched_for</span>
              <p>Paste your snippet and click "Analyse & Fix" to detect anomalies, anti-patterns, and syntax faults.</p>
            </div>
          </div>

          <div v-else class="flex-1 overflow-y-auto p-4 space-y-6">
            <!-- Summary Profile -->
            <div class="bg-devora-accent border-2 border-black p-4 text-sm font-bold text-devora-purple">
              {{ result.summary }}
            </div>

            <!-- Section A: Error Cards -->
            <div class="space-y-4" v-if="result.errors.length > 0">
              <p class="text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Issues Identified</p>
              
              <!-- Error Item -->
              <div v-for="(err, idx) in result.errors" :key="idx" class="border-2 border-black bg-red-100 dark:bg-red-900/30 p-4 brutal-shadow text-black">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-black text-sm text-black uppercase">{{ err.type }}</h4>
                  <span class="text-xs font-black border border-black px-1 bg-white text-black">Line {{ err.line }}</span>
                </div>
                <p class="text-sm dark:text-slate-400 leading-relaxed font-bold">{{ err.explanation }}</p>
              </div>
            </div>

            <!-- Section B & C: Proposed Fix / Diff -->
            <div class="space-y-4" v-if="result.changes.length > 0">
              <p class="text-xs font-black uppercase tracking-widest text-black/50 dark:text-white/50">Proposed Solution</p>
              <div class="bg-black border-2 border-black brutal-shadow overflow-hidden">
                <div class="p-2 bg-slate-800 border-b-2 border-black flex items-center justify-between">
                  <span class="text-[10px] text-white uppercase font-black tracking-widest px-2">Diff View</span>
                </div>
                <div class="p-4 text-xs font-mono font-bold leading-5 space-y-2">
                  <template v-for="(change, idx) in result.changes" :key="'ch-'+idx">
                    <div class="bg-red-900 text-red-100 -mx-4 px-4 line-through whitespace-pre-wrap word-break-all">- {{ change.original }}</div>
                    <div class="bg-emerald-900 text-emerald-100 -mx-4 px-4 whitespace-pre-wrap word-break-all">+ {{ change.fixed }}</div>
                    <div class="text-slate-400 italic text-[10px] mt-1 mb-3">// {{ change.reason }}</div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Action Footer -->
          <div v-if="result && result.fixed_code" class="p-4 border-t-2 border-black bg-slate-50 dark:bg-slate-800">
            <button @click="applyFixes" class="w-full py-4 bg-white border-4 border-black text-black hover:bg-black hover:text-white font-black brutal-shadow-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none uppercase flex items-center justify-center gap-2">
              <span class="material-symbols-outlined font-black">auto_fix_high</span>
              Apply All Fixes
            </button>
          </div>
        </div>

      </div>

      <!-- Bottom Status Bar -->
      <div class="flex flex-col md:flex-row items-center gap-4 bg-emerald-400 p-6 brutal-border-thick brutal-shadow text-black">
        <div class="flex items-center gap-4">
          <div class="size-12 bg-white border-2 border-black flex items-center justify-center text-black brutal-shadow-sm flex-shrink-0">
            <span class="material-symbols-outlined font-black text-3xl">memory</span>
          </div>
          <div>
            <p class="text-lg font-black uppercase italic">AI Model: Devora Coder version 1.5</p>
            <p class="text-sm font-bold text-black/70">
              <span>Detected Language: <span class="bg-white px-1 uppercase border border-black">{{ realTimeLanguage }}</span></span>
            </p>
          </div>
        </div>
        
        <div class="md:ml-auto flex items-center gap-8 w-full md:w-auto">
          <div class="flex flex-col items-end w-full md:w-48">
            <p class="text-xs font-black uppercase tracking-widest">Token Usage ({{ usageCount }}/10)</p>
            <div class="w-full h-4 bg-white border-2 border-black mt-1 overflow-hidden">
              <div class="h-full bg-black transition-all duration-300" :style="`width: ${(usageCount / 10) * 100}%;`"></div>
            </div>
          </div>
          
          <div class="hidden md:block h-12 w-1 bg-black"></div>
          
          <div class="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 brutal-shadow-sm">
            <div class="size-3 bg-black rounded-full animate-pulse"></div>
            <span class="text-xs font-black uppercase">System Ready</span>
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<style scoped>
.brutal-border { border: 2px solid black; }
.brutal-border-thick { border: 4px solid black; }
.brutal-shadow { box-shadow: 4px 4px 0px 0px black; }
.brutal-shadow-lg { box-shadow: 8px 8px 0px 0px black; }
.brutal-shadow-sm { box-shadow: 2px 2px 0px 0px black; }
</style>
