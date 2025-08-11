import { useState, useEffect } from "react";
import axios from "axios";
import type { ApiResponse } from "@/lib/types";

export function useFetch<T>(url: string): ApiResponse<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await axios.get(url);
				setData(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		};

		if (url) {
			fetchData();
		}
	}, [url]);

	return { data: data as T, loading, error };
}
