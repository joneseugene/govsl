import HelpPage from '@/components/section/InfoSection/HelpPage';

export const metadata = {
  title: 'Help and Support | Government of Sierra Leone Official Portal',
  description:
    'Find help and support information for using the Government of Sierra Leone portal, accessing services, and finding official information.',
};

export default function Help() {
  return (
    <main>
      <h1 className="sr-only">Help and Support for Government of Sierra Leone Portal</h1>

      <HelpPage />
    </main>
  );
}
