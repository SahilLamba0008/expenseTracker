import { Moon, Sun, Home, User, NotebookPen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";

export function Navbar() {
	const { theme, toggleTheme } = useTheme();
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<nav className="border-b border-border bg-card fixed top-0 left-0 w-full z-50">
			<div className="max-w-7xl mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-6">
						<Link
							to="/"
							className="text-xl font-bold text-foreground flex items-center gap-1 whitespace-nowrap"
						>
							<NotebookPen /> Expense Tracker
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						{/* Desktop Navigation Links - Hidden on mobile/tablet */}
						<div className="hidden md:flex space-x-4">
							<Link
								to="/"
								className={cn(
									"flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
									pathname === "/"
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:text-foreground hover:bg-muted"
								)}
							>
								<Home className="h-4 w-4" />
								<span>Dashboard</span>
							</Link>
							<Link
								to="/profile"
								className={cn(
									"flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
									pathname === "/profile"
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:text-foreground hover:bg-muted"
								)}
							>
								<User className="h-4 w-4" />
								<span>Profile</span>
							</Link>
						</div>

						<Button
							variant="ghost"
							size="icon"
							onClick={toggleTheme}
							className="h-9 w-9"
						>
							{theme === "light" ? (
								<Moon className="h-4 w-4" />
							) : (
								<Sun className="h-4 w-4" />
							)}
						</Button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 md:hidden"
								>
									<Menu className="h-4 w-4" />
									<span className="sr-only">Open menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem asChild>
									<Link
										to="/"
										className={cn(
											"flex items-center space-x-2 w-full",
											pathname === "/" && "bg-accent"
										)}
									>
										<Home className="h-4 w-4" />
										<span>Dashboard</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										to="/profile"
										className={cn(
											"flex items-center space-x-2 w-full",
											pathname === "/profile" && "bg-accent"
										)}
									>
										<User className="h-4 w-4" />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
}
