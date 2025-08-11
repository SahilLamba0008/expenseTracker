import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import Dashboard from "./components/Dashboard";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<main className="max-w-7xl mx-auto p-4">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
