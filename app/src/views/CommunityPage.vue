<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/composables/useUserStore.js'
import { languages } from '@/data/communitySnippets.js'

const { isLoggedIn } = useUserStore()
const emit = defineEmits(['open-auth'])

const selectedLanguage = ref(null)

// Global Trending items
const globalTrending = [
  languages.find(l => l.id === 'react').snippets.find(s => s.trending),
  languages.find(l => l.id === 'python').snippets.find(s => s.trending),
  languages.find(l => l.id === 'sql').snippets.find(s => s.trending),
  languages.find(l => l.id === 'docker').snippets.find(s => s.trending)
]

// Real Feed Simulation
const feedItems = ref([
  "**User_789** generated a Dockerfile for Node.js just now",
  "**React_Pro** requested a useAuth Hook 2 mins ago",
  "**DevNinja** verified an SQL Upsert snippet 5 mins ago"
])

let feedInterval;
onMounted(() => {
  const actions = ["generated", "requested", "verified", "copied"]
  const topics = ["a REST API in Go", "a JWT Middleware in Express", "a Redux Store setup", "a Python scraping script", "a Django Model setup", "a C++ Vector Loop"]
  const users = ["coderX", "dev_ninja99", "frontend_bob", "backend_beast", "sysadmin_dan", "data_lord", "ui_dev22"]
  
  feedInterval = setInterval(() => {
    const action = actions[Math.floor(Math.random() * actions.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const user = users[Math.floor(Math.random() * users.length)]
    
    feedItems.value.unshift(`**${user}** ${action} ${topic} just now`)
    if (feedItems.value.length > 5) {
      feedItems.value.pop()
    }
  }, 4000)
})

onUnmounted(() => {
  clearInterval(feedInterval)
})

const handleCopy = (code) => {
  navigator.clipboard.writeText(code)
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang
}

const formatFeedItem = (item) => {
  return item.replace(/\*\*(.*?)\*\*/g, '<span class="text-emerald-400 font-bold">$1</span>')
}
</script>

<template>
  <div class="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
    
    <main class="max-w-[1440px] mx-auto px-3 sm:px-6 pt-28 pb-10 sm:pt-36 sm:pb-16 space-y-12">
      
      <!-- Login Gate -->
      <div v-if="!isLoggedIn" class="bg-yellow-100 border-4 border-black brutal-shadow-lg p-8 sm:p-12 text-center max-w-3xl mx-auto my-12">
        <span class="material-symbols-outlined text-6xl mb-4 text-black">lock</span>
        <h2 class="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black mb-4">Access Restricted</h2>
        <p class="font-bold text-slate-800 mb-8 max-w-md mx-auto">You must be logged in to view the community snippets and trending algorithms.</p>
        <button @click="emit('open-auth', 'login')" class="bg-primary text-white border-4 border-black font-black uppercase px-8 py-4 brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all active:bg-primary-dark">
          Log In or Sign Up
        </button>
      </div>

      <div v-else>
        <!-- Header -->
        <div class="flex flex-col gap-2 mb-12">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-black dark:text-white uppercase italic">Community</h1>
          <p class="text-black dark:text-slate-400 max-w-2xl font-bold bg-yellow-400 dark:bg-slate-800 brutal-border p-3 sm:p-4 brutal-shadow inline-block text-sm sm:text-base mb-2">
            Discover what developers are building with DEVORA.
          </p>
          
          <!-- Blended Real Feed -->
          <div class="bg-black text-white p-3 brutal-border brutal-shadow flex items-center gap-4 overflow-hidden max-w-3xl relative mt-4">
            <div class="flex items-center gap-2 bg-zinc-900 px-3 py-1 border-2 border-white/20 whitespace-nowrap shadow-sm z-10">
              <span class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <span class="text-emerald-400 font-black tracking-widest uppercase text-xs">Real Feed</span>
            </div>
            <div class="flex-1 overflow-hidden relative h-6">
              <Transition name="feed">
                <div 
                  :key="feedItems[0]"
                  class="absolute w-full truncate text-sm font-mono text-zinc-300"
                  v-html="formatFeedItem(feedItems[0])"
                ></div>
              </Transition>
            </div>
          </div>
        </div>

        <div v-if="!selectedLanguage">
          <!-- Global Trending Section -->
          <section class="mb-16">
            <div class="flex items-center gap-3 mb-6">
              <span class="material-symbols-outlined text-red-500 text-3xl font-black">local_fire_department</span>
              <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-widest border-b-4 border-black pb-1 inline-block">Trending Right Now</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="(snippet, idx) in globalTrending" 
                :key="idx"
                class="bg-white dark:bg-slate-900 border-4 border-black brutal-shadow-lg flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform"
              >
                <div class="bg-primary/10 border-b-4 border-black p-4 flex justify-between items-start">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="bg-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 brutal-border">Trending 🔥</span>
                      <span class="text-xs font-mono font-bold text-slate-500">by {{ snippet.author }}</span>
                    </div>
                    <h3 class="font-black text-lg uppercase tracking-tight">{{ snippet.title }}</h3>
                  </div>
                  <button @click="handleCopy(snippet.code)" class="bg-white border-2 border-black p-1.5 hover:bg-slate-100 brutal-shadow-sm active:translate-y-0.5 active:shadow-none" title="Copy">
                    <span class="material-symbols-outlined text-sm font-black">content_copy</span>
                  </button>
                </div>
                <div class="bg-black p-4 flex-1">
                  <pre class="font-mono text-xs text-emerald-400 whitespace-pre overflow-x-auto"><code>{{ snippet.code }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- Language Grid -->
          <section>
            <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-widest border-b-4 border-black pb-1 inline-block mb-6">Explore Languages</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              <button
                v-for="lang in languages"
                :key="lang.id"
                @click="selectLanguage(lang)"
                :class="[
                  lang.color, lang.textColor,
                  'aspect-square border-4 border-black brutal-shadow-lg hover:brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col items-center justify-center p-4 group'
                ]"
              >
                <i :class="[lang.icon, 'text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition-transform']"></i>
                <h3 class="font-black text-xl uppercase tracking-widest">{{ lang.name }}</h3>
                <span class="mt-2 text-[10px] font-black uppercase bg-black text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">View Snippets</span>
              </button>
            </div>
          </section>
        </div>

        <!-- Detailed Language View -->
        <div v-else class="animate-fade-in">
          <button 
            @click="selectedLanguage = null"
            class="mb-8 flex items-center gap-2 bg-white text-black border-4 border-black px-4 py-2 font-black uppercase brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <span class="material-symbols-outlined">arrow_back</span>
            Back to Grid
          </button>

          <div class="flex items-center gap-4 mb-8">
            <div :class="[selectedLanguage.color, selectedLanguage.textColor, 'w-20 h-20 border-4 border-black brutal-shadow flex items-center justify-center']">
              <i :class="[selectedLanguage.icon, 'text-5xl']"></i>
            </div>
            <h2 class="text-4xl sm:text-5xl font-black uppercase tracking-tighter">{{ selectedLanguage.name }} Snippets</h2>
          </div>

          <div class="space-y-8">
            <div 
              v-for="(snippet, idx) in selectedLanguage.snippets" 
              :key="idx"
              class="bg-white dark:bg-slate-900 border-4 border-black brutal-shadow-lg flex flex-col overflow-hidden"
            >
              <div class="bg-slate-50 dark:bg-slate-800 border-b-4 border-black p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <span v-if="snippet.trending" class="bg-red-500 text-white text-[10px] sm:text-xs font-black uppercase px-2 py-1 brutal-border shadow-[2px_2px_0px_0px_black]">Trending 🔥</span>
                    <span class="text-xs font-mono font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-1 brutal-border">author: {{ snippet.author }}</span>
                  </div>
                  <h3 class="font-black text-xl sm:text-2xl uppercase tracking-tight text-black dark:text-white">{{ snippet.title }}</h3>
                  <p class="font-bold text-sm text-slate-700 dark:text-slate-400 mt-1">{{ snippet.description }}</p>
                </div>
                <button 
                  @click="handleCopy(snippet.code)"
                  class="flex-shrink-0 bg-primary text-white border-4 border-black px-4 py-2 font-black text-sm uppercase brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all flex items-center gap-2"
                >
                  <span class="material-symbols-outlined">content_copy</span>
                  Copy Code
                </button>
              </div>
              <div class="bg-black p-4 sm:p-6 flex-1 overflow-x-auto">
                <pre class="font-mono text-sm sm:text-base leading-relaxed text-emerald-400 whitespace-pre"><code>{{ snippet.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<style scoped>
.brutal-border { border: 2px solid black; }
.brutal-shadow { box-shadow: 4px 4px 0px 0px black; }
.brutal-shadow-sm { box-shadow: 2px 2px 0px 0px black; }
.brutal-shadow-lg { box-shadow: 8px 8px 0px 0px black; }

.feed-enter-active,
.feed-leave-active {
  transition: all 0.5s ease;
}
.feed-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.feed-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
