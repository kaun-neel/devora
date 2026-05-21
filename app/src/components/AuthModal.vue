<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/composables/useUserStore.js'

const props = defineProps({
  isOpen: Boolean,
  initialTab: {
    type: String,
    default: 'login'
  }
})

const emit = defineEmits(['close', 'auth-success'])

const { login, signup } = useUserStore()

const activeTab = ref(props.initialTab)
const loginEmail = ref('')
const loginPassword = ref('')
const signupName = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const showLoginPass = ref(false)
const showSignupPass = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const isSubmitting = ref(false)

watch(() => props.initialTab, (val) => {
  activeTab.value = val
})

watch(() => props.isOpen, (val) => {
  if (val) {
    errorMsg.value = ''
    successMsg.value = ''
  }
})

const setTab = (tab) => {
  activeTab.value = tab
  errorMsg.value = ''
  successMsg.value = ''
}

const closeModal = () => {
  emit('close')
}

const handleLogin = () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (!loginEmail.value.trim() || !loginPassword.value.trim()) {
    errorMsg.value = 'Please fill in all fields.'
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    const result = login(loginEmail.value, loginPassword.value)
    isSubmitting.value = false

    if (result.success) {
      successMsg.value = result.message
      emit('auth-success', 'login')
      setTimeout(() => closeModal(), 800)
    } else {
      errorMsg.value = result.message
    }
  }, 500)
}

const handleSignup = () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (!signupEmail.value.trim() || !signupPassword.value.trim()) {
    errorMsg.value = 'Please fill in all fields.'
    return
  }
  if (signupPassword.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters.'
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    const result = signup(signupEmail.value, signupPassword.value, signupName.value)
    isSubmitting.value = false

    if (result.success) {
      successMsg.value = result.message
      emit('auth-success', 'signup')
      setTimeout(() => closeModal(), 800)
    } else {
      errorMsg.value = result.message
    }
  }, 500)
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="absolute inset-0" @click="closeModal"></div>

      <Transition name="modal-scale">
        <div class="relative w-full max-w-[480px] bg-white dark:bg-slate-900 border-4 border-black shadow-brutal-lg overflow-hidden z-10 font-display">

          <button @click="closeModal" class="absolute top-4 right-4 text-black dark:text-white hover:text-primary transition-colors z-20">
            <span class="material-symbols-outlined font-black">close</span>
          </button>

          <div class="pt-10 pb-6 flex flex-col items-center">
            <div class="flex items-center gap-1 mb-4">
              <span class="w-6 h-6 rounded-full bg-primary inline-block"></span>
              <span class="w-6 h-6 rounded-full bg-primary-dark inline-block -ml-2 opacity-80"></span>
              <span class="w-6 h-6 rounded-full bg-devora-tan inline-block -ml-2 opacity-70"></span>
            </div>
            <h2 class="text-2xl font-black uppercase tracking-tight text-black dark:text-white">DEVORA</h2>
            <p class="text-black dark:text-slate-400 text-sm font-bold uppercase tracking-tight mt-1">Build the future of development</p>
          </div>

          <div class="px-8">
            <div class="flex border-4 border-black bg-black">
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

          <!-- Feedback Messages -->
          <div v-if="errorMsg" class="mx-8 mt-6 p-3 border-2 border-red-500 bg-red-100 text-red-700 text-sm font-black uppercase tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">error</span>
            {{ errorMsg }}
          </div>
          <div v-if="successMsg" class="mx-8 mt-6 p-3 border-2 border-green-600 bg-green-100 text-green-700 text-sm font-black uppercase tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">check_circle</span>
            {{ successMsg }}
          </div>

          <!-- Login Form -->
          <div v-if="activeTab === 'login'" class="p-8 space-y-6">
            <form @submit.prevent="handleLogin" class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">mail</span>
                  <input v-model="loginEmail" class="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-4 border-black focus:ring-2 focus:ring-primary focus:outline-none transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="name@company.com" type="email"/>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Password</label>
                </div>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">lock</span>
                  <input v-model="loginPassword" class="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 border-4 border-black focus:ring-2 focus:ring-primary focus:outline-none transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="Enter your password" :type="showLoginPass ? 'text' : 'password'"/>
                  <button type="button" @click="showLoginPass = !showLoginPass" class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-black text-xl hover:text-primary transition-colors">
                    {{ showLoginPass ? 'visibility_off' : 'visibility' }}
                  </button>
                </div>
              </div>

              <button type="submit" :disabled="isSubmitting" class="w-full py-5 bg-primary text-white font-black uppercase tracking-widest border-4 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
                <span v-if="isSubmitting" class="material-symbols-outlined animate-spin text-lg">refresh</span>
                {{ isSubmitting ? 'Logging in...' : 'Log In to Account' }}
              </button>
            </form>

            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t-2 border-black dark:border-slate-800"></div>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-white dark:bg-slate-900 px-4 text-black font-black">Or continue with</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button class="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 border-4 border-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                <span class="text-xs font-black text-black dark:text-slate-200 uppercase">Google</span>
              </button>
              <button class="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 border-4 border-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                <span class="text-xs font-black text-black dark:text-slate-200 uppercase">GitHub</span>
              </button>
            </div>
          </div>

          <!-- Signup Form -->
          <div v-if="activeTab === 'signup'" class="p-8 space-y-6">
            <form @submit.prevent="handleSignup" class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Full Name</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">person</span>
                  <input v-model="signupName" class="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-4 border-black focus:ring-2 focus:ring-primary focus:outline-none transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="Your full name" type="text"/>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">mail</span>
                  <input v-model="signupEmail" class="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-4 border-black focus:ring-2 focus:ring-primary focus:outline-none transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="new.user@company.com" type="email"/>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-black text-black dark:text-slate-300 uppercase tracking-wider">Choose a Password</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl font-bold">lock</span>
                  <input v-model="signupPassword" class="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 border-4 border-black focus:ring-2 focus:ring-primary focus:outline-none transition-all text-black dark:text-slate-100 placeholder:text-slate-400 font-bold" placeholder="Min. 6 characters" :type="showSignupPass ? 'text' : 'password'"/>
                  <button type="button" @click="showSignupPass = !showSignupPass" class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-black text-xl hover:text-primary transition-colors">
                    {{ showSignupPass ? 'visibility_off' : 'visibility' }}
                  </button>
                </div>
              </div>

              <button type="submit" :disabled="isSubmitting" class="w-full py-5 bg-primary text-white font-black uppercase tracking-widest border-4 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
                <span v-if="isSubmitting" class="material-symbols-outlined animate-spin text-lg">refresh</span>
                {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
              </button>
            </form>
          </div>

          <div class="bg-black/5 dark:bg-slate-800/50 p-6 text-center border-t-2 border-black">
            <p class="text-[10px] text-black dark:text-slate-400 leading-relaxed font-bold uppercase tracking-tight">
              By continuing, you agree to Devora's
              <a class="underline decoration-2 hover:text-primary transition-colors" href="#">Terms of Service</a> and
              <a class="underline decoration-2 hover:text-primary transition-colors" href="#">Privacy Policy</a>.
            </p>
          </div>

        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.shadow-brutal { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
.shadow-brutal-lg { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
.shadow-brutal-sm { box-shadow: 2px 2px 0px 0px rgba(0,0,0,1); }

.modal-fade-enter-active { transition: opacity 0.25s ease; }
.modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

.modal-scale-enter-active { transition: all 0.25s ease-out; }
.modal-scale-leave-active { transition: all 0.15s ease-in; }
.modal-scale-enter-from { transform: scale(0.95); opacity: 0; }
.modal-scale-leave-to { transform: scale(0.95); opacity: 0; }
</style>
