"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";
import { redirect } from "next/navigation";

export async function createTranscation(formData) {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("active_transactions")
    .insert(formData);

  if (error) {
    throw new Error("Failed to create transaction");
  }

  revalidatePath("/dashboard");
}

export async function updateTranscation(id, formData) {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("active_transactions")
    .update(formData)
    .eq("id", id);
  if (error) {
    throw new Error("Failed to create transaction");
  }

  revalidatePath("/dashboard");
}


export async function fetchTransactions(range, offset = 0, limit = 10) {
  const supabase = await createClient();
  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  return data;
}


export async function deleteTransaction(id) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("active_transactions")
    .delete()
    .eq("id", id)
  if (error) throw new Error(`Could not delete transaction ${id}`)
  revalidatePath("/dashboard")
} 

export async function login(prevState, formData) {
const supabase = await createClient()
const email = formData.get("email")
const {error} = supabase.auth.signInWithOtp({
  email,
  options: {
    shouldCreateUser: true
  }
})
 

if (error) {
   return { 
    error: true,
    message: 'Error while authanticating',
  }
}

return {
  message: `Email sent to ${email}`,
}

}

export async function signOut() {
   const supabase = await createClient()
   const { error } = await supabase.auth.signOut()
   redirect('/login')
}

export async function uploadAvatar(prevState, formData) {
  const supabase = await createClient()
  const file = formData.get('file')
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const {error} = await supabase.storage
  .from('avatar')
  .upload(fileName, file)

  if (error) {
    return {
      error: true,
      message: 'Failed to upload avatar',
    }
  }

  return {
    message: 'Avatar uploaded',
  }
}
