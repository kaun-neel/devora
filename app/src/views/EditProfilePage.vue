<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const profileForm = ref({
  name: 'Alex Chen',
  title: 'Full-stack Developer',
  bio: 'Passionate about clean architecture and performant web applications. Building things that scale.',
  email: 'alex.chen@example.com',
  github: 'github.com/alexchen',
  website: 'alexchen.dev'
})

const goBack = () => {
  router.push('/profile')
}

const saveProfile = () => {
  // In a real app, send to API. For now, just navigate back
  router.push('/profile')
}
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display pb-20 pt-32">
    <main class="max-w-3xl mx-auto px-4">
      
      <!-- Header -->
      <div class="flex items-center gap-4 mb-10">
        <button @click="goBack" class="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 border-4 border-black dark:border-white shadow-brutal-sm hover:-translate-y-1 hover:-translate-x-1 transition-transform">
          <span class="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h1 class="text-4xl font-black uppercase tracking-tighter">Edit Profile</h1>
      </div>

      <!-- Main Form Container -->
      <div class="bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-brutal-lg p-8 md:p-12 space-y-10">
        
        <!-- Avatar Section -->
        <div class="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b-4 border-black dark:border-white">
          <div class="relative">
            <div class="w-32 h-32 border-4 border-black dark:border-white bg-slate-200 overflow-hidden shadow-brutal">
              <img class="w-full h-full object-cover" data-alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOe3bq5838i68TorHgXwmHO5VREVTe5vcNucilhzkIL2ZfdUhV-U9CqW5j1Q9wTR29ql8xnrwK4QUKC75UHEtqtex_Zymx_5xZRxK3w-LGLav-0ZQz6E5oI38cW02-SH-blMHaUR9fvgMC5vTCvOHZBGkiJl1syd_Z4wTJvX4hE1aZN9PMeyx0X5V5Mz7FWgVpyNlaRBOFtxIAc6P2vPOxwnXcG4e4pb2T-2TRJxlrAviUySG8hRFChycq895lOAgBvIRmlFg8mZ8"/>
            </div>
          </div>
          <div class="flex flex-col gap-3 w-full sm:w-auto text-center sm:text-left">
            <h2 class="text-xl font-black uppercase">Profile Picture</h2>
            <div class="flex gap-4 justify-center sm:justify-start">
              <button class="px-6 py-2 bg-primary text-white border-2 border-black dark:border-white font-black uppercase text-sm shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Upload New</button>
              <button class="px-6 py-2 bg-slate-200 dark:bg-slate-800 text-black dark:text-white border-2 border-black dark:border-white font-black uppercase text-sm shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Remove</button>
            </div>
          </div>
        </div>

        <!-- Form Fields -->
        <form @submit.prevent="saveProfile" class="space-y-8">
          
          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label class="block text-sm font-black uppercase tracking-widest">Display Name</label>
              <input v-model="profileForm.name" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border-4 border-black dark:border-white p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/50 transition-shadow" />
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-black uppercase tracking-widest">Job Title</label>
              <input v-model="profileForm.title" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border-4 border-black dark:border-white p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/50 transition-shadow" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-black uppercase tracking-widest">Bio</label>
            <textarea v-model="profileForm.bio" rows="4" class="w-full bg-slate-50 dark:bg-slate-800 border-4 border-black dark:border-white p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/50 transition-shadow resize-y"></textarea>
          </div>

          <div class="pt-8 border-t-4 border-black dark:border-white space-y-8">
            <h3 class="text-2xl font-black uppercase tracking-tighter">Social Links</h3>
            
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="block text-sm font-black uppercase tracking-widest">GitHub</label>
                <input v-model="profileForm.github" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border-4 border-black dark:border-white p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/50 transition-shadow" />
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-black uppercase tracking-widest">Portfolio Website</label>
                <input v-model="profileForm.website" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border-4 border-black dark:border-white p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/50 transition-shadow" />
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-10 flex flex-col sm:flex-row gap-4 justify-end">
            <button type="button" @click="goBack" class="px-8 py-4 bg-white dark:bg-slate-800 text-black dark:text-white border-4 border-black dark:border-white font-black uppercase text-lg shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all order-2 sm:order-1">
              Cancel
            </button>
            <button type="submit" class="px-8 py-4 bg-primary text-white border-4 border-black dark:border-white font-black uppercase text-lg shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all order-1 sm:order-2">
              Save Changes
            </button>
          </div>
          
        </form>
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
