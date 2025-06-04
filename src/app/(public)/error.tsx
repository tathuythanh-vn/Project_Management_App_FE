'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Authentication Error</h2>
                <p className="text-gray-600 mb-4">{error.message || 'An unexpected error occurred during authentication'}</p>
                <div className="space-x-4">
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Try again
                    </button>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
} 