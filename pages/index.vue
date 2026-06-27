<script setup lang="ts">
const supabase = useSupabaseClient()
const { generateReference } = useReference()
const loading = ref(false)
const success = ref('')
const error = ref('')
const form = reactive({ full_name:'', phone:'', email:'', payment_date:'', confirm:false })
const file = ref<File | null>(null)
const filePreviewUrl = ref<string | null>(null)
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const lastSubmission = ref<{ full_name?:string; phone?:string; email?:string; payment_date?:string; reference_no?:string }>({})
const lastReference = ref('')
function onFile(e: Event){
  const target = e.target as HTMLInputElement
  const f = target.files?.[0] || null
  if(f && f.size > MAX_FILE_SIZE){
    error.value = 'File too large. Maximum allowed size is 2MB.'
    file.value = null
    return
  }
  // set preview for images
  if(filePreviewUrl.value){ URL.revokeObjectURL(filePreviewUrl.value); filePreviewUrl.value = null }
  if(f && f.type.startsWith('image/')) filePreviewUrl.value = URL.createObjectURL(f)
  file.value = f
  error.value = ''
}
async function submit(){
  success.value=''; error.value=''
  if(!form.full_name || !form.phone || !form.email || !form.payment_date || !file.value || !form.confirm){ error.value='Please fill all required fields and upload proof of payment.'; return }
  loading.value=true
  try{
    if(file.value && file.value.size > MAX_FILE_SIZE){ error.value = 'File too large. Maximum allowed size is 2MB.'; loading.value=false; return }
    const reference_no = generateReference()
    const ext = file.value.name.split('.').pop()
    const path = `${reference_no}.${ext}`
    const { error: uploadError } = await supabase.storage.from('payment-proofs').upload(path, file.value, { upsert:false })
    if(uploadError) throw uploadError
    // call server endpoint to validate size and insert record (server will remove oversized uploads)
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ reference_no, full_name: form.full_name, phone: form.phone, email: form.email, payment_date: form.payment_date, proof_file_path: path })
    })
    if(!res.ok){
      const text = await res.text().catch(()=>res.statusText)
      throw new Error(text || 'Server rejected upload')
    }
    success.value = `Submitted successfully. Your reference number is ${reference_no}`
    // store submission for slip download
    lastSubmission.value = { full_name: form.full_name, phone: form.phone, email: form.email, payment_date: form.payment_date, reference_no }
    lastReference.value = reference_no
    // trigger automatic download of slip
    await downloadSlip()
    Object.assign(form,{ full_name:'', phone:'', email:'', payment_date:'', confirm:false });
    file.value=null
    if(filePreviewUrl.value){ URL.revokeObjectURL(filePreviewUrl.value); filePreviewUrl.value = null }
  }catch(e:any){ error.value=e.message || 'Submission failed. Please try again.' } finally{ loading.value=false }
}

async function downloadSlip(){
  if(!lastSubmission.value || !lastSubmission.value.reference_no) return
  if(typeof window === 'undefined') return
  const { jsPDF } = await import('jspdf')
  const now = new Date().toLocaleString()
  const lines = [
    'Payment Submission Receipt',
    '',
    'Event: Day 30 Vocal Series Finale',
    `Reference No: ${lastSubmission.value.reference_no}`,
    `Full Name: ${lastSubmission.value.full_name || ''}`,
    `Phone: ${lastSubmission.value.phone || ''}`,
    `Email: ${lastSubmission.value.email || ''}`,
    `Payment Date: ${lastSubmission.value.payment_date || ''}`,
    `Generated: ${now}`,
    '',
    'Please keep this slip for your records.'
  ]
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  doc.setFontSize(12)
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 40
  const maxLineWidth = pageWidth - margin * 2
  const text = doc.splitTextToSize(lines.join('\n'), maxLineWidth)
  doc.text(text, margin, 60)
  const filename = `${lastSubmission.value.reference_no}-payment-slip.pdf`
  doc.save(filename)
}
</script>
<template>
  <div>
    <section class="hero">
      <div class="container topbar">
        <div class="brand"><div class="logo">MDB</div><div><h1>MATT DE BARITONE</h1><p>VOCAL SERIES</p></div></div>
        <a class="help" href="mailto:info@mattdebaritone.com">Need Help? Contact Us</a>
      </div>
      <div class="container hero-grid">
        <div>
          <div class="eyebrow">DAY 30 VOCAL SERIES FINALE</div>
          <h2>PAYMENT PROOF <span>SUBMISSION</span></h2>
          <p>Thank you for your interest in the Day 30 Vocal Series Finale. Complete the form below and upload your proof of payment to confirm your participation.</p>
          <div class="feature-row">
            <div class="feature"><div class="icon">👥</div><div><b>Connect</b><small>With vocal professionals</small></div></div>
            <div class="feature"><div class="icon">📖</div><div><b>Learn</b><small>Advanced vocal techniques</small></div></div>
            <div class="feature"><div class="icon">🎙️</div><div><b>Inspire</b><small>The next generation</small></div></div>
          </div>
        </div>
        <div class="hero-art">
  <div class="choir"></div>
  <img class="" src="/artist.png" alt="Matt De Baritone" />
</div>
      </div>
    </section>
    <main class="container">
      <div class="main-grid">
        <section class="card">
          <div class="card-title"><div class="badge">📋</div><div><h3>SUBMISSION FORM</h3><p>Please fill in your details and upload your payment proof.</p></div></div>
          <div v-if="success" class="alert success">{{ success }}</div>
          <div v-if="lastReference" style="margin-top:8px"><button class="btn" @click="downloadSlip">Download Slip</button></div>
          <div v-if="error" class="alert error">{{ error }}</div>
          <form @submit.prevent="submit">
            <div class="form-grid">
              <div class="field"><label>Full Name <span>*</span></label><input v-model="form.full_name" placeholder="Enter your full name" /></div>
              <div class="field"><label>Phone Number <span>*</span></label><input v-model="form.phone" placeholder="080xxxxxxxx" /></div>
              <div class="field"><label>Email Address <span>*</span></label><input v-model="form.email" type="email" placeholder="Enter your email address" /></div>
              <div class="field"><label>Payment Date <span>*</span></label><input v-model="form.payment_date" type="date" /></div>
              <div class="field full"><label>Proof of Payment <span>*</span></label><div class="drop"><p><b>Click to upload or drag and drop</b><br/><small>JPG, PNG, PDF. Max 2MB</small></p><input type="file" accept="image/*,.pdf" @change="onFile" />
                <div v-if="file" style="margin-top:8px">
                  <strong>Selected:</strong> {{ file.name }} <small>({{ (file.size/1024).toFixed(1) }} KB)</small>
                  <div v-if="filePreviewUrl" style="margin-top:8px"><img :src="filePreviewUrl" style="max-width:180px;border:1px solid rgba(0,0,0,0.08);padding:6px;border-radius:6px" /></div>
                </div>
              </div></div>
            </div>
            <label class="check"><input v-model="form.confirm" type="checkbox" /> I confirm that the information provided is accurate.</label>
            <button class="btn" :disabled="loading">{{ loading ? 'SUBMITTING...' : 'SUBMIT PAYMENT PROOF' }}</button>
          </form>
        </section>
        <aside class="card">
          <div class="card-title"><div class="badge">ℹ️</div><div><h3>ABOUT THIS SERIES</h3></div></div>
          <p>The Day 30 Vocal Series Finale is a virtual masterclass designed to connect, educate and inspire vocal students and music enthusiasts across the country.</p>
          <div class="about-item"><div class="about-icon">🎙️</div><div><b>Develop Your Voice</b><p>Learn techniques to unlock your full vocal potential.</p></div></div>
          <div class="about-item"><div class="about-icon">📈</div><div><b>Improve Performance</b><p>Gain practical tips to enhance your stage and studio performance.</p></div></div>
          <div class="about-item"><div class="about-icon">📖</div><div><b>Learn Music Pedagogy</b><p>Understand the art and science of teaching music effectively.</p></div></div>
          <div class="about-item"><div class="about-icon">👥</div><div><b>Interact with Professionals</b><p>Engage with seasoned vocal coaches and music professionals.</p></div></div>
          <div class="secure"><b>🔒 Your information is secure</b><p>We take your privacy and data security seriously.</p></div>
        </aside>
      </div>
      <section class="card steps">
        <div class="card-title"><div class="badge">✓</div><h3>WHAT HAPPENS NEXT?</h3></div>
        <div class="steps-row"><div class="step"><div class="num">1</div><div><b>Submit Form</b><p>Fill in your details and upload your payment proof.</p></div></div><div class="step"><div class="num">2</div><div><b>Review</b><p>Our team will review your submission.</p></div></div><div class="step"><div class="num">3</div><div><b>Confirmation</b><p>You would be notified once your payment is verified.</p></div></div><div class="step"><div class="num">4</div><div><b>You’re In!</b><p>Get ready to participate in the Day 30 Vocal Series Finale.</p></div></div></div>
      </section>
    </main>
    <footer class="footer">© 2025 Matt De Baritone. All Rights Reserved.</footer>
  </div>
</template>
