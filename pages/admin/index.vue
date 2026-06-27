<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const supabase = useSupabaseClient(); const rows=ref<any[]>([]); const loading=ref(true)
async function load(){ loading.value=true; const { data } = await supabase.from('payment_submissions').select('*').order('created_at',{ascending:false}); rows.value=data||[]; loading.value=false }
async function updateStatus(id:string,status:string){ await supabase.from('payment_submissions').update({status}).eq('id',id); await load() }
function proofUrl(path:string){ return supabase.storage.from('payment-proofs').getPublicUrl(path).data.publicUrl }
async function logout(){ await supabase.auth.signOut(); navigateTo('/admin/login') }
onMounted(load)
</script>
<template><div class="admin-wrap container"><div class="admin-head"><div><h1 class="serif" style="color:var(--navy)">Payment Submissions</h1><p>Day 30 Vocal Series Finale</p></div><button class="small-btn" @click="logout">Logout</button></div><p v-if="loading">Loading...</p><table v-else class="table"><thead><tr><th>Reference</th><th>Name</th><th>Phone</th><th>Email</th><th>Payment Date</th><th>Proof</th><th>Status</th><th>Action</th></tr></thead><tbody><tr v-for="r in rows" :key="r.id"><td>{{ r.reference_no }}</td><td>{{ r.full_name }}</td><td>{{ r.phone }}</td><td>{{ r.email }}</td><td>{{ r.payment_date }}</td><td><a :href="proofUrl(r.proof_file_path)" target="_blank">View</a></td><td><span class="pill">{{ r.status }}</span></td><td><select :value="r.status" @change="updateStatus(r.id, ($event.target as HTMLSelectElement).value)"><option>PENDING</option><option>VERIFIED</option><option>REJECTED</option><option>NEEDS_CLARIFICATION</option></select></td></tr></tbody></table></div></template>
