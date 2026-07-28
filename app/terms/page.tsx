import TermsPage from '@/components/section/InfoSection/TermsPage';

export const metadata = {
  title: 'Terms and Conditions | Government of Sierra Leone Official Portal',
  description:
    'Read the terms and conditions governing the use of the Government of Sierra Leone official portal, services, and published information.',
};

export default function Terms() {
  return (
    <main>
      <h1 className="sr-only">
        Terms and Conditions for Government of Sierra Leone Official Portal
      </h1>

      <TermsPage />
    </main>
  );
}
