"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import crypto from "node:crypto";
import { createClient } from "./supabase/server";
import { budgetSchema, recurringSchema, settingsSchema, transactionSchema } from "./validation";

function revalidateApp() {
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/budgets");
  revalidatePath("/dashboard/insights");
  revalidatePath("/dashboard/data");
  revalidatePath("/dashboard/recurring");
}

export async function fetchTransactions(range, offset = 0, limit = 10, from, to) {
  const supabase = await createClient();

  if (range === "custom" && from && to) {
    const { data, error } = await supabase
      .from("active_transactions")
      .select("*")
      .gte("created_at", from)
      .lte("created_at", `${to}T23:59:59`)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw new Error("We can't fetch transactions");
    return data ?? [];
  }

  const { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  return data;
}

export async function fetchAllTransactions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("active_transactions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);
  if (error) throw new Error("We can't fetch transactions");
  return data ?? [];
}

export async function importTransactions(rows) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("Sign in first");
  if (!Array.isArray(rows) || rows.length === 0 || rows.length > 2000) {
    throw new Error("Import must contain between 1 and 2000 rows");
  }
  const payload = rows.map((row) => ({
    type: row.type,
    category: row.category || "Other",
    amount: row.amount,
    description: row.description,
    created_at: row.created_at,
  }));
  const validated = payload.map((row) => transactionSchema.safeParse(row));
  if (validated.some((result) => !result.success)) {
    throw new Error("Import contains invalid transaction data");
  }
  const { error } = await supabase
    .from("active_transactions")
    .insert(validated.map((result) => result.data));
  if (error) throw new Error(error.message || "Import failed");
  revalidateApp();
  return { count: payload.length };
}

export async function saveBudget(formData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("Sign in first");
  const validated = budgetSchema.safeParse({
    category: formData.get("category")?.toString(),
    monthly_limit: formData.get("monthly_limit"),
  });
  if (!validated.success) throw new Error("Category and a positive limit are required");
  const { error } = await supabase
    .from("budgets")
    .upsert(
      { user_id: auth.user.id, ...validated.data },
      { onConflict: "user_id,category" }
    );
  if (error) throw new Error(error.message || "Could not save budget");
  revalidateApp();
}

export async function deleteBudget(id) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("Sign in first");
  const { error } = await supabase.from("budgets").delete().eq("id", id);
  if (error) throw new Error("Could not delete budget");
  revalidateApp();
}

export async function saveRecurring(formData) {
  const supabase = await createClient();
  const validated = recurringSchema.safeParse({
    description: formData.get("description")?.toString(),
    amount: formData.get("amount"),
    type: formData.get("type")?.toString() || "Expense",
    category: formData.get("category")?.toString() || "Other",
    interval: formData.get("interval")?.toString() || "monthly",
    next_date: formData.get("next_date")?.toString(),
    active: true,
  });
  if (!validated.success) throw new Error("Enter a valid recurring transaction");
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("Sign in first");
  const { error } = await supabase.from("recurring_transactions").insert({
    user_id: auth.user.id,
    ...validated.data,
  });
  if (error) throw new Error(error.message || "Could not save recurring item");
  revalidateApp();
}

export async function deleteRecurring(id) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("Sign in first");
  const { error } = await supabase.from("recurring_transactions").delete().eq("id", id);
  if (error) throw new Error("Could not delete recurring item");
  revalidateApp();
}

export async function createTransaction(formData) {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("active_transactions")
    .insert(validated.data);

  if (error) {
    throw new Error("Failed to create transaction");
  }

  revalidatePath("/dashboard");
}

export async function updateTransaction(id, formData) {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("active_transactions")
    .update(validated.data)
    .eq("id", id);
  if (error) {
    throw new Error("Failed to create transaction");
  }

  revalidatePath("/dashboard");
}

export async function deleteTransaction(id) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("active_transactions")
    .delete()
    .eq("id", id);
  if (error) throw new Error("Could not delete transaction");
  revalidatePath("/dashboard");
}

export async function login(prevState, formData) {
  const supabase = await createClient()
  const email = formData.get("email")?.toString().trim()
  const flow = formData.get("flow")?.toString()
  const password = formData.get("password")?.toString().trim()

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

    const normalizedEmail = email.toLowerCase()
    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    })

    if (!error) {
      return {
        success: true,
        target: '/dashboard',
        message: `Signed in as ${normalizedEmail}`,
      }
    }

    if (/email not confirmed/i.test(error.message || '')) {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          shouldCreateUser: false,
        },
      })

      if (otpError) {
        return {
          error: true,
          message: otpError.message || "Unable to resend confirmation email.",
        }
      }

      return {
        error: false,
        message: `A confirmation email was sent to ${normalizedEmail}.`,
      }
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
    })

    if (!signUpError && data?.session) {
      return {
        success: true,
        target: '/dashboard',
        message: `Signed up and signed in as ${normalizedEmail}`,
      }
    }

    if (!signUpError && data?.user) {
      return {
        error: false,
        message: `A confirmation email was sent to ${normalizedEmail}.`,
      }
    }

    const signUpAlreadyRegistered = /already registered|duplicate|user already registered/i.test(signUpError?.message || '')

    return {
      error: true,
      message: signUpAlreadyRegistered
        ? error.message || "Invalid email or password."
        : signUpError?.message || error.message || "Invalid email or password.",
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
  if (!(file instanceof File) || !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
    return {
      error: true,
      message: 'Please choose an image smaller than 5 MB',
    }
  }
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) {
    return {
      error: true,
      message: 'Sign in first',
    }
  }
  const fileExt = file.type.split('/')[1]?.replace(/[^a-z0-9]/gi, '') || 'bin'
  const fileName = `${auth.user.id}/${crypto.randomUUID()}.${fileExt}`
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
