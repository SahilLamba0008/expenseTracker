export interface Expense {
  id: string
  title: string
  amount: number
  date: string
  category: string
  description?: string
}

export interface User {
  id: string
  name: string
  email: string
  monthlySalary: number
}

export interface ExpenseContextType {
  expenses: Expense[]
  user: User | null
  addExpense: (expense: Omit<Expense, "id">) => void
  updateExpense: (id: string, expense: Partial<Expense>) => void
  deleteExpense: (id: string) => void
  updateUser: (user: Partial<User>) => void
  getTotalBalance: () => number
  getTotalIncome: () => number
  getTotalExpenses: () => number
}

export interface ApiResponse<T> {
  data: T
  loading: boolean
  error: string | null
}
