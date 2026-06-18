export const types = [
  'Income', 'Expense', 'Investment', 'Savings'
]
export const categories = [
  'Housing', 'Transport', 'Health', 'Food', 'Education', 'Other'
]

export const ranges = [
  { value: 'last24hours', label: 'Last 24 hours' },
  { value: 'last7days', label: 'Last 7 days' },
  { value: 'last30days', label: 'Last 30 days' },
  { value: 'last12months', label: 'Last 12 months' },
]

export const defaultRange = 'last30days'