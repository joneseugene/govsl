import ErrorClient from '@/components/pages/ErrorClient.page';
import { Suspense } from 'react';

export default function ErrorPage() {
  return (
    <Suspense fallback={null}>
      <ErrorClient />
    </Suspense>
  );
}
