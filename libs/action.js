'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from './supabase/server';
import { transactionSchema } from './validation';

export async function createTranscation(formData) {
  const validated = transactionSchema.safeParse(formData)

if (!validated.success) {
  return { success: false, error: 'Invalid data' }
}

  const supabase = await createClient() 
  const {error} = await supabase.from('active_transactions')
   .insert(validated.data)

  if (error) {
    return { success: false, error: 'Failed to create transaction' }
  }
  
  revalidatePath('/dashboard')
  return { success: true }
}
