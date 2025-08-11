import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense } from "@/providers/ExpenseProvider";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export function ExpenseSummary() {
	const { getTotalBalance, getTotalIncome, getTotalExpenses } = useExpense();

	const balance = getTotalBalance();
	const income = getTotalIncome();
	const expenses = getTotalExpenses();

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Balance</CardTitle>
					<Wallet className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div
						className={`text-2xl font-bold ${
							balance >= 0 ? "text-green-600" : "text-red-600"
						}`}
					>
						${balance.toFixed(2)}
					</div>
					<p className="text-xs text-muted-foreground">
						{balance >= 0 ? "Available balance" : "Overspent"}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
					<TrendingUp className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-green-600">
						${income.toFixed(2)}
					</div>
					<p className="text-xs text-muted-foreground">Monthly salary</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
					<TrendingDown className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-red-600">
						${expenses.toFixed(2)}
					</div>
					<p className="text-xs text-muted-foreground">This month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{income > 0 ? ((balance / income) * 100).toFixed(1) : "0.0"}%
					</div>
					<p className="text-xs text-muted-foreground">Of monthly income</p>
				</CardContent>
			</Card>
		</div>
	);
}
