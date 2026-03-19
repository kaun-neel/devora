<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl">
    <div class="bg-white/85 backdrop-blur-md rounded-2xl border-2 border-black/8 shadow-lg px-6 py-3 flex items-center justify-between">
      <!-- Logo — overlapping circles + DEVORA text -->
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex items-center">
          <span class="w-5 h-5 rounded-full bg-[#5B3AC7] inline-block"></span>
          <span class="w-5 h-5 rounded-full bg-[#8B6FD4] inline-block -ml-2 opacity-80"></span>
          <span class="w-5 h-5 rounded-full bg-[#C4B5E8] inline-block -ml-2 opacity-70"></span>
        </div>
        <span class="text-xl font-black tracking-tight text-[#1a1a2e] uppercase" style="font-style: normal;">DEVORA</span>
      </RouterLink>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Home</RouterLink>
        <RouterLink to="/code" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Code</RouterLink>
        <RouterLink to="/debugger" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Debugger</RouterLink>
        <RouterLink to="/profile" class="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Profile</RouterLink>
      </div>

      <!-- Auth Buttons -->
      <div class="flex items-center gap-3">
        <button @click="$emit('open-auth', 'login')" class="text-xs font-bold uppercase tracking-wide px-3 py-1.5 text-slate-600 hover:text-primary transition-colors">Log In</button>
        <button @click="$emit('open-auth', 'signup')" class="bg-primary text-white text-xs font-bold uppercase tracking-wide px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors">Sign Up</button>
      </div>
    </div>
  </nav>
</template>
