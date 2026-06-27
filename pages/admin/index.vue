<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const supabase = useSupabaseClient()
const rows = ref<any[]>([])
const loading = ref(true)
const search = ref('')
const statusFilter = ref('ALL')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const showModal = ref(false)
const selectedRecord = ref<any>(null)
const statusOptions = ['ALL', 'PENDING', 'VERIFIED', 'REJECTED', 'NEEDS_CLARIFICATION']

async function load(){
  loading.value = true
  const { data } = await supabase.from('payment_submissions').select('*').order('created_at',{ascending:false})
  rows.value = data || []
  loading.value = false
}

async function updateStatus(id:string, status:string){
  await supabase.from('payment_submissions').update({ status }).eq('id', id)
  await load()
}

function proofUrl(path:string){
  return supabase.storage.from('payment-proofs').getPublicUrl(path).data.publicUrl
}

function logout(){
  supabase.auth.signOut()
  navigateTo('/admin/login')
}

function filterMatches(row:any){
  const query = search.value.trim().toLowerCase()
  const matchesSearch = !query || [row.reference_no, row.full_name, row.phone, row.email]
    .map((value:any) => String(value || '').toLowerCase())
    .some(value => value.includes(query))

  const matchesStatus = statusFilter.value === 'ALL' || row.status === statusFilter.value
  const paymentDate = row.payment_date || ''
  const matchesStart = !startDate.value || paymentDate >= startDate.value
  const matchesEnd = !endDate.value || paymentDate <= endDate.value

  return matchesSearch && matchesStatus && matchesStart && matchesEnd
}

const filteredRows = computed(() => rows.value.filter(filterMatches))
const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize.value)))
const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

function setPage(page:number){
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

function openPreview(row:any){
  selectedRecord.value = row
  showModal.value = true
}

function closePreview(){
  showModal.value = false
  selectedRecord.value = null
}

onMounted(load)
</script>

<template>
  <div class="admin-wrap container">
    <div class="admin-head">
      <div>
        <h1 class="serif" style="color:var(--navy)">Payment Submissions</h1>
        <p>Day 30 Vocal Series Finale</p>
      </div>
      <button class="small-btn" @click="logout">Logout</button>
    </div>

    <section class="admin-controls">
      <div class="filter-group">
        <label>Search</label>
        <input v-model="search" placeholder="Search reference, name, phone, email" />
      </div>
      <div class="filter-group">
        <label>Status</label>
        <select v-model="statusFilter">
          <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label>From</label>
        <input type="date" v-model="startDate" />
      </div>
      <div class="filter-group">
        <label>To</label>
        <input type="date" v-model="endDate" />
      </div>
      <div class="filter-group info">
        <label>Total</label>
        <div>{{ filteredRows.length }} records</div>
      </div>
    </section>

    <p v-if="loading">Loading...</p>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Payment Date</th>
            <th>Proof</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pagedRows.length === 0">
            <td colspan="8">No records match your filters.</td>
          </tr>
          <tr v-for="r in pagedRows" :key="r.id">
            <td>{{ r.reference_no }}</td>
            <td>{{ r.full_name }}</td>
            <td>{{ r.phone }}</td>
            <td>{{ r.email }}</td>
            <td>{{ r.payment_date }}</td>
            <td><button class="link-btn" type="button" @click="openPreview(r)">View</button></td>
            <td><span class="pill">{{ r.status }}</span></td>
            <td>
              <select :value="r.status" @change="updateStatus(r.id, ($event.target as HTMLSelectElement).value)">
                <option>PENDING</option>
                <option>VERIFIED</option>
                <option>REJECTED</option>
                <option>NEEDS_CLARIFICATION</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button class="small-btn" :disabled="currentPage === 1" @click="setPage(currentPage - 1)">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="small-btn" :disabled="currentPage === totalPages" @click="setPage(currentPage + 1)">Next</button>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop" @click.self="closePreview">
      <div class="modal">
        <div class="modal-header">
          <h2>Upload Preview</h2>
          <button class="small-btn" @click="closePreview">Close</button>
        </div>
        <p><strong>Reference:</strong> {{ selectedRecord.reference_no }}</p>
        <p><strong>Name:</strong> {{ selectedRecord.full_name }}</p>
        <div class="modal-body">
          <iframe
            v-if="selectedRecord && selectedRecord.proof_file_path"
            :src="proofUrl(selectedRecord.proof_file_path)"
            frameborder="0"
          ></iframe>
          <p v-else>No proof available.</p>
        </div>
        <a
          v-if="selectedRecord && selectedRecord.proof_file_path"
          :href="proofUrl(selectedRecord.proof_file_path)"
          target="_blank"
          class="small-btn"
        >Open in new tab</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-controls {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-bottom: 24px;
}
.filter-group {
  display: flex;
  flex-direction: column;
}
.filter-group label {
  margin-bottom: 8px;
  font-weight: 600;
}
.filter-group.info {
  justify-content: flex-end;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}
.table th,
.table td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.link-btn {
  background: none;
  border: none;
  color: var(--blue);
  cursor: pointer;
  padding: 0;
  font: inherit;
  text-decoration: underline;
}
.pagination {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
}
.modal {
  background: white;
  border-radius: 16px;
  width: min(900px, 100%);
  max-height: calc(100vh - 80px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-body {
  min-height: 300px;
}
.modal iframe {
  width: 100%;
  height: 100%;
  min-height: 420px;
  border: 1px solid rgba(0,0,0,0.1);
}
</style>
