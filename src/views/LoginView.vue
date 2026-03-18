<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 font-sans p-4 relative overflow-hidden">
    <!-- Animated backgrounds -->
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="w-full max-w-md z-10">
      <!-- Logo Area -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center p-4 bg-slate-900/50 rounded-3xl border border-white/5 mb-6 backdrop-blur-xl shadow-2xl">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2">YAN<span class="text-emerald-400">COM</span></h1>
        <p class="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Yanto Computer Management</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-3xl">
        <div class="mb-8">
          <h2 class="text-2xl font-black text-white tracking-tight">Selamat Datang</h2>
          <p class="text-slate-400 text-sm mt-1">Silakan masuk untuk mengelola gudang Anda.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Username</label>
            <div class="relative group">
               <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
               </div>
               <input v-model="username" type="text" required class="w-full bg-white/5 border-white/10 rounded-2xl focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 pl-12 pr-5 py-4 border transition-all outline-none font-bold text-white placeholder-slate-600" placeholder="admin_kencana">
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Password</label>
            <div class="relative group">
               <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
               </div>
               <input v-model="password" type="password" required class="w-full bg-white/5 border-white/10 rounded-2xl focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 pl-12 pr-5 py-4 border transition-all outline-none font-bold text-white placeholder-slate-600" placeholder="••••••••">
            </div>
          </div>

          <div v-if="authStore.error" class="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center animate-shake">
            {{ authStore.error }}
          </div>

          <button type="submit" :disabled="authStore.loading" class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest">
            <span v-if="authStore.loading" class="animate-spin h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full"></span>
            <span v-else>Masuk ke Dashboard</span>
          </button>
        </form>

        <div class="mt-8 text-center">
           <p class="text-slate-500 text-xs font-medium">Bermasalah dengan akun? Hubungi Admin.</p>
        </div>
      </div>

      <div class="mt-10 text-center">
         <p class="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">&copy; 2026 ScrapManager Pro Enterprise</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/')
  }
}
</script>

<style scoped>
.shadow-3xl {
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
}
</style>
