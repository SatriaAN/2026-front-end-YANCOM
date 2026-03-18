<template>
  <div class="px-2 md:px-8 py-6 md:py-10 font-sans w-full max-w-[1600px] mx-auto">
    <div class="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <div>
        <h1 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">YAN<span class="text-emerald-500">COM</span> Ledger</h1>
        <p class="text-slate-500 mt-2 font-medium">Rekaman arus kas & stok digital Yanto Computer.</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
         <button @click="openModal('BUY')" class="group w-full sm:w-auto bg-white hover:bg-orange-50 text-orange-600 px-6 py-4 rounded-2xl font-black shadow-sm border-2 border-orange-100 flex justify-center items-center gap-3 transition-all active:scale-95">
          <div class="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          Beli Aset IT (IN)
        </button>
        <button @click="openModal('SELL')" class="group w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-slate-200 flex justify-center items-center gap-3 transition-all active:scale-95">
          <div class="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          Jual Ekstrak (OUT)
        </button>
      </div>
    </div>

    <!-- Error/Loading -->
    <div v-if="loading" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
    </div>
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <!-- Histori Transaksi Table -->
    <div v-else class="bg-white rounded-[2rem] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-100">
        <thead class="bg-slate-50/50">
          <tr>
            <th scope="col" class="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tipe</th>
            <th scope="col" class="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mitra / Tanggal</th>
            <th scope="col" class="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Barang & Stok</th>
            <th scope="col" class="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Transaksi</th>
            <th scope="col" class="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Memo</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
          <tr v-if="transactions.length === 0">
             <td colspan="5" class="px-6 py-10 text-center text-slate-500">Belum ada histori transaksi.</td>
          </tr>
          <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-slate-50/50 transition-colors group">
             <td class="px-8 py-6 whitespace-nowrap">
              <span v-if="tx.type === 'BUY'" class="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black rounded-lg border border-orange-100 uppercase tracking-wider">
                BUY
              </span>
              <span v-else class="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100 uppercase tracking-wider">
                SELL
              </span>
            </td>
            <td class="px-8 py-6 whitespace-nowrap">
               <div class="font-bold text-slate-800">{{ tx.counterparty_name || 'Anonim' }}</div>
               <div class="text-[11px] font-bold text-slate-400 uppercase mt-0.5">
                  {{ new Date(tx.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) }} • 
                  {{ new Date(tx.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }}
               </div>
            </td>
            <td class="px-8 py-6 whitespace-nowrap">
              <div class="font-black text-slate-800">{{ tx.item?.name || 'Item Terhapus' }}</div>
              <div class="text-xs font-bold text-slate-400 mt-0.5">{{ tx.quantity }} {{ tx.item?.unit }} × {{ formatRupiah(tx.price_per_unit) }}</div>
            </td>
            <td class="px-8 py-6 whitespace-nowrap text-right">
              <div :class="tx.type === 'BUY' ? 'text-slate-900' : 'text-emerald-600'" class="text-lg font-black tracking-tight">
                {{ tx.type === 'BUY' ? '-' : '+' }} {{ formatRupiah(tx.total_price) }}
              </div>
            </td>
            <td class="px-8 py-6 text-sm font-medium text-slate-400 italic">
              {{ tx.notes || '—' }}
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form Transaksi (Refined) -->
    <div v-if="showModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full flex flex-col overflow-hidden border border-white/20">
        <div :class="txForm.type === 'BUY' ? 'bg-orange-500' : 'bg-slate-900'" class="p-8 text-white relative">
           <div class="absolute right-0 top-0 opacity-10 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
           </div>
           <h2 class="text-3xl font-black tracking-tight mb-2">
              {{ txForm.type === 'BUY' ? 'Pencatatan Beli' : 'Pencatatan Jual' }}
           </h2>
           <p class="text-white/70 font-bold uppercase text-[10px] tracking-[0.3em]">Ledger Entry v1.0</p>
        </div>

        <form @submit.prevent="submitTransaction" class="p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Pilih Barang Master</label>
              <select v-model="txForm.item_id" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-4 border transition-all outline-none font-bold text-slate-700">
                <option value="" disabled>-- Pilih dari stok gudang --</option>
                <option v-for="item in items" :key="item.id" :value="item.id">
                  {{ item.name }} (Stok: {{ item.current_quantity }} {{ item.unit }})
                </option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                {{ txForm.type === 'BUY' ? 'Mitra / Pemulung' : 'Mitra / Pengepul' }}
              </label>
              <input v-model="txForm.counterparty_name" type="text" class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-4 border transition-all outline-none font-bold" placeholder="Nama mitra bisnis...">
            </div>

            <div>
              <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Qty ({{ getSelectedItemUnit() }})</label>
              <input v-model.number="txForm.quantity" type="number" step="0.01" min="0.01" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-4 border transition-all outline-none font-black text-lg" placeholder="0.00">
            </div>
             <div>
              <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Harga Satuan</label>
              <input v-model.number="txForm.price_per_unit" type="number" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-4 border transition-all outline-none font-black text-lg" placeholder="Rp">
            </div>
          </div>
          
          <div class="p-6 bg-emerald-50 rounded-3xl border-2 border-emerald-100 flex items-center justify-between">
             <div>
                <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1">Ringkasan Nilai</div>
                <div class="text-3xl font-black text-emerald-900 tracking-tighter">{{ formatRupiah(calculatedTotal) }}</div>
             </div>
             <div class="bg-emerald-500 text-white p-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
          </div>

          <div class="pt-4 flex flex-col sm:flex-row gap-4">
            <button type="button" @click="showModal = false" class="flex-1 px-6 py-4 text-slate-400 hover:text-slate-800 font-black transition-all">BATALKAN</button>
            <button type="submit" :disabled="submitting || !txForm.item_id" :class="txForm.type === 'BUY' ? 'bg-orange-500 shadow-orange-500/20' : 'bg-slate-900 shadow-slate-900/20'" class="flex-[2] px-8 py-5 text-white rounded-3xl font-black shadow-2xl transition-all disabled:opacity-50 active:scale-95 uppercase tracking-widest">
              {{ submitting ? 'PROSES...' : 'Kirim Transaksi' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToastStore } from '../stores/toast'
import config from '../config'

const toastStore = useToastStore()

const items = ref([])
const transactions = ref([])
const loading = ref(true)
const error = ref(null)

const showModal = ref(false)
const submitting = ref(false)

const txForm = ref({
  type: 'BUY',
  item_id: '',
  quantity: null,
  price_per_unit: null,
  counterparty_name: '',
  notes: ''
})

const API_BASE_URL = config.API_BASE_URL

// Computes standard Total Price on the frontend for preview
const calculatedTotal = computed(() => {
  return (txForm.value.quantity || 0) * (txForm.value.price_per_unit || 0)
})

const getSelectedItemUnit = () => {
  if (!txForm.value.item_id) return 'Satuan'
  const item = items.value.find(i => i.id === txForm.value.item_id)
  return item ? item.unit : 'Satuan'
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const [itemsRes, txRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/items`),
      axios.get(`${API_BASE_URL}/transactions`)
    ])
    items.value = itemsRes.data || []
    
    // Reverse to show newest first for primitive sorting
    transactions.value = Array.isArray(txRes.data) ? txRes.data.reverse() : []
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = 'Gagal memuat data dari server.'
  } finally {
    loading.value = false
  }
}

const openModal = (type) => {
  txForm.value = {
    type: type,
    item_id: '',
    quantity: null,
    price_per_unit: null,
    counterparty_name: '',
    notes: ''
  }
  showModal.value = true
}

const submitTransaction = async () => {
  submitting.value = true
  try {
    await axios.post(`${API_BASE_URL}/transactions`, txForm.value)
    showModal.value = false
    fetchData() // Refresh items & txs
    toastStore.show('Transaksi Berhasil Disimpan!')
  } catch (err) {
    console.error('Error saving transaction:', err)
    const errorMsg = err.response?.data?.error || err.message
    toastStore.show(`Transaksi Gagal: ${errorMsg}`, 'error', 5000)
  } finally {
    submitting.value = false
  }
}

const formatRupiah = (number) => {
  if (number == null) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

onMounted(() => {
  fetchData()
})
</script>
