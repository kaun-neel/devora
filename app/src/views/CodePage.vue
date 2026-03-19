<script setup>
import { ref } from 'vue'
import { generateCode } from '@/api/devora.js'

const prompt = ref('')
const language = ref('auto')
const result = ref(null)
const loading = ref(false)
const error = ref('')

const handleGenerate = async () => {
  if (!prompt.value.trim()) return
  loading.value = true
  error.value = ''
  result.value = null
  try {
    result.value = await generateCode(prompt.value, language.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const selectExample = (text) => {
  prompt.value = text
}
</script>

<template>
  <div class="bg-devora-cream text-slate-900 font-display min-h-screen">
    <!-- Main Content Container -->
    <main class="max-w-[1400px] mx-auto px-6 py-32">
      
      <!-- Split Layout: Header Left, Input Right -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <!-- Left Column: Header & Features -->
        <div class="lg:col-span-4">
          <header class="sticky top-32">
            <h1 class="text-7xl font-black text-devora-purple mb-6 uppercase italic tracking-tighter leading-[0.85]">
              Forge<br/>Code
            </h1>
            <p class="text-slate-600 text-lg font-medium mb-8 leading-relaxed">
              Harness the power of DEVORA's neural engine to generate optimized, production-ready code from natural language prompts.
            </p>
            
            <!-- Quick Stats -->
            <div class="flex gap-4 mb-8">
              <div class="bg-white border-3 border-black px-4 py-3 shadow-brutal">
                <div class="text-2xl font-black text-devora-purple">15+</div>
                <div class="text-[10px] font-black uppercase tracking-widest text-slate-500">Languages</div>
              </div>
              <div class="bg-white border-3 border-black px-4 py-3 shadow-brutal">
                <div class="text-2xl font-black text-devora-purple">&lt;1s</div>
                <div class="text-[10px] font-black uppercase tracking-widest text-slate-500">Response</div>
              </div>
              <div class="bg-white border-3 border-black px-4 py-3 shadow-brutal">
                <div class="text-2xl font-black text-devora-purple">99%</div>
                <div class="text-[10px] font-black uppercase tracking-widest text-slate-500">Accuracy</div>
              </div>
            </div>

            <!-- Feature Cards -->
            <div class="space-y-4 mb-8">
              <div class="bg-white border-3 border-black p-5 shadow-brutal hover:translate-x-1 transition-transform cursor-pointer">
                <div class="flex items-center gap-3 mb-2">
                  <span class="w-10 h-10 bg-primary flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">bolt</span>
                  </span>
                  <h4 class="font-black uppercase text-sm">Lightning Fast</h4>
                </div>
                <p class="text-xs text-slate-500 font-medium">Generate code in seconds, not minutes.</p>
              </div>

              <div class="bg-white border-3 border-black p-5 shadow-brutal hover:translate-x-1 transition-transform cursor-pointer">
                <div class="flex items-center gap-3 mb-2">
                  <span class="w-10 h-10 bg-devora-purple flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">psychology</span>
                  </span>
                  <h4 class="font-black uppercase text-sm">AI-Powered</h4>
                </div>
                <p class="text-xs text-slate-500 font-medium">Smart suggestions and optimizations.</p>
              </div>
            </div>

            <!-- Try these examples - Now on left side -->
            <div>
              <h3 class="text-xs font-black text-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span class="w-6 h-1 bg-black"></span>
                Try these examples
              </h3>
              <div class="space-y-2">
                <button @click="selectExample('Write a Python function to sort a list of dictionaries by a specific key, including error handling')" class="w-full flex items-center gap-3 p-3 bg-white brutal-border-thin shadow-brutal text-left hover:bg-devora-accent transition-colors group">
                  <span class="material-symbols-outlined text-black text-sm">terminal</span>
                  <span class="text-black text-xs font-black uppercase">Sort a dictionary</span>
                </button>
                <button @click="selectExample('Write a JavaScript function to fetch data from a REST API and return a JSON object')" class="w-full flex items-center gap-3 p-3 bg-white brutal-border-thin shadow-brutal text-left hover:bg-devora-accent transition-colors group">
                  <span class="material-symbols-outlined text-black text-sm">api</span>
                  <span class="text-black text-xs font-black uppercase">Fetch REST API</span>
                </button>
                <button @click="selectExample('Write a regex string and JavaScript test to validate a professional email address')" class="w-full flex items-center gap-3 p-3 bg-white brutal-border-thin shadow-brutal text-left hover:bg-devora-accent transition-colors group">
                  <span class="material-symbols-outlined text-black text-sm">javascript</span>
                  <span class="text-black text-xs font-black uppercase">Validate email</span>
                </button>
              </div>
            </div>
          </header>
        </div>

        <!-- Right Column: Input & Output -->
        <div class="lg:col-span-8">
          <!-- Input Card -->
          <section class="bg-white brutal-border shadow-brutal-lg p-8 mb-8">
            <div class="flex flex-col gap-6">
              <!-- Language Selector -->
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-black uppercase tracking-widest">Select Language:</span>
                <select v-model="language" class="flex items-center gap-2 px-6 py-2 bg-devora-accent text-devora-purple brutal-border-thin font-black text-sm appearance-none outline-none focus:ring-2 focus:ring-primary">
                  <option value="auto">Auto (Let AI decide)</option>
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="sql">SQL</option>
                  <option value="rust">Rust</option>
                  <option value="go">Go</option>
                </select>
              </div>
              
              <!-- Textarea Area -->
              <div class="relative">
                <textarea v-model="prompt" class="w-full p-6 text-black placeholder-slate-500 bg-white brutal-border-thin focus:ring-0 focus:outline-none text-lg font-medium min-h-[200px]" placeholder="e.g. Write a Python function to sort a list of dictionaries by a specific key, including error handling for missing keys..."></textarea>
                <div class="absolute bottom-4 right-4 text-[10px] font-black text-black uppercase bg-devora-accent px-2 py-1 brutal-border-thin">
                  {{ prompt.length }} / 2000 characters
                </div>
              </div>
              
              <!-- Action Button -->
              <div class="flex justify-end items-center gap-4">
                <span v-if="error" class="text-red-600 font-bold bg-red-100 border-2 border-red-600 px-4 py-2">{{ error }}</span>
                <button @click="handleGenerate" :disabled="loading" class="flex items-center gap-2 bg-primary text-white px-10 py-4 brutal-border shadow-brutal font-black text-lg uppercase tracking-tight hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  <span v-if="loading" class="material-symbols-outlined animate-spin">refresh</span>
                  <span v-else class="material-symbols-outlined">auto_awesome</span>
                  {{ loading ? 'Generating...' : 'Generate Code' }}
                </button>
              </div>
            </div>
          </section>

          <!-- Output Card (Generated State) - Now right after input -->
          <section v-if="result" class="bg-white brutal-border shadow-brutal-lg overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 bg-devora-purple text-white border-b-2 border-black">
              <div class="flex items-center gap-4">
                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Generated Code</span>
                <span class="px-3 py-1 bg-white text-black text-[10px] font-black brutal-border-thin uppercase tracking-wider">{{ result.language }}</span>
              </div>
              <button class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
                <span class="material-symbols-outlined text-sm">content_copy</span>
                COPY CODE
              </button>
            </div>
            
            <!-- Code Block -->
            <div class="bg-black p-8 overflow-x-auto">
              <pre class="font-mono text-sm leading-relaxed"><code class="text-slate-300">{{ result.code }}</code></pre>
            </div>
            
            <!-- Explanation Section -->
            <div class="p-8 bg-devora-accent border-t-2 border-black">
              <div class="flex justify-between items-center mb-6">
                <h4 class="text-devora-purple font-black text-sm flex items-center gap-2 uppercase tracking-widest">
                  <span class="material-symbols-outlined text-lg">info</span>
                  Explanation &amp; Optimization
                </h4>
                <div v-if="result.complexity" class="bg-white border-2 border-black px-3 py-1 font-black text-xs">
                  COMPLEXITY: {{ result.complexity }}
                </div>
              </div>
              
              <ul class="space-y-4 text-sm text-black font-medium">
                <li v-for="(point, index) in result.explanation" :key="index" class="flex gap-4 items-start">
                  <span class="w-6 h-6 flex-shrink-0 bg-primary brutal-border-thin flex items-center justify-center text-white text-[10px] font-black mt-0.5">{{ index + 1 }}</span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      
    </main>
  </div>
</template>

<style scoped>
.brutal-border { border: 3px solid #000000; }
.brutal-border-thin { border: 2px solid #000000; }
.shadow-brutal { box-shadow: 4px 4px 0px 0px #000000; }
.shadow-brutal-lg { box-shadow: 8px 8px 0px 0px #000000; }
.bg-devora-cream { background-color: #FFFACD; }
.text-devora-purple { color: #5C3317; }
.bg-devora-purple { background-color: #5C3317; }
.bg-devora-accent { background-color: #FFF3CD; }
</style>
