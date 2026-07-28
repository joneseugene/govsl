import PrivacyPage from '@/components/section/InfoSection/PrivacyPage';

export const metadata = {
  title: 'Privacy Policy | Government of Sierra Leone Official Portal',
  description:
    'Read the Government of Sierra Leone official portal privacy policy, including information about data collection, usage, protection, and user rights.',
};

export default function Privacy() {
  return (
    <main>
      <h1 className="sr-only">Privacy Policy for Government of Sierra Leone Official Portal</h1>

      <PrivacyPage />
    </main>
  );
}
