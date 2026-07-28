import AccessibilityPage from '@/components/section/InfoSection/AccessibilityPage';

export const metadata = {
  title: 'Accessibility | Government of Sierra Leone Official Portal',
  description:
    'Learn about accessibility features and standards implemented by the Government of Sierra Leone portal to ensure information and services are available to all users.',
};

export default function Accessibility() {
  return (
    <main>
      <h1 className="sr-only">Accessibility Statement for Government of Sierra Leone Portal</h1>

      <AccessibilityPage />
    </main>
  );
}
