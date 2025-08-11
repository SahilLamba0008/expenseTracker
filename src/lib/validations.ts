import { z } from "zod";

export const expenseSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title too long"),
	amount: z.number().min(0.01, "Amount must be greater than 0"),
	date: z.string().min(1, "Date is required"),
	category: z.string().min(1, "Category is required"),
	description: z.string().optional(),
});

export const userSchema = z.object({
	name: z.string().min(1, "Name is required").max(50, "Name too long"),
	email: z.string().email("Invalid email address"),
	monthlySalary: z.number().min(0, "Salary must be positive"),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type UserFormData = z.infer<typeof userSchema>;
