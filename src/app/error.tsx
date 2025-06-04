'use client'

import {useEffect} from 'react'
import ErrorPage from "@/components/error/error-page";

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
            <ErrorPage/>
        </div>
        </body>
    )
} 