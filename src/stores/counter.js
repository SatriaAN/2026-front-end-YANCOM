import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const backendMessage = ref('')
  const loading = ref(false)
  const error = ref(null)

  async function fetchHello() {
    loading.value = true
    error.value = null
    try {
      // Use the environment variable if available, fallback to localhost
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
      
      const response = await fetch(`${baseUrl}/hello`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      const data = await response.json()
      backendMessage.value = data.message
    } catch (err) {
      console.error('Error fetching from backend:', err)
      error.value = 'Failed to connect to backend. Is the Go server running?'
    } finally {
      loading.value = false
    }
  }

  return { backendMessage, loading, error, fetchHello }
})
