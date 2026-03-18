<template>
  <div class="px-2 md:px-6 py-4 md:py-6 font-sans w-full">
    <div class="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-slate-800">YAN<span class="text-emerald-500">COM</span> Inventory</h1>
        <p class="text-sm md:text-base text-slate-500 mt-1">Management stok digital Yanto Computer.</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button @click="showOnlyReady = !showOnlyReady" :class="showOnlyReady ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white text-slate-600 border-slate-200'" class="px-5 py-2.5 rounded-xl font-bold border shadow-sm transition-all flex items-center justify-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
           </svg>
           {{ showOnlyReady ? 'Semua Stok' : 'Hanya Stok Ready' }}
        </button>
        <button @click="showAddModal = true" class="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
           </svg>
           Tambah Barang
        </button>
      </div>
    </div>

    <!-- Error/Loading States -->
    <div v-if="loading" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
    </div>
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <!-- Table Area -->
    <div v-else class="bg-white rounded-3xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-100">
        <thead class="bg-slate-50/50">
          <tr>
            <th scope="col" class="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nama Barang</th>
            <th scope="col" class="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</th>
            <th scope="col" class="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Stok Tersedia</th>
            <th scope="col" class="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
          <tr v-if="filteredItems.length === 0">
             <td colspan="4" class="px-6 py-10 text-center text-slate-500">Tidak ada barang yang memenuhi kriteria.</td>
          </tr>
          <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-slate-50/80 transition-colors group">
            <td class="px-8 py-5 whitespace-nowrap">
              <div class="font-bold text-slate-800 text-base">{{ item.name }}</div>
            </td>
            <td class="px-8 py-5 whitespace-nowrap">
              <span v-if="item.category === 'Mentahan'" class="px-4 py-1.5 inline-flex text-xs font-bold rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                Mentahan
              </span>
              <span v-else class="px-4 py-1.5 inline-flex text-xs font-bold rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                Hasil Ekstrak
              </span>
            </td>
            <td class="px-8 py-5 whitespace-nowrap text-right">
              <div class="text-xl font-black text-slate-900">
                {{ item.current_quantity }} <span class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{{ item.unit }}</span>
              </div>
            </td>
            <td class="px-8 py-5 whitespace-nowrap text-center text-sm font-medium">
               <button @click="deleteItem(item.id)" class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
               </button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah Data (Refined) -->
    <div v-if="showAddModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-200">
        <h2 class="text-2xl font-black text-slate-900 mb-2 tracking-tight">Tambah Master Barang</h2>
        <p class="text-slate-500 text-sm mb-8">Daftarkan jenis barang baru untuk mulai mencatat stok.</p>
        
        <form @submit.prevent="submitNeItem" class="space-y-6">
          <div>
            <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nama Barang</label>
            <input v-model="newItem.name" type="text" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-3.5 border transition-all outline-none font-medium" placeholder="Cth: HP Mati / Mesin HP">
          </div>
          <div>
            <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Kategori</label>
            <select v-model="newItem.category" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-3.5 border transition-all outline-none font-medium bg-white">
              <option value="Mentahan">Barang Mentahan (Beli dari luar)</option>
              <option value="Hasil Ekstrak">Hasil Ekstrak (Untuk dijual ke pabrik)</option>
            </select>
          </div>
           <div>
            <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Satuan</label>
            <select v-model="newItem.unit" required class="w-full bg-slate-50 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 px-5 py-3.5 border transition-all outline-none font-medium bg-white">
              <option value="Pcs">Pcs</option>
              <option value="Kg">Kg</option>
              <option value="Gram">Gram</option>
            </select>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button type="button" @click="showAddModal = false" class="flex-1 px-6 py-4 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold transition-all">Batal</button>
            <button type="submit" :disabled="submitting" class="flex-1 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 active:scale-95">
              {{ submitting ? 'Menyimpan...' : 'Simpan Barang' }}
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
const showOnlyReady = ref(false)
const loading = ref(true)
const error = ref(null)

const filteredItems = computed(() => {
  if (showOnlyReady.value) {
    return items.value.filter(i => i.current_quantity > 0)
  }
  return items.value
})

const showAddModal = ref(false)
const submitting = ref(false)

const newItem = ref({
  name: '',
  category: 'Mentahan',
  unit: 'Pcs'
})

const API_BASE_URL = config.API_BASE_URL

const fetchItems = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE_URL}/items`)
    items.value = response.data || []
  } catch (err) {
    console.error('Error fetching items:', err)
    error.value = 'Gagal memuat data barang.'
  } finally {
    loading.value = false
  }
}

const submitNeItem = async () => {
  submitting.value = true
  try {
    await axios.post(`${API_BASE_URL}/items`, newItem.value)
    showAddModal.value = false
    newItem.value = { name: '', category: 'Mentahan', unit: 'Pcs' } // reset
    fetchItems() // reload data
    toastStore.show('Barang baru berhasil ditambahkan!')
  } catch (err) {
    console.error('Error saving item:', err)
    toastStore.show('Gagal menyimpan barang baru.', 'error')
  } finally {
    submitting.value = false
  }
}

const deleteItem = async (id) => {
  if (!confirm('Apakah kamu yakin ingin menghapus barang ini? Data transaksi yang terkait mungkin akan rusak.')) return
  
  try {
    await axios.delete(`${API_BASE_URL}/items/${id}`)
    fetchItems() // reload
    toastStore.show('Barang telah dihapus.')
  } catch (err) {
    console.error('Error deleting item', err)
    toastStore.show('Gagal menghapus barang.', 'error')
  }
}

onMounted(() => {
  fetchItems()
})
</script>
