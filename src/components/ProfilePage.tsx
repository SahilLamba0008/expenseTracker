import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { userSchema, type UserFormData } from "@/lib/validations";
import { useExpense } from "@/providers/ExpenseProvider";

export default function ProfilePage() {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const { user, updateUser, expenses, getTotalBalance, getTotalExpenses } =
		useExpense();

	const form = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			monthlySalary: user?.monthlySalary || 0,
		},
	});

	const onSubmit = async (data: UserFormData) => {
		try {
			await updateUser(data);

			toast.success("Profile updated successfully!", {
				description: `Your profile information has been updated.`,
			});

			setIsEditModalOpen(false);
			form.reset(data); // Reset form with new data to prevent stale state
		} catch (error) {
			// Handle different types of errors
			const errorMessage =
				error instanceof Error ? error.message : "An unexpected error occurred";

			toast.error("Failed to update profile", {
				description: errorMessage,
			});
		}
	};

	const expenseHistory = expenses
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 10);

	return (
		<div className="bg-background mt-10">
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-foreground">Profile</h1>
						<p className="text-muted-foreground">
							Manage your account and view your financial summary
						</p>
					</div>
					<Button onClick={() => setIsEditModalOpen(true)}>
						<Edit className="mr-2 h-4 w-4" />
						Edit Profile
					</Button>
				</div>
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Personal Information</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="text-sm font-medium text-muted-foreground">
										Name
									</label>
									<p className="text-lg font-semibold">{user?.name}</p>
								</div>
								<div>
									<label className="text-sm font-medium text-muted-foreground">
										Email
									</label>
									<p className="text-lg">{user?.email}</p>
								</div>
								<div>
									<label className="text-sm font-medium text-muted-foreground">
										Monthly Salary
									</label>
									<p className="text-lg font-semibold text-green-600">
										${user?.monthlySalary.toFixed(2)}
									</p>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Financial Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-muted-foreground">Total Balance</span>
									<span
										className={`font-semibold ${
											getTotalBalance() >= 0 ? "text-green-600" : "text-red-600"
										}`}
									>
										${getTotalBalance().toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-muted-foreground">Total Expenses</span>
									<span className="font-semibold text-red-600">
										${getTotalExpenses().toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-muted-foreground">
										Total Transactions
									</span>
									<span className="font-semibold">{expenses.length}</span>
								</div>
							</CardContent>
						</Card>
					</div>
					<Card className="h-[506px]">
						<CardHeader>
							<CardTitle>Recent Expense History</CardTitle>
						</CardHeader>
						<CardContent className="overflow-auto space-y-3 px-4 py-3">
							{expenseHistory.length === 0 ? (
								<p className="text-center text-muted-foreground py-4">
									No expense history available
								</p>
							) : (
								expenseHistory.map((expense) => (
									<div
										key={expense.id}
										className="flex items-center justify-between p-3 border border-border rounded-lg"
									>
										<div className="flex-1">
											<div className="flex items-center space-x-2">
												<p className="font-medium">{expense.title}</p>
												<Badge variant="secondary" className="text-xs">
													{expense.category}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">
												{new Date(expense.date).toLocaleDateString()}
											</p>
										</div>
										<p className="font-semibold text-red-600">
											-${expense.amount.toFixed(2)}
										</p>
									</div>
								))
							)}
						</CardContent>
					</Card>
				</div>
			</div>

			<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Profile</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter your name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="monthlySalary"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Monthly Salary</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.01"
												placeholder="0.00"
												{...field}
												onChange={(e) =>
													field.onChange(Number.parseFloat(e.target.value) || 0)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end space-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsEditModalOpen(false)}
									disabled={form.formState.isSubmitting}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting
										? "Updating..."
										: "Update Profile"}
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
