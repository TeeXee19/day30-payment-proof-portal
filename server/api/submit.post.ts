import { createClient } from '@supabase/supabase-js'
import { readBody, createError, sendError } from 'h3'

const SUPABASE_URL = process.env.NUXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody(event)
    const { reference_no, full_name, phone, email, payment_date, proof_file_path } = body as any
    if(!reference_no || !proof_file_path) return sendError(event, createError({ statusCode:400, statusMessage: 'Missing parameters' }))

    const { data, error: downloadError } = await supabase.storage.from('payment-proofs').download(proof_file_path)
    if(downloadError) return sendError(event, createError({ statusCode:400, statusMessage: downloadError.message }))

    let size = 0
    // Node return may be a Buffer
    if(Buffer.isBuffer(data)) size = (data as Buffer).length
    else if((data as any).arrayBuffer) { const buf = await (data as any).arrayBuffer(); size = buf.byteLength }
    else if((data as any).size) size = (data as any).size

    if(size > MAX_FILE_SIZE){
      await supabase.storage.from('payment-proofs').remove([proof_file_path])
      return sendError(event, createError({ statusCode:413, statusMessage: 'File exceeds 2MB limit and was removed' }))
    }

    const { error: dbError } = await supabase.from('payment_submissions').insert({ reference_no, full_name, phone, email, payment_date, proof_file_path })
    if(dbError) return sendError(event, createError({ statusCode:500, statusMessage: dbError.message }))

    return { success: true }
  }catch(e:any){
    return sendError(event, createError({ statusCode:500, statusMessage: e.message || 'Server error' }))
  }
})
