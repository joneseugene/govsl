import ErrorClient from '@/components/pages/ErrorClient.page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Page Error | Government of Sierra Leone',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ErrorPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <ErrorClient />
      </Suspense>
    </main>
  );
}
