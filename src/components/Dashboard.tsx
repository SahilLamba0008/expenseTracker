import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpense } from "@/providers/ExpenseProvider";
import { ExpenseSummary } from "./ExpenseSummary";
import { ExpenseCard } from "./ExpenseCard";
import { ApiDemo } from "./ApiDemo";
import { ExpenseModal } from "./ExpenseModal";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function Dashboard() {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const { expenses } = useExpense();

	return (
		<div className="bg-background mt-10">
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
						<p className="text-muted-foreground">
							Track your expenses and manage your budget
						</p>
					</div>
					<Button onClick={() => setIsAddModalOpen(true)}>
						<Plus className="mr-2 h-4 w-4" />
						Add Expense
					</Button>
				</div>

				<div className="space-y-8">
					<ExpenseSummary />

					<div className="grid gap-6 md:grid-cols-2">
						<Card className="h-[600px]">
							<div className="flex justify-between items-center px-4">
								<CardTitle className="text-xl font-semibold text-foreground">
									Recent Expenses
								</CardTitle>
								<span className="text-sm text-muted-foreground">
									{expenses.length} total
								</span>
							</div>
							<CardContent className="space-y-4 h-full overflow-auto px-4 py-3">
								{expenses.length === 0 ? (
									<div className="text-center py-8 text-muted-foreground">
										No expenses yet. Add your first expense to get started!
									</div>
								) : (
									expenses
										.sort(
											(a, b) =>
												new Date(b.date).getTime() - new Date(a.date).getTime()
										)
										.map((expense) => (
											<ExpenseCard key={expense.id} expense={expense} />
										))
								)}
							</CardContent>
						</Card>
						<ApiDemo />
					</div>
				</div>
			</div>

			<ExpenseModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				mode="add"
			/>
		</div>
	);
}
