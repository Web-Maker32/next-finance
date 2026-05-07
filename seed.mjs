import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

dotenv.config({path: '.env.local'})

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_service_role
)

const categories = [
  'Housing', 'Transport', 'Health', 'Food', 'Education', 'Other'
]

async function seed() {
    let transactions = []

  for (let i = 0; i < 10; i++) {
    const created_at = faker.date.past()

    let type,category = null

    const typebais = Math.random()

    if(typebais < 0.80) {
        type = 'Expense'
        category = faker.helpers.arrayElement(categories)
    } else if (typebais < 0.90){
        type = 'Income'
    }else {
        type = faker.helpers.arrayElement([
            'Transfer', 'Investment'
        ])
    }

    let amount 
    switch (type) {
        case 'Income':
            amount = faker.number.int({min: 1000, max: 9000}) 
            break

        case 'Expense':
            amount = faker.number.int({min: 10, max: 1000}) 
            break
            
        case 'Savings':
        case 'Investment':
            amount = faker.number.int({min: 3000, max: 10000}) 
            break
    }
    
    transactions.push({
        created_at,
        amount,
        type,
        description: faker.lorem.sentence(),
        category,
    })

    const {error} = await supabase.from('active_transactions').insert(transactions)

    if (error) {
        console.error('Error inserting data')
    } else {
        console.log('Data inserted successfully')
    }
  }
}

seed().catch(console.error)
