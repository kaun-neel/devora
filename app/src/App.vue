<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import AuthModal from './components/AuthModal.vue'

const isAuthOpen = ref(false)
const authTab = ref('login')

const openAuthModal = (tab = 'login') => {
  authTab.value = tab
  isAuthOpen.value = true
}

const closeAuthModal = () => {
  isAuthOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-background-light font-display text-slate-900 overflow-x-hidden">
    <!-- Navbar -->
    <NavBar @open-auth="openAuthModal" />

    <!-- Main Content -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Global Modals -->
    <AuthModal :is-open="isAuthOpen" :initial-tab="authTab" @close="closeAuthModal" />
  </div>
</template>

<style scoped>
</style>
