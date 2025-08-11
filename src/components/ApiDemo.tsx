import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFetch } from "@/hooks/useFetch";

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
}

export function ApiDemo() {
	const {
		data: users,
		loading,
		error,
	} = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

	if (loading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>API Demo - Users</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{[...Array(5)].map((_, i) => (
							<Skeleton key={i} className="h-4 w-full" />
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>API Demo - Users</CardTitle>
				</CardHeader>
				<CardContent>
					<Alert variant="destructive">
						<AlertDescription>Error loading users: {error}</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="h-[600px]">
			<CardHeader>
				<CardTitle>API Demo - Users (useFetch Hook)</CardTitle>
			</CardHeader>
			<CardContent className="overflow-auto space-y-2 px-4 py-3">
				{users?.map((user) => (
					<div key={user.id} className="p-2 border border-border rounded">
						<p className="font-medium">{user.name}</p>
						<p className="text-sm text-muted-foreground">{user.email}</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
