<template>
  <div class="px-2 md:px-6 py-4 md:py-6 w-full">
    <div class="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
        <p class="text-sm md:text-base text-slate-500 mt-1">Ringkasan operasional Aset IT Anda hari ini.</p>
      </div>
      <div class="w-full sm:w-auto">
        <button @click="fetchStats" class="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 px-5 py-2.5 rounded-xl font-bold shadow-sm border border-slate-200 flex items-center justify-center gap-2 transition-all active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg flex items-center mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {{ error }}
    </div>

    <div v-else class="space-y-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Total Profit -->
        <div class="bg-white rounded-3xl border border-emerald-100 shadow-[0_10px_40px_-15px_rgba(16,185,129,0.15)] p-8 overflow-hidden relative group hover:translate-y-[-4px] transition-all duration-300">
          <div class="absolute -right-6 -top-6 h-32 w-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
          <div class="flex items-center gap-6 mb-6 relative z-10">
            <div class="p-4 bg-emerald-500 text-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Estimasi Untung</p>
              <h3 class="text-3xl font-black text-slate-900 tracking-tight">{{ formatRupiah(stats.profit) }}</h3>
            </div>
          </div>
          <div class="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Live from cloud</span>
          </div>
        </div>

        <!-- Total Pendapatan -->
        <div class="bg-white rounded-3xl border border-blue-100 shadow-[0_10px_40px_-15px_rgba(59,130,246,0.1)] p-8 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
           <div class="absolute -right-6 -top-6 h-32 w-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
          <div class="flex items-center gap-6 mb-6 relative z-10">
            <div class="p-4 bg-blue-600 text-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Jual</p>
              <h3 class="text-3xl font-black text-slate-900 tracking-tight">{{ formatRupiah(stats.total_earned_revenue) }}</h3>
            </div>
          </div>
        </div>

        <!-- Total Modal -->
        <div class="bg-white rounded-3xl border border-orange-100 shadow-[0_10px_40px_-15px_rgba(249,115,22,0.1)] p-8 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
           <div class="absolute -right-6 -top-6 h-32 w-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>
          <div class="flex items-center gap-6 mb-6 relative z-10">
            <div class="p-4 bg-orange-500 text-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(249,115,22,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Beli</p>
              <h3 class="text-3xl font-black text-slate-900 tracking-tight">{{ formatRupiah(stats.total_spent_capital) }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity & Secondary Stats row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Side Column: Category Stats -->
        <div class="lg:col-span-1 space-y-6">
           <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors">
            <div>
              <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Master Data</p>
              <div class="text-3xl font-black text-slate-800">{{ stats.total_inventory_items }} <span class="text-sm font-bold text-slate-400">Items</span></div>
            </div>
            <div class="bg-slate-50 p-4 rounded-2xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          
           <div class="bg-white p-8 rounded-3xl border border-orange-200 shadow-sm flex items-center justify-between group hover:border-orange-300 transition-colors">
            <div>
              <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Volume Beli</p>
              <div class="text-3xl font-black text-slate-800">{{ stats.total_buy_transactions }} <span class="text-sm font-bold text-slate-400">TX</span></div>
            </div>
            <div class="bg-orange-50 p-4 rounded-2xl text-orange-500 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

          <!-- New Ready Stock Widget -->
          <div class="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm overflow-hidden relative group hover:border-emerald-200 transition-colors">
            <div class="flex items-center justify-between mb-6">
               <h4 class="text-lg font-black text-slate-800 tracking-tight">Stok Ready</h4>
               <span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-wider">Gudang</span>
            </div>
            <div class="space-y-4 max-h-[224px] overflow-y-auto custom-scrollbar pr-2">
               <div v-if="!readyStockItems.length" class="text-center py-6 text-slate-400 text-sm font-medium">Semua stok kosong.</div>
               <div v-for="item in readyStockItems" :key="item.id" class="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                  <div class="min-w-0">
                     <p class="font-bold text-slate-800 text-sm truncate">{{ item.name }}</p>
                     <p class="text-[10px] text-slate-400 font-bold uppercase">{{ item.category }}</p>
                  </div>
                  <div class="text-right shrink-0 ml-4">
                     <div class="text-base font-black text-slate-900">{{ item.current_quantity }}</div>
                     <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ item.unit }}</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Activity Feed (Placeholder for UI Polish) -->
        <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
           <div class="flex items-center justify-between mb-8">
              <h4 class="text-xl font-black text-slate-800 tracking-tight">Aktivitas Terkini</h4>
              <RouterLink to="/transactions" class="text-sm font-bold text-emerald-600 hover:underline">Lihat Semua Ledger</RouterLink>
           </div>
           <div class="space-y-6">
              <div v-if="!recentTransactions.length" class="text-center py-12">
                 <div class="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 </div>
                 <p class="text-slate-400 font-medium">Belum ada aktivitas transaksi...</p>
              </div>
              <div v-for="tx in recentTransactions" :key="tx.id" class="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                 <div :class="tx.type === 'BUY' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'" class="p-3 rounded-xl shrink-0">
                    <svg v-if="tx.type === 'BUY'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                 </div>
                 <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-4">
                       <p class="font-bold text-slate-800 truncate">{{ tx.item?.name }}</p>
                       <p class="font-black text-slate-900 shrink-0">{{ tx.type === 'BUY' ? '-' : '+' }} {{ formatRupiah(tx.total_price) }}</p>
                    </div>
                    <div class="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                       <p>{{ tx.counterparty_name || 'Tanpa Nama' }} • {{ tx.quantity }} {{ tx.item?.unit }}</p>
                       <p>{{ new Date(tx.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stats = ref({})
const recentTransactions = ref([])
const readyStockItems = ref([])
const loading = ref(true)
const error = ref(null)

const API_BASE_URL = 'http://localhost:8080/api'

const fetchStats = async () => {
  loading.value = true
  error.value = null
  try {
    const [statsRes, txRes, itemsRes] = await Promise.all([
       axios.get(`${API_BASE_URL}/dashboard/stats`),
       axios.get(`${API_BASE_URL}/transactions`),
       axios.get(`${API_BASE_URL}/items`)
    ])
    stats.value = statsRes.data
    // Take newest 5
    recentTransactions.value = Array.isArray(txRes.data) ? txRes.data.reverse().slice(0, 5) : []
    // Filter items with quantity > 0
    readyStockItems.value = Array.isArray(itemsRes.data) ? itemsRes.data.filter(i => i.current_quantity > 0) : []
  } catch (err) {
    console.error('Error fetching dashboard stats:', err)
    error.value = 'Gagal memuat data dari server. Pastikan server backend sedang berjalan.'
  } finally {
    loading.value = false
  }
}

const formatRupiah = (number) => {
  if (!number) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

onMounted(() => {
  fetchStats()
})
</script>
