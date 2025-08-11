import { useState } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Expense } from "@/lib/types";
import { useExpense } from "@/providers/ExpenseProvider";
import { ExpenseModal } from "./ExpenseModal";
import { toast } from "sonner";

interface ExpenseCardProps {
	expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const { deleteExpense } = useExpense();

	const handleDelete = () => {
		deleteExpense(expense.id);
		toast.success("Expense deleted successfully!", {
			description: `${expense.title} has been delete.`,
		});
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<>
			<Card className="hover:shadow-md transition-shadow">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<div className="flex items-center space-x-2">
						<h3 className="font-semibold text-card-foreground">
							{expense.title}
						</h3>
						<Badge variant="secondary">{expense.category}</Badge>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<MoreHorizontal className="h-4 w-4" />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
								<Edit className="mr-2 h-4 w-4" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleDelete}
								className="text-destructive"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between items-center">
						<div>
							<p className="text-2xl font-bold text-destructive">
								${expense.amount.toFixed(2)}
							</p>
							<p className="text-sm text-muted-foreground">
								{formatDate(expense.date)}
							</p>
						</div>
					</div>
					{expense.description && (
						<p className="text-sm text-muted-foreground mt-2">
							{expense.description}
						</p>
					)}
				</CardContent>
			</Card>

			<ExpenseModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				expense={expense}
				mode="edit"
			/>
		</>
	);
}
