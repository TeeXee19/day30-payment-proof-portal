<script setup lang="ts">
const supabase = useSupabaseClient(); const router = useRouter(); const email=ref(''); const password=ref(''); const error=ref('')
async function login(){ error.value=''; const { error: e } = await supabase.auth.signInWithPassword({ email:email.value, password:password.value }); if(e) error.value=e.message; else router.push('/admin') }
</script>
<template><div class="admin-wrap container"><section class="card" style="max-width:440px;margin:auto"><div class="brand"><div class="logo">MDB</div><div><h1>ADMIN LOGIN</h1><p>VOCAL SERIES</p></div></div><div v-if="error" class="alert error">{{ error }}</div><form @submit.prevent="login" style="margin-top:24px"><label>Email</label><input v-model="email" type="email"><br><br><label>Password</label><input v-model="password" type="password"><br><br><button class="btn">LOGIN</button></form></section></div></template>
