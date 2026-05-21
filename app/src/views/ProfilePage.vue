<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/composables/useUserStore.js'

const router = useRouter()
const { currentUser, isLoggedIn, activity, languageStats, getTimeAgo } = useUserStore()

const memberSinceText = computed(() => {
  if (!currentUser.value || !currentUser.value.memberSince) return 'Member'
  const d = new Date(currentUser.value.memberSince)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `Member since ${months[d.getMonth()]} ${d.getFullYear()}`
})

const userInitials = computed(() => {
  if (!currentUser.value) return '?'
  const name = currentUser.value.name || currentUser.value.email || ''
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
})

const dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

if (!isLoggedIn.value) {
  router.replace('/')
}
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display pb-20">
    <!-- Not logged in state -->
    <div v-if="!isLoggedIn" class="flex items-center justify-center min-h-screen">
      <div class="text-center p-12 bg-white border-4 border-black shadow-brutal-lg">
        <span class="material-symbols-outlined text-6xl text-primary mb-4">lock</span>
        <h2 class="text-3xl font-black uppercase tracking-tighter mb-4">Please Log In</h2>
        <p class="text-slate-500 font-bold mb-6">Sign in to view your profile and activity.</p>
      </div>
    </div>

    <main v-else class="max-w-[1000px] mx-auto px-3 sm:px-4 py-20 sm:py-24 space-y-6 sm:space-y-10">

      <!-- Profile Header -->
      <div class="bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-brutal-lg overflow-hidden">
        <div class="h-28 sm:h-40 bg-gradient-to-r from-primary to-primary-dark border-b-4 border-black dark:border-white relative overflow-hidden">
          <div class="absolute inset-0 opacity-20 hidden sm:block">
            <div class="absolute top-4 left-8 w-24 h-24 border-4 border-white/30 rotate-12"></div>
            <div class="absolute bottom-2 right-16 w-16 h-16 border-4 border-white/20 -rotate-6"></div>
            <div class="absolute top-8 right-1/3 w-12 h-12 border-4 border-white/25 rotate-45"></div>
          </div>
        </div>
        <div class="px-4 sm:px-8 pb-6 sm:pb-10 flex flex-col items-center sm:items-start sm:flex-row gap-4 sm:gap-8 -mt-12 sm:-mt-16">
          <div class="relative flex-shrink-0">
            <div class="w-24 h-24 sm:w-40 sm:h-40 border-4 border-black dark:border-white bg-white dark:bg-slate-800 overflow-hidden shadow-brutal flex items-center justify-center ring-4 ring-white dark:ring-slate-800">
              <span class="text-3xl sm:text-5xl font-black text-primary">{{ userInitials }}</span>
            </div>
            <div class="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-8 sm:h-8 bg-green-500 border-3 sm:border-4 border-black dark:border-white"></div>
          </div>

          <div class="mt-2 sm:mt-20 flex-1 text-center sm:text-left">
            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{{ currentUser.name || 'User' }}</h1>
            <p class="text-slate-600 dark:text-slate-400 font-bold text-sm sm:text-lg mt-1 uppercase tracking-tight">{{ currentUser.title || 'Developer' }} &bull; {{ memberSinceText }}</p>
            <div class="mt-3 sm:mt-6 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
              <template v-if="activity.badges && activity.badges.length > 0">
                <span v-for="badge in activity.badges.slice(0, 2)" :key="badge.id" class="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black dark:border-white bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-brutal-sm">
                  {{ badge.name }}
                </span>
              </template>
              <span v-else class="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black dark:border-white bg-white dark:bg-slate-800 text-black dark:text-white text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-brutal-sm">
                New Member
              </span>
            </div>
          </div>

          <div class="sm:mt-20">
            <RouterLink to="/profile/edit" class="inline-block px-5 sm:px-8 py-2.5 sm:py-3 bg-white dark:bg-slate-800 text-black dark:text-white border-3 sm:border-4 border-black dark:border-white font-black uppercase tracking-widest text-xs sm:text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-brutal">Edit Profile</RouterLink>
          </div>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div class="bg-white dark:bg-slate-900 p-4 sm:p-8 border-3 sm:border-4 border-black dark:border-white shadow-brutal">
          <p class="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest">Inquiries Run</p>
          <p class="text-2xl sm:text-4xl font-black mt-1 sm:mt-2 text-primary">{{ activity.inquiriesRun.toLocaleString() }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-4 sm:p-8 border-3 sm:border-4 border-black dark:border-white shadow-brutal">
          <p class="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest">Code Debugs</p>
          <p class="text-2xl sm:text-4xl font-black mt-1 sm:mt-2 text-primary">{{ activity.codeDebugs.toLocaleString() }}</p>
        </div>
        <div class="bg-primary p-4 sm:p-8 border-3 sm:border-4 border-black dark:border-white shadow-brutal">
          <p class="text-white text-[10px] sm:text-xs font-black uppercase tracking-widest">Day Streak</p>
          <p class="text-2xl sm:text-4xl font-black mt-1 sm:mt-2 text-white">{{ activity.dayStreak }}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-4 sm:p-8 border-3 sm:border-4 border-black dark:border-white shadow-brutal">
          <p class="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest">Days Active</p>
          <p class="text-2xl sm:text-4xl font-black mt-1 sm:mt-2 text-primary">{{ activity.daysActive }}</p>
        </div>
      </div>

      <!-- Streak Section -->
      <div class="bg-white dark:bg-slate-900 p-5 sm:p-10 border-3 sm:border-4 border-black dark:border-white shadow-brutal-lg">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-8">
          <div>
            <h2 class="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              {{ activity.dayStreak }} day streak
            </h2>
            <p class="text-slate-600 dark:text-slate-400 mt-2 sm:mt-4 font-bold text-sm sm:text-lg max-w-lg">
              <template v-if="activity.dayStreak >= 7">Amazing! You've unlocked the 'Consistency' badge!</template>
              <template v-else-if="activity.dayStreak >= 3">Great going! Keep the momentum to unlock the 'Consistency' badge.</template>
              <template v-else>Start using Devora daily to build your streak!</template>
            </p>
          </div>

          <div class="flex gap-2 sm:gap-4 justify-center sm:justify-end overflow-x-auto">
            <div v-for="day in dayNames" :key="day" class="flex flex-col items-center gap-1 sm:gap-2 flex-shrink-0">
              <span class="text-[10px] sm:text-xs font-black text-black dark:text-white uppercase">{{ day }}</span>
              <div
                class="w-8 h-8 sm:w-12 sm:h-12 border-2 border-black dark:border-white flex items-center justify-center shadow-brutal-sm"
                :class="activity.streakDays[day] ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-600'"
              >
                <span class="material-symbols-outlined font-black text-sm sm:text-base">
                  {{ activity.streakDays[day] ? 'check' : 'local_fire_department' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-5 sm:gap-10">
        <!-- Language Usage -->
        <div class="bg-white dark:bg-slate-900 p-5 sm:p-8 border-3 sm:border-4 border-black dark:border-white shadow-brutal">
          <h3 class="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
            <span class="material-symbols-outlined text-primary font-black">terminal</span>
            Language Usage
          </h3>
          <div v-if="languageStats.length > 0" class="space-y-6">
            <div v-for="lang in languageStats" :key="lang.name" class="space-y-2">
              <div class="flex justify-between text-xs font-black uppercase tracking-widest text-black dark:text-white">
                <span>{{ lang.name }}</span>
                <span>{{ lang.percent }}%</span>
              </div>
              <div class="h-6 w-full bg-white dark:bg-slate-800 border-2 border-black dark:border-white overflow-hidden">
                <div class="h-full bg-primary transition-all duration-500" :style="{ width: lang.percent + '%' }"></div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-slate-400">
            <span class="material-symbols-outlined text-5xl mb-4 block">code</span>
            <p class="font-bold uppercase text-sm">No language data yet</p>
            <p class="text-xs mt-1">Start generating or debugging code!</p>
          </div>
        </div>

        <!-- Badges Section -->
        <div class="bg-white dark:bg-slate-900 p-5 sm:p-8 border-3 sm:border-4 border-black dark:border-white shadow-brutal flex flex-col">
          <h3 class="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
            <span class="material-symbols-outlined text-primary font-black">military_tech</span>
            Badges Earned
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-1">
            <template v-if="activity.badges && activity.badges.length > 0">
              <div v-for="badge in activity.badges" :key="badge.id" class="flex flex-col items-center justify-center p-4 border-2 border-black dark:border-white shadow-brutal-sm hover:-translate-y-1 transition-transform group" :class="[badge.bgColor, badge.darkBg]">
                <div class="w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" :class="badge.iconBg">
                  <span class="material-symbols-outlined text-black font-black text-3xl">{{ badge.icon }}</span>
                </div>
                <p class="font-black text-sm uppercase text-center text-black dark:text-white">{{ badge.name }}</p>
              </div>
            </template>

            <!-- Locked badges (always show some) -->
            <div v-for="i in Math.max(0, 6 - (activity.badges ? activity.badges.length : 0))" :key="'locked-' + i" class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div class="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-slate-300 dark:border-slate-600 flex items-center justify-center mb-3 opacity-50">
                <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 font-black text-3xl">lock</span>
              </div>
              <p class="font-black text-sm uppercase text-center text-slate-400 dark:text-slate-500">Locked</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-slate-900 border-3 sm:border-4 border-black dark:border-white shadow-brutal-lg overflow-hidden">
        <div class="px-4 sm:px-8 py-4 sm:py-6 border-b-3 sm:border-b-4 border-black dark:border-white flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h3 class="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter">
            <span class="material-symbols-outlined text-primary font-black">history</span>
            Recent Activity
          </h3>
          <span class="text-xs font-black text-slate-400 uppercase tracking-widest">{{ activity.recentActivity.length }} items</span>
        </div>

        <div v-if="activity.recentActivity.length > 0" class="divide-y-2 divide-black dark:divide-white">
          <div v-for="(item, idx) in activity.recentActivity.slice(0, 10)" :key="idx" class="p-3 sm:p-6 flex items-center justify-between hover:bg-primary/10 transition-colors gap-3">
            <div class="flex items-center gap-3 sm:gap-6 min-w-0">
              <div class="w-9 h-9 sm:w-12 sm:h-12 border-2 border-black dark:border-white text-black flex items-center justify-center shadow-brutal-sm flex-shrink-0" :class="item.color">
                <span class="material-symbols-outlined font-black text-sm sm:text-base">{{ item.icon }}</span>
              </div>
              <div class="min-w-0">
                <p class="text-xs sm:text-base font-black uppercase truncate">{{ item.title }}</p>
                <p class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-tight truncate">{{ item.tags }}</p>
              </div>
            </div>
            <p class="text-[10px] sm:text-xs font-black text-slate-500 uppercase whitespace-nowrap flex-shrink-0">{{ getTimeAgo(item.time) }}</p>
          </div>
        </div>

        <div v-else class="p-12 text-center text-slate-400">
          <span class="material-symbols-outlined text-5xl mb-4 block">history</span>
          <p class="font-bold uppercase text-sm">No activity yet</p>
          <p class="text-xs mt-1">Start using the Code or Debugger tools to see your activity here.</p>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.shadow-brutal { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
.shadow-brutal-lg { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
.shadow-brutal-sm { box-shadow: 2px 2px 0px 0px rgba(0,0,0,1); }
.dark .shadow-brutal { box-shadow: 4px 4px 0px 0px rgba(255,255,255,0.2); }
.dark .shadow-brutal-lg { box-shadow: 8px 8px 0px 0px rgba(255,255,255,0.2); }
.dark .shadow-brutal-sm { box-shadow: 2px 2px 0px 0px rgba(255,255,255,0.2); }
</style>
