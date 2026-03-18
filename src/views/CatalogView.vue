<template>
  <div class="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
    <!-- Glassmorphism Header -->
    <header class="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)]">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight leading-none">YAN<span class="text-emerald-500">COM</span></h1>
            <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">Digital Catalog v1</p>
          </div>
        </div>
        <RouterLink to="/login" class="px-6 py-3 bg-slate-900 text-white text-sm font-black rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95">
          Portal Admin
        </RouterLink>
      </div>
    </header>

    <!-- Enhanced Hero Section -->
    <section class="pt-24 pb-32 px-6 bg-slate-950 relative overflow-hidden">
       <!-- Decorative Elements -->
       <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full animate-pulse"></div>
       <div class="absolute top-1/2 -left-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
       
       <div class="max-w-7xl mx-auto relative z-10">
          <div class="max-w-3xl">
             <div class="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span class="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Update Menit Lalu</span>
             </div>
             <h2 class="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                Katalog Stok <br>
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-400">Siap Angkut.</span>
             </h2>
             <p class="text-slate-400 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-2xl">
                Daftar ketersediaan barang digital, komponen komputer, dan material logam mulia di gudang YANCOM. Data sinkron langsung dengan tim operasional kami.
             </p>
             <div class="flex flex-wrap gap-8 items-center pt-4 border-t border-white/5">
                <div>
                   <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Lokasi Kami</p>
                   <p class="text-white font-bold">Kota Depok, Jawa Barat</p>
                </div>
                <div class="w-px h-8 bg-white/10 hidden sm:block"></div>
                <div>
                   <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Kontak Bisnis</p>
                   <p class="text-white font-bold">@yanto_computer</p>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Catalog Main -->
    <main class="max-w-7xl mx-auto px-6 -mt-16 pb-32 relative z-20">
       <div v-if="loading" class="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
          <div class="relative w-20 h-20 mb-6">
             <div class="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
             <div class="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
          <p class="text-slate-400 font-bold uppercase tracking-widest text-sm italic">Menghubungkan ke Gudang...</p>
       </div>

       <div v-else-if="error" class="bg-red-50 text-red-600 p-10 rounded-[3rem] border border-red-100 text-center shadow-xl">
          <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p class="text-lg font-black tracking-tight mb-2">{{ error }}</p>
          <button @click="fetchPublicItems" class="text-sm font-bold underline hover:text-red-800 transition-colors">Coba Segarkan Halaman</button>
       </div>

       <div v-else>
          <div v-if="items.length === 0" class="bg-white rounded-[3.5rem] p-20 text-center border border-slate-200 shadow-2xl">
             <div class="bg-slate-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-300 transform rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
             </div>
             <h3 class="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Stok Baru Belum Tiba</h3>
             <p class="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">Saat ini semua item telah terjual. Silakan hubungi admin kami untuk informasi restock Aset IT.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div v-for="item in items" :key="item.id" class="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-indigo-200 transition-all duration-500 flex flex-col group relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-100 transition-colors"></div>
                
                <div class="mb-10 flex justify-between items-start relative z-10">
                   <div class="px-5 py-2 bg-slate-950 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-slate-950/20">
                      {{ item.category }}
                   </div>
                   <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all duration-300">
                      <svg v-if="item.category === 'Mentahan'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                   </div>
                </div>

                <div class="relative z-10">
                   <h3 class="text-3xl font-black text-slate-900 mb-2 tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{{ item.name }}</h3>
                   <div class="w-12 h-1 bg-slate-100 group-hover:w-20 group-hover:bg-indigo-400 transition-all duration-300 mb-8 rounded-full"></div>
                </div>

                <div class="mt-auto relative z-10">
                   <div class="flex items-end justify-between">
                      <div>
                         <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Tersedia Saat Ini</p>
                         <div class="text-5xl font-black text-slate-950 tracking-tighter">
                            {{ item.current_quantity }}<span class="text-sm font-bold text-slate-400 uppercase ml-2">{{ item.unit }}</span>
                         </div>
                      </div>
                      <div class="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                         </svg>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-24 px-6">
       <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div class="text-center md:text-left">
             <div class="flex items-center space-x-3 mb-4 justify-center md:justify-start">
               <div class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
               </div>
               <span class="text-xl font-black text-slate-900 tracking-tight">YANCOM</span>
             </div>
             <p class="text-slate-400 text-sm font-medium max-w-sm mb-6">Partner terpercaya manajemen Aset IT dan ekstraksi logam berkualitas sejak 2026.</p>
             <p class="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">Integrated Logistics Systems</p>
          </div>
          <div class="flex flex-wrap justify-center gap-12">
             <div class="text-center md:text-left">
                <p class="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Navigasi</p>
                <ul class="space-y-2 text-slate-500 text-sm font-medium">
                   <li><a href="#" class="hover:text-indigo-600">Beranda</a></li>
                   <li><a href="#" class="hover:text-indigo-600">Tentang Kami</a></li>
                   <li><a href="#" class="hover:text-indigo-600">Kontak Person</a></li>
                </ul>
             </div>
             <div class="text-center md:text-left">
                <p class="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Sosial Media</p>
                <ul class="space-y-2 text-slate-500 text-sm font-medium">
                   <li><a href="#" class="hover:text-indigo-600">Instagram</a></li>
                   <li><a href="#" class="hover:text-indigo-600">WhatsApp</a></li>
                   <li><a href="#" class="hover:text-indigo-600">Tokopedia</a></li>
                </ul>
             </div>
          </div>
       </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import config from '../config'

const items = ref([])
const loading = ref(true)
const error = ref(null)

const API_BASE_URL = config.API_BASE_URL

const fetchPublicItems = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE_URL}/public/items`)
    items.value = response.data || []
  } catch (err) {
    console.error('Error fetching public items:', err)
    error.value = 'Gagal memuat katalog barang dari server.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPublicItems()
})
</script>

<style scoped>
/* Custom animations or scrollbars can go here if needed */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
