<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/composables/useUserStore.js'

const { currentUser, isLoggedIn, logout } = useUserStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const handleLogout = () => {
  showUserMenu.value = false
  showMobileMenu.value = false
  logout()
}

const userInitials = () => {
  if (!currentUser.value) return '?'
  const name = currentUser.value.name || currentUser.value.email
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}
</script>

<template>
  <nav class="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-[92%] max-w-3xl">
    <div class="bg-white/90 backdrop-blur-md rounded-2xl border-2 border-black/10 shadow-lg px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex items-center">
          <span class="w-5 h-5 rounded-full bg-primary inline-block"></span>
          <span class="w-5 h-5 rounded-full bg-primary-dark inline-block -ml-2 opacity-80"></span>
          <span class="w-5 h-5 rounded-full bg-devora-tan inline-block -ml-2 opacity-70"></span>
        </div>
        <span class="text-lg sm:text-xl font-black tracking-tight text-[#1a1a2e] uppercase">DEVORA</span>
      </RouterLink>

      <!-- Nav Links (desktop) -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Home</RouterLink>
        <RouterLink to="/code" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Code</RouterLink>
        <RouterLink to="/debugger" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Debugger</RouterLink>
        <RouterLink to="/profile" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Profile</RouterLink>
      </div>

      <!-- Auth Area + Mobile Toggle -->
      <div class="flex items-center gap-2 sm:gap-3">
        <template v-if="isLoggedIn">
          <!-- User Avatar Dropdown -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black">
                {{ userInitials() }}
              </div>
              <span class="text-xs font-bold uppercase tracking-wide text-slate-700 hidden sm:block max-w-[100px] truncate">
                {{ currentUser.name || 'User' }}
              </span>
              <span class="material-symbols-outlined text-sm text-slate-400">expand_more</span>
            </button>

            <!-- Dropdown -->
            <Transition name="dropdown">
              <div v-if="showUserMenu" class="absolute right-0 top-full mt-2 w-56 bg-white border-4 border-black shadow-brutal rounded-none overflow-hidden z-50">
                <div class="p-4 border-b-2 border-black bg-slate-50">
                  <p class="font-black text-sm uppercase truncate">{{ currentUser.name || 'User' }}</p>
                  <p class="text-xs text-slate-500 font-bold truncate">{{ currentUser.email }}</p>
                </div>
                <RouterLink to="/profile" @click="showUserMenu = false" class="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-sm font-bold uppercase tracking-wide">
                  <span class="material-symbols-outlined text-lg">person</span>
                  My Profile
                </RouterLink>
                <RouterLink to="/profile/edit" @click="showUserMenu = false" class="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-sm font-bold uppercase tracking-wide">
                  <span class="material-symbols-outlined text-lg">settings</span>
                  Edit Profile
                </RouterLink>
                <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-100 transition-colors text-sm font-bold uppercase tracking-wide text-red-600 border-t-2 border-black">
                  <span class="material-symbols-outlined text-lg">logout</span>
                  Log Out
                </button>
              </div>
            </Transition>
          </div>
        </template>

        <template v-else>
          <button @click="$emit('open-auth', 'login')" class="text-xs font-bold uppercase tracking-wide px-2 sm:px-3 py-1.5 text-slate-600 hover:text-primary transition-colors hidden sm:block">Log In</button>
          <button @click="$emit('open-auth', 'signup')" class="bg-primary text-white text-xs font-bold uppercase tracking-wide px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg hover:bg-primary-dark transition-colors">Sign Up</button>
        </template>

        <!-- Mobile hamburger -->
        <button @click="showMobileMenu = !showMobileMenu" class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors ml-1">
          <span class="material-symbols-outlined text-xl text-slate-700">{{ showMobileMenu ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Nav Dropdown -->
    <Transition name="mobile-menu">
      <div v-if="showMobileMenu" class="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-xl border-2 border-black/10 shadow-lg p-4 space-y-1">
        <RouterLink to="/" @click="showMobileMenu = false" class="block px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">Home</RouterLink>
        <RouterLink to="/code" @click="showMobileMenu = false" class="block px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">Code</RouterLink>
        <RouterLink to="/debugger" @click="showMobileMenu = false" class="block px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">Debugger</RouterLink>
        <RouterLink to="/profile" @click="showMobileMenu = false" class="block px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">Profile</RouterLink>
        <template v-if="!isLoggedIn">
          <div class="border-t border-slate-200 pt-3 mt-2 flex gap-2">
            <button @click="showMobileMenu = false; $emit('open-auth', 'login')" class="flex-1 text-xs font-bold uppercase tracking-wide px-3 py-2.5 text-slate-600 hover:text-primary border-2 border-slate-200 rounded-lg transition-colors">Log In</button>
            <button @click="showMobileMenu = false; $emit('open-auth', 'signup')" class="flex-1 bg-primary text-white text-xs font-bold uppercase tracking-wide px-3 py-2.5 rounded-lg hover:bg-primary-dark transition-colors">Sign Up</button>
          </div>
        </template>
      </div>
    </Transition>

    <!-- Click-away listener -->
    <div v-if="showUserMenu || showMobileMenu" class="fixed inset-0 z-[-1]" @click="showUserMenu = false; showMobileMenu = false"></div>
  </nav>
</template>

<style scoped>
.shadow-brutal { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }

.dropdown-enter-active { transition: all 0.15s ease-out; }
.dropdown-leave-active { transition: all 0.1s ease-in; }
.dropdown-enter-from { transform: translateY(-8px); opacity: 0; }
.dropdown-leave-to { transform: translateY(-8px); opacity: 0; }

.mobile-menu-enter-active { transition: all 0.2s ease-out; }
.mobile-menu-leave-active { transition: all 0.15s ease-in; }
.mobile-menu-enter-from { transform: translateY(-8px); opacity: 0; }
.mobile-menu-leave-to { transform: translateY(-8px); opacity: 0; }
</style>
