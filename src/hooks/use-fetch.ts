import {useCallback, useEffect, useState} from "react";
import {ApiResponse, ApiResponseData, ApiResponseOptions, defaultApiResponseOptions} from "@/model/api-response";

export default function useFetch<T>(fetchFn: () => Promise<Response>, initialValue: T[]) {
    const [dataFetched, setDataFetched] = useState<T[]>(initialValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<ApiResponseOptions>(defaultApiResponseOptions)
    const [error, setError] = useState<string>('')

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError("")
        try {
            const response = await fetchFn();

            const result: ApiResponse<T> = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            setDataFetched(result.data.data);
        } catch (error) {
            setDataFetched([])
            setError(error instanceof Error ? error.message : 'An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }, [fetchFn])

    useEffect(() => {
        fetchData()
    }, [fetchFn])

    return {
        dataFetched,
        isLoading,
        options,
        error,
        refetch: fetchData
    }
}