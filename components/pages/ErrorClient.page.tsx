'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ErrorClient() {
  const params = useSearchParams();
  const router = useRouter();

  const message = params.get('message') || 'Something went wrong. Please try again.';

  return (
    <main
      className="
        flex min-h-screen
        items-center
        justify-center
        bg-gray-50
        px-5
      "
    >
      <section
        aria-labelledby="error-heading"
        className="
          max-w-md
          text-center
        "
      >
        <h1
          id="error-heading"
          className="
            mb-3
            text-2xl
            font-bold
            text-[#003366]
          "
        >
          {message}
        </h1>

        <p
          className="
            mb-6
            text-gray-600
          "
        >
          We were unable to complete your request. Please try again or return to the homepage.
        </p>

        <div
          className="
            flex
            justify-center
            gap-3
          "
        >
          <button
            onClick={() => router.back()}
            className="
              rounded
              bg-[#008A3C]
              px-5
              py-2
              text-white
              transition
              hover:bg-[#006b2f]
            "
          >
            Try Again
          </button>

          <Link
            href="/"
            className="
              rounded
              border
              border-[#003366]
              px-5
              py-2
              text-[#003366]
              transition
              hover:bg-gray-100
            "
          >
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
