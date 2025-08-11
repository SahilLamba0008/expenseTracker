import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import App from "./App";
import { ExpenseProvider } from "./providers/ExpenseProvider";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<ExpenseProvider>
				<App />
				<Toaster />
			</ExpenseProvider>
		</ThemeProvider>
	</React.StrictMode>
);
