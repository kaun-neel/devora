<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/composables/useUserStore.js'

const router = useRouter()
const { currentUser, isLoggedIn, updateProfile } = useUserStore()

const profileForm = ref({
  name: '',
  title: '',
  bio: '',
  email: '',
  github: '',
  website: ''
})

const saveSuccess = ref(false)

onMounted(() => {
  if (!isLoggedIn.value) {
    router.replace('/')
    return
  }
  profileForm.value = {
    name: currentUser.value.name || '',
    title: currentUser.value.title || '',
    bio: currentUser.value.bio || '',
    email: currentUser.value.email || '',
    github: currentUser.value.github || '',
    website: currentUser.value.website || '',
  }
})

const goBack = () => {
  router.push('/profile')
}

const saveProfile = () => {
  updateProfile({
    name: profileForm.value.name,
    title: profileForm.value.title,
    bio: profileForm.value.bio,
    github: profileForm.value.github,
    website: profileForm.value.website,
  })
  saveSuccess.value = true
  setTimeout(() => {
    saveSuccess.value = false
    router.push('/profile')
  }, 1200)
}

const userInitials = () => {
  const name = profileForm.value.name || currentUser.value?.email || ''
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
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

      <!-- Success Banner -->
      <Transition name="slide">
        <div v-if="saveSuccess" class="mb-6 p-4 border-4 border-black bg-green-400 shadow-brutal flex items-center gap-3">
          <span class="material-symbols-outlined font-black text-xl">check_circle</span>
          <span class="font-black uppercase tracking-tight">Profile saved successfully!</span>
        </div>
      </Transition>

      <!-- Main Form Container -->
      <div class="bg-white dark:bg-slate-900 border-4 border-black dark:border-white shadow-brutal-lg p-8 md:p-12 space-y-10">

        <!-- Avatar Section -->
        <div class="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b-4 border-black dark:border-white">
          <div class="relative">
            <div class="w-32 h-32 border-4 border-black dark:border-white bg-primary/20 overflow-hidden shadow-brutal flex items-center justify-center">
              <span class="text-4xl font-black text-primary">{{ userInitials() }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-3 w-full sm:w-auto text-center sm:text-left">
            <h2 class="text-xl font-black uppercase">Profile Picture</h2>
            <p class="text-xs text-slate-500 font-bold">Avatar is generated from your initials</p>
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

          <div class="space-y-2">
            <label class="block text-sm font-black uppercase tracking-widest">Email</label>
            <input :value="profileForm.email" type="email" disabled class="w-full bg-slate-200 dark:bg-slate-700 border-4 border-black dark:border-white p-4 font-bold text-lg cursor-not-allowed opacity-60" />
            <p class="text-xs text-slate-400 font-bold">Email cannot be changed</p>
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

.slide-enter-active { transition: all 0.3s ease-out; }
.slide-leave-active { transition: all 0.2s ease-in; }
.slide-enter-from { transform: translateY(-20px); opacity: 0; }
.slide-leave-to { transform: translateY(-20px); opacity: 0; }
</style>
