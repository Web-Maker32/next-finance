"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { settingsSchema, transactionSchema } from "./validation";

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
  revalidatePath("/dashboard")
} 

export async function login(prevState, formData) {
  const supabase = await createClient()
  const email = formData.get("email")
  const flow = formData.get("flow")
  const password = formData.get("password")

  if (!email) {
    return {
      error: true,
      message: "Please enter your email address.",
    }
  }

  if (flow === "password") {
    if (!password) {
      return {
        error: true,
        message: "Please enter your password to sign in.",
      }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        error: true,
        message: error.message || "Invalid email or password.",
      }
    }

    return {
      success: true,
      target: '/dashboard',
      message: `Signed in as ${email}`,
    }
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  })

  if (error) {
    return {
      error: true,
      message: error.message || 'Error while authenticating',
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

  const {data: userData, userError} = await supabase.auth
  .getUser()

  if (userError) {
    return {
      error: true,
      message: 'Something went wrong, try again',
    }
  }


  const avatar = userData.user.user_metadata.avatar

  if (avatar) {
    const {error} = await supabase.storage
    .from('avatar')
    .remove([avatar])

    if (error) {
      return {
        error: true,
        message: 'Failed to remove old avatar, try again',
      }
    }
  }

  const {error: dataUpdateError } = await 
    supabase.auth
   .updateUser({
     data: {
       avatar: fileName
     }
   })

   if (dataUpdateError) {
     return {
       error: true,
       message: "Failed to update user avatar",
     }

   }

   return {
     message: 'updated the user avatar'
   }

}

export async function updateSettings(prevState, formData) {
  const validated = settingsSchema.safeParse({
    name: formData.get('name'),
    defaultView: formData.get('defaultView'),
    currency: formData.get('currency')
  })

 if (!validated.success) {
   return {
     errors: validated.error.flatten().fieldErrors
   }
 }


  const supabase = await createClient()
  const {error} = await supabase.auth
    .updateUser({
      data: {
        name: validated.data.name,
        defaultView: validated.data.defaultView,
        currency: validated.data.currency
      }
    })
    
  if (error) {
    return{
      error: true,
      message: 'Failed updating setting',
      errors: {}
    }
  }

  return {
    message: 'Updated user settings',
    errors: {}
  }
}
