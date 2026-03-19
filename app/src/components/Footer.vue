<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-[#1a1a2e] text-white relative z-10">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-4 gap-12">
        <!-- Brand Column -->
        <div class="md:col-span-2">
          <RouterLink to="/" class="flex items-center gap-3 mb-6">
            <div class="flex items-center">
              <span class="w-5 h-5 rounded-full bg-primary inline-block"></span>
              <span class="w-5 h-5 rounded-full bg-primary-dark inline-block -ml-2 opacity-80"></span>
              <span class="w-5 h-5 rounded-full bg-[#C4B5E8] inline-block -ml-2 opacity-70"></span>
            </div>
            <span class="text-xl font-black tracking-tight text-white uppercase">DEVORA</span>
          </RouterLink>
          <p class="text-white/60 font-medium max-w-md mb-6">
            Your AI coding partner for generating code, debugging, and building amazing projects. 
            Code it, Build it.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            </a>
          </div>
        </div>

        <!-- Links Column 1 -->
        <div>
          <h4 class="font-black uppercase tracking-wider text-sm mb-6 text-white/40">Product</h4>
          <ul class="space-y-3">
            <li><RouterLink to="/code" class="text-white/70 hover:text-primary transition-colors font-medium">Generate Code</RouterLink></li>
            <li><RouterLink to="/debugger" class="text-white/70 hover:text-primary transition-colors font-medium">Debug Code</RouterLink></li>
            <li><a href="#" class="text-white/70 hover:text-primary transition-colors font-medium">Documentation</a></li>
          </ul>
        </div>

        <!-- Links Column 2 -->
        <div>
          <h4 class="font-black uppercase tracking-wider text-sm mb-6 text-white/40">Company</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-white/70 hover:text-primary transition-colors font-medium">About</a></li>
            <li><a href="#" class="text-white/70 hover:text-primary transition-colors font-medium">Contact</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <p class="text-white/60 text-sm font-bold uppercase tracking-widest text-primary mb-1">made with love ❤️</p>
          <p class="text-white/40 text-xs font-medium">© 2026 Devora. All rights reserved.</p>
        </div>
        <div class="flex gap-6">
          <a href="#" class="text-white/40 text-sm hover:text-white/70 transition-colors font-medium">Privacy Policy</a>
          <a href="#" class="text-white/40 text-sm hover:text-white/70 transition-colors font-medium">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
