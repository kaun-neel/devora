<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  initialTab: {
    type: String,
    default: 'login' // 'login' or 'signup'
  }
})

const emit = defineEmits(['close'])

const activeTab = ref(props.initialTab)

const setTab = (tab) => {
    activeTab.value = tab
}

const closeModal = () => {
    emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4">
    <!-- Click away to close -->
    <div class="absolute inset-0" @click="closeModal"></div>

    <!-- Auth Card -->
    <div class="relative w-full max-w-[480px] bg-white dark:bg-slate-900 brutalist-border shadow-neubrutalism overflow-hidden z-10 font-display">
      
      <!-- Close Button -->
      <button @click="closeModal" class="absolute top-4 right-4 text-black dark:text-white hover:text-primary transition-colors z-20">
        <span class="material-symbols-outlined font-black">close</span>
      </button>

      <!-- Header/Logo -->
      <div class="pt-10 pb-6 flex flex-col items-center">
        <img alt="Devora Logo" class="h-10 mb-2" src="data:image/png;base64,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"/>
        <p class="text-black dark:text-slate-400 text-sm font-bold uppercase tracking-tight">Build the future of development</p>
      </div>

      <!-- Tab Switcher -->
      <div class="px-8">
        <div class="flex brutalist-border-sm bg-black">
          <button 
            @click="setTab('login')"
            class="flex-1 py-4 text-sm font-black transition-colors uppercase tracking-widest border-r-2 border-black"
            :class="activeTab === 'login' ? 'bg-primary text-white' : 'bg-white text-black hover:bg-slate-100'"
          >
            Log In
          </button>
          <button 
            @click="setTab('signup')"
            class="flex-1 py-4 text-sm font-black transition-colors uppercase tracking-widest"
            :class="activeTab === 'signup' ? 'bg-primary text-white' : 'bg-white text-black hover:bg-slate-100'"
          >
            Sign Up
          </button>
        </div>
      </div>

      <!-- Login Form -->
      <div v-if="activeTab === 'login'" class="p-8 space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Email Address</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">mail</span>
            <input class="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 brutalist-border-sm focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="name@company.com" type="email"/>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Password</label>
            <a class="text-xs font-black text-primary hover:underline uppercase" href="#">Forgot?</a>
          </div>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">lock</span>
            <input class="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 brutalist-border-sm focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="••••••••" type="password"/>
            <button class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-black text-xl hover:text-primary transition-colors">visibility</button>
          </div>
        </div>

        <button class="w-full py-5 bg-primary text-white font-black uppercase tracking-widest brutalist-border-sm shadow-neubrutalism-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.98]">
          Log In to Account
        </button>

        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t-2 border-black dark:border-slate-800"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white dark:bg-slate-900 px-4 text-black font-black">Or continue with</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 brutalist-border-sm shadow-neubrutalism-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            <span class="text-xs font-black text-black dark:text-slate-200 uppercase">Google</span>
          </button>
          <button class="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 brutalist-border-sm shadow-neubrutalism-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            <span class="text-xs font-black text-black dark:text-slate-200 uppercase">GitHub</span>
          </button>
        </div>
      </div>
      
      <!-- Signup Form (Same layout conceptually) -->
      <div v-if="activeTab === 'signup'" class="p-8 space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Email Address</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">mail</span>
            <input class="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 brutalist-border-sm focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="new.user@company.com" type="email"/>
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Choose a Password</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">lock</span>
            <input class="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 brutalist-border-sm focus:ring-0 focus:translate-x-1 focus:translate-y-1 transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="••••••••" type="password"/>
          </div>
        </div>
        <button class="w-full py-5 bg-devora-purple text-white font-black uppercase tracking-widest brutalist-border-sm shadow-neubrutalism-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.98]">
          Create Account
        </button>
      </div>

      <!-- Footer Note -->
      <div class="bg-black/5 dark:bg-slate-800/50 p-6 text-center border-t-2 border-black">
        <p class="text-[10px] text-black dark:text-slate-400 leading-relaxed font-bold uppercase tracking-tight">
          By continuing, you agree to Devora's 
          <a class="underline decoration-2 hover:text-primary transition-colors" href="#">Terms of Service</a> and 
          <a class="underline decoration-2 hover:text-primary transition-colors" href="#">Privacy Policy</a>.
        </p>
      </div>

    </div>
  </div>
</template>
