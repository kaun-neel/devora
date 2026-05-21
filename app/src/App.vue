<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import AuthModal from './components/AuthModal.vue'
import ToastNotification from './components/ToastNotification.vue'

const isAuthOpen = ref(false)
const authTab = ref('login')
const toastMessage = ref('')
const toastType = ref('success')
const showToast = ref(false)

const openAuthModal = (tab = 'login') => {
  authTab.value = tab
  isAuthOpen.value = true
}

const closeAuthModal = () => {
  isAuthOpen.value = false
}

const onAuthSuccess = (type) => {
  toastMessage.value = type === 'signup' ? 'Welcome to Devora!' : 'Welcome back!'
  toastType.value = 'success'
  showToast.value = true
}
</script>

<template>
  <div class="min-h-screen bg-background-light font-display text-slate-900 overflow-x-hidden">
    <NavBar @open-auth="openAuthModal" />

    <main>
      <RouterView />
    </main>

    <Footer />

    <AuthModal
      :is-open="isAuthOpen"
      :initial-tab="authTab"
      @close="closeAuthModal"
      @auth-success="onAuthSuccess"
    />

    <ToastNotification
      :show="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="showToast = false"
    />
  </div>
</template>

<style scoped>
</style>
