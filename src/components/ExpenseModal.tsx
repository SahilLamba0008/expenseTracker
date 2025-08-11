import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { expenseSchema, type ExpenseFormData } from "@/lib/validations";
import type { Expense } from "@/lib/types";
import { useExpense } from "@/providers/ExpenseProvider";

interface ExpenseModalProps {
	isOpen: boolean;
	onClose: () => void;
	expense?: Expense;
	mode: "add" | "edit";
}

const categories = [
	"Food & Dining",
	"Transportation",
	"Shopping",
	"Entertainment",
	"Bills & Utilities",
	"Healthcare",
	"Travel",
	"Education",
	"Other",
];

export function ExpenseModal({
	isOpen,
	onClose,
	expense,
	mode,
}: ExpenseModalProps) {
	const { addExpense, updateExpense } = useExpense();

	const form = useForm<ExpenseFormData>({
		resolver: zodResolver(expenseSchema),
		defaultValues: {
			title: expense?.title || "",
			amount: expense?.amount,
			date: expense?.date || new Date().toISOString().split("T")[0],
			category: expense?.category || "",
			description: expense?.description || "",
		},
	});

	const onSubmit = async (data: ExpenseFormData) => {
		try {
			if (mode === "edit" && expense) {
				await updateExpense(expense.id, data);
				toast.success("Expense updated successfully!", {
					description: `${data.title} has been updated.`,
				});
			} else {
				await addExpense(data);
				toast.success("Expense added successfully!", {
					description: `${data.title} for $${data.amount.toFixed(
						2
					)} has been added.`,
				});
			}

			form.reset();
			onClose();
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unexpected error occurred";

			toast.error(
				mode === "edit" ? "Failed to update expense" : "Failed to add expense",
				{
					description: errorMessage,
				}
			);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "edit" ? "Edit Expense" : "Add New Expense"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter expense title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											placeholder="0.00"
											{...field}
											onChange={(e) =>
												field.onChange(Number.parseFloat(e.target.value))
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description (Optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter expense description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end space-x-2">
							<Button type="button" variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit" disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting
									? mode === "edit"
										? "Updating..."
										: "Adding..."
									: (mode === "edit" ? "Update" : "Add") + " Expense"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
