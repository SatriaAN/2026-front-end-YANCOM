import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  const show = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    toasts.value.push({
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
    })

    setTimeout(() => {
      remove(id)
    }, duration)
  }

  const remove = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    show,
    remove
  }
})
