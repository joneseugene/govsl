import TransparencyPage from '@/components/section/InfoSection/TransparencyPage';

export const metadata = {
  title: 'Transparency | Government of Sierra Leone Official Portal',
  description:
    'Learn about transparency initiatives, public accountability, access to information, and open government practices of Sierra Leone.',
};

export default function Transparency() {
  return (
    <main>
      <h1 className="sr-only">Government of Sierra Leone Transparency Information</h1>

      <TransparencyPage />
    </main>
  );
}
