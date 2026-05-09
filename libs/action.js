'use server'

import { revalidatePath } from 'next/cache';
import { createClient } from './supabase/server';

export async function createTranscation(formData) {
  const supabase = await createClient()
  const {error} = await supabase.from('active_transactions')
   .insert(formData);

   if (error) {
    throw new Error('Failed to create transaction');
   }
   
   revalidatePath('/dashboardr');
}
