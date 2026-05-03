'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function ErrorPage() {
  const params = useSearchParams();
  const router = useRouter();

  const message = params.get('message') || 'Something went wrong';

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Something went wrong</h1>

        <button onClick={() => router.back()} className="px-4 py-2 bg-green-600 text-white rounded">
          Try Again
        </button>
      </div>
    </div>
  );
}
