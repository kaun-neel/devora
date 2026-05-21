<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'success' },
  show: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const visible = ref(false)

watch(() => props.show, (val) => {
  if (val) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
      emit('close')
    }, 3000)
  } else {
    visible.value = false
  }
})
</script>

<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="fixed top-24 right-6 z-[100] max-w-sm"
    >
      <div
        class="border-4 border-black shadow-brutal px-6 py-4 font-black uppercase tracking-tight text-sm flex items-center gap-3"
        :class="{
          'bg-green-400 text-black': type === 'success',
          'bg-red-400 text-black': type === 'error',
          'bg-yellow-400 text-black': type === 'warning',
          'bg-blue-400 text-black': type === 'info',
        }"
      >
        <span class="material-symbols-outlined font-black text-xl">
          {{ type === 'success' ? 'check_circle' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info' }}
        </span>
        <span>{{ message }}</span>
        <button @click="visible = false; emit('close')" class="ml-auto material-symbols-outlined text-lg hover:scale-110 transition-transform">close</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.shadow-brutal { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }

.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-leave-active {
  transition: all 0.2s ease-in;
}
.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
