<template>
  <div class="px-2 md:px-6 py-4 md:py-6 w-full max-w-4xl">
    <div class="mb-10">
      <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-2">Profil & Keamanan</h1>
      <p class="text-slate-500 font-medium">Atur identitas bisnis dan keamanan akun admin Anda.</p>
    </div>

    <div class="grid grid-cols-1 gap-8">
      <!-- Change Password Card -->
      <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-8 border-b border-slate-100 flex items-center gap-4">
           <div class="p-3 bg-red-100 text-red-600 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
           </div>
           <div>
              <h3 class="text-xl font-black text-slate-800 tracking-tight">Ganti Password</h3>
              <p class="text-slate-400 text-sm font-medium">Ganti password secara berkala untuk menjaga keamanan data.</p>
           </div>
        </div>
        <form @submit.prevent="handleChangePassword" class="p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Password Saat Ini</label>
              <input v-model="passForm.old_password" type="password" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-4 border transition-all outline-none font-bold" placeholder="••••••••">
            </div>
            <div>
              <label class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Password Baru</label>
              <input v-model="passForm.new_password" type="password" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-4 border transition-all outline-none font-bold" placeholder="••••••••">
            </div>
          </div>
          
          <div class="flex">
            <button type="submit" :disabled="loading" class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest">
              {{ loading ? 'Memproses...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Business Info Info -->
      <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-8 opacity-60">
        <div class="flex items-center gap-4 mb-6">
           <div class="p-3 bg-blue-100 text-blue-600 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
           </div>
           <div>
              <h3 class="text-xl font-black text-slate-800 tracking-tight">Identitas Bisnis (v2)</h3>
              <p class="text-slate-400 text-sm font-bold uppercase tracking-widest">Upcoming Feature</p>
           </div>
        </div>
        <p class="text-slate-500 font-medium">Fitur untuk mengubah Nama Gudang, Alamat, dan Nomor Telepon yang muncul di laporan akan tersedia pada update Versi 2.0.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '../stores/toast'
import config from '../config'

const toastStore = useToastStore()

const passForm = ref({
  old_password: '',
  new_password: ''
})

const loading = ref(false)

const API_BASE_URL = config.API_BASE_URL

const handleChangePassword = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/change-password`, passForm.value)
    toastStore.show(response.data.message || 'Password berhasil diperbarui!')
    passForm.value = { old_password: '', new_password: '' }
  } catch (err) {
    console.error('Change password failed:', err)
    const errorMsg = err.response?.data?.error || 'Gagal mengganti password.'
    toastStore.show(errorMsg, 'error')
  } finally {
    loading.value = false
  }
}
</script>
