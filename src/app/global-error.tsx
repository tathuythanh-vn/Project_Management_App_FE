'use client'

import { useEffect } from 'react'

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
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                        <p className="text-gray-600 mb-4">{error.message || 'An unexpected error occurred'}</p>
                        <button
                            onClick={() => reset()}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
} 