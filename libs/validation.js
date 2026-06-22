import { z } from "zod"
import { categories, dateRangeValues, types } from "./consts"


export const profileSchema = z.object({
    name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
})

export const settingsSchema = z.object({
    name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }), // Custom message here
    defaultView: z.enum(dateRangeValues)
})

export const transactionSchema = z.object({
    type: z.enum(types),
    category: z.preprocess(val => val?.length ? val : undefined, z.string().optional()),
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
