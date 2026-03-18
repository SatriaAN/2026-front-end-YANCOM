import { defineStore } from 'pinia'
import axios from 'axios'
import config from '../config'

const API_BASE_URL = config.API_BASE_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },
  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
          username,
          password
        })
        const { token, user } = response.data
        
        this.token = token
        this.user = user
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        // Update axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return true
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed. Please check your credentials.'
        return false
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
    },
    init() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    }
  }
})
