import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'

// Load environment variables from the Next.js local env file
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE ?? ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables in .env.local")
  process.exit(1)
}

// Service role client is required here since we are bypassing RLS for seeding
const supabase = createClient(supabaseUrl, supabaseServiceKey)


const categories = [
  'Housing', 'Transport', 'Health', 'Food', 'Education', 'Other'
]

async function seedUsers() {
  for (let i = 0; i < 5; i++) {
    try {
      const { error } = await supabase.auth.admin.createUser({
        email: faker.internet.email(),
        password: 'password123', // Ensure it meets default 6+ character min requirements
        email_confirm: true       // Auto-confirm emails so users are immediately active
      })
      
      if (error) {
        throw error
      }

      console.log(`✔ User ${i + 1} added successfully`)
    } catch (e) {
      console.error(`❌ Error adding user: ${e.message || e}`)
    }
  }
}

async function seed() {
  // 1. Seed the users first
  await seedUsers()
  
  let transactions = []
  
  // 2. Fetch the created users using the admin API
  const { data: { users }, error: listUsersError } = await supabase.auth.admin.listUsers()

  if (listUsersError || !users || users.length === 0) {
    console.error(`❌ Cannot list users or no users found, aborting transaction seed.`, listUsersError)
    return
  }

  const userIds = users.map(user => user.id)

  // 3. Generate transaction batch
  for (let i = 0; i < 100; i++) {
    const created_at = faker.date.past()
    let type = 'Expense'
    let category = null
    const user_id = faker.helpers.arrayElement(userIds)
    const typeBias = Math.random()

    if (typeBias < 0.80) {
      type = 'Expense'
      category = faker.helpers.arrayElement(categories)
    } else if (typeBias < 0.90) {
      type = 'Income'
    } else {
      type = faker.helpers.arrayElement(['Saving', 'Investment'])
    }

    let amount = 0
    switch (type) {
      case 'Income':
        amount = faker.number.int({ min: 2000, max: 9000 })
        break
      case 'Expense':
        amount = faker.number.int({ min: 10, max: 1000 })
        break
      case 'Investment':
      case 'Saving':
        amount = faker.number.int({ min: 3000, max: 10000 })
        break
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
      user_id
    })
  }

  // 4. Bulk insert transactions to Supabase
  const { error } = await supabase
    .from('active_transactions')
    .insert(transactions)

  if (error) {
    console.error('❌ Error inserting transactions:', error.message)
  } else {
    console.log(`🎉 Success! ${transactions.length} transactions stored.`)
  }
}

seed().catch((err) => console.error("Uncaught execution error:", err))