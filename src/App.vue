<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import ToastContainer from './components/ToastContainer.vue'

const isMobileMenuOpen = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  authStore.init()
})
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-sans overflow-hidden">
    
    <!-- Mobile overlay -->
    <div v-if="isMobileMenuOpen && !['login', 'catalog'].includes(route.name)" class="fixed inset-0 bg-slate-900 bg-opacity-50 z-20 md:hidden" @click="isMobileMenuOpen = false"></div>

    <!-- Sidebar -->
    <aside v-if="!['login', 'catalog'].includes(route.name)" :class="['fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col z-30 transform transition-transform duration-300 shadow-2xl md:shadow-none', isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
      <div class="p-6 border-b border-slate-800/50 flex items-center justify-between">
        <div class="flex items-center space-x-3 group cursor-pointer">
          <div class="p-2 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">YAN<span class="text-emerald-400">COM</span></h1>
            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Yanto Computer</p>
          </div>
        </div>
        <button @click="isMobileMenuOpen = false" class="md:hidden p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav class="flex-1 px-4 py-8 space-y-4 overflow-y-auto custom-scrollbar">
        <div class="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</div>
        <RouterLink @click="isMobileMenuOpen = false" to="/" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group relative" exact-active-class="bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Dashboard Overview</span>
        </RouterLink>

        <RouterLink @click="isMobileMenuOpen = false" to="/inventory" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group" exact-active-class="bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          <span class="font-medium">Inventory Stok</span>
        </RouterLink>

        <RouterLink @click="isMobileMenuOpen = false" to="/transactions" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group" exact-active-class="bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span class="font-medium">Kasir Beli/Jual</span>
        </RouterLink>

        <RouterLink @click="isMobileMenuOpen = false" to="/profile" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 group" exact-active-class="bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="font-medium">Pengaturan Profil</span>
        </RouterLink>
      </nav>
      <div class="px-6 py-6 border-t border-slate-800">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 min-w-0">
            <div class="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-xs text-slate-950 shadow-lg shadow-emerald-500/20 flex-shrink-0">
              {{ authStore.user?.username?.substring(0, 2).toUpperCase() || 'AD' }}
            </div>
            <div class="min-w-0">
              <p class="text-[11px] font-black truncate uppercase tracking-wider text-slate-200">{{ authStore.user?.username || 'Admin User' }}</p>
              <p class="text-[9px] text-slate-500 truncate uppercase font-bold tracking-[0.1em]">{{ authStore.user?.business_name || 'Family Business' }}</p>
            </div>
          </div>
          <button @click="handleLogout" class="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div :class="['flex-1 flex flex-col overflow-hidden', route.name === 'login' || route.name === 'catalog' ? 'bg-white' : 'bg-slate-50 relative']">
      <!-- Navbar (Top) -->
      <header v-if="!['login', 'catalog'].includes(route.name)" class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
        <div class="flex items-center gap-4">
          <button @click="isMobileMenuOpen = true" class="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div class="hidden md:block">
            <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-widest">Main Application</h2>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full">
            <div class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-xs font-bold text-slate-600 tracking-wide">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main :class="['flex-1 overflow-x-hidden overflow-y-auto w-full', ['login', 'catalog'].includes(route.name) ? 'p-0' : 'bg-gray-100 p-4 md:p-6']">
        <RouterView />
      </main>
    </div>
    <ToastContainer />
  </div>
</template>

<style>
/* Remove the scoped styles from before, tailwind will handle it */
</style>
