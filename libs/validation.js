import { z } from "zod"
import { categories, dateRangeValues, types, currencies } from "./consts"


export const settingsSchema = z.object({
    name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
    defaultView: z.enum(dateRangeValues),
    currency: z.enum(currencies).optional()
})

export const transactionSchema = z.object({
    type: z.enum(types),
    category: z.preprocess(val => val?.length ? val : undefined, z.enum(categories).optional()),
    amount: z.coerce.number().min(1, {
        message: "Amount must be at least 1"
    }),
    description: z.string().optional(),
    created_at: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Date need to contain a valid date"
    })
}).refine((data) => {
    if (data.type === "Expense") {
      return data.category !== undefined && categories.includes(data.category);
    }
    return true;
}, {
  path: ["category"],
  message: "Category is required for Expenses"
})

export const budgetSchema = z.object({
        category: z.enum(categories),
        monthly_limit: z.coerce.number().positive(),
})

export const recurringSchema = z.object({
        description: z.string().trim().min(1),
        amount: z.coerce.number().positive(),
        type: z.enum(types),
        category: z.enum(categories),
        interval: z.enum(["weekly", "monthly", "yearly"]),
        next_date: z.string().refine(val => !isNaN(Date.parse(val)), {
            message: "Date must be valid"
        }),
        active: z.literal(true),
})
