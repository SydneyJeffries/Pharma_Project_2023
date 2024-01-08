/* eslint-disable no-debugger */
import { useState, useEffect } from 'react';

const baseURL = import.meta.env.VITE_BASE_URL;

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const abortCon = new AbortController();

        fetch(baseURL + url, { signal: abortCon.signal })
            .then(res => {
                if (!res.ok) {
                    setError(true);
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(false);
            })
            .catch(err => {
                if (err.name == "AbortError") {
                    console.log('fetch aborted')
                    setIsLoading(true);
                    setError(false);
                } else {
                    setIsLoading(false);
                    setError(true);
                }
                console.log(err.message);
            })
        return () => abortCon.abort();
    }, [url])

    return { data, isLoading, error };
}

export default useFetch;