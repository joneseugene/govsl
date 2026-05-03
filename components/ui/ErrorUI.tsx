'use client';

import { useRouter } from 'next/navigation';

interface ErrorUIProps {
    title?: string;
    message?: string;
    retryPath?: string;
    showRetry?: boolean;
}

export default function ErrorUI({
    title = 'Something went wrong',
    message = "We couldn't load the requested data.",
    retryPath,
    showRetry = true,
}: ErrorUIProps) {
    const router = useRouter();

    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-xl font-bold mb-2">{title}</h1>
                <p className="text-gray-600 mb-6">{message}</p>

                {showRetry && (
                    <button
                        onClick={() =>
                            retryPath ? router.push(retryPath) : router.refresh()
                        }
                        className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}