import type React from "react";
import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Expense, User, ExpenseContextType } from "@/lib/types";

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
	const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);
	const [user, setUser] = useLocalStorage<User | null>("user", {
		id: "1",
		name: "Sahil",
		email: "sahil@civilmantra.com",
		monthlySalary: 5000,
	});

	const addExpense = (expense: Omit<Expense, "id">) => {
		const newExpense: Expense = {
			...expense,
			id: Date.now().toString(),
		};
		setExpenses([...expenses, newExpense]);
	};

	const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
		setExpenses(
			expenses.map((expense) =>
				expense.id === id ? { ...expense, ...updatedExpense } : expense
			)
		);
	};

	const deleteExpense = (id: string) => {
		setExpenses(expenses.filter((expense) => expense.id !== id));
	};

	const updateUser = (updatedUser: Partial<User>) => {
		if (user) {
			setUser({ ...user, ...updatedUser });
		}
	};

	const getTotalBalance = () => {
		const totalExpenses = getTotalExpenses();
		const monthlyIncome = user?.monthlySalary || 0;
		return monthlyIncome - totalExpenses;
	};

	const getTotalIncome = () => {
		return user?.monthlySalary || 0;
	};

	const getTotalExpenses = () => {
		return expenses.reduce((total, expense) => total + expense.amount, 0);
	};

	return (
		<ExpenseContext.Provider
			value={{
				expenses,
				user,
				addExpense,
				updateExpense,
				deleteExpense,
				updateUser,
				getTotalBalance,
				getTotalIncome,
				getTotalExpenses,
			}}
		>
			{children}
		</ExpenseContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useExpense() {
	const context = useContext(ExpenseContext);
	if (context === undefined) {
		throw new Error("useExpense must be used within an ExpenseProvider");
	}
	return context;
}
