import LicencePage from '@/components/section/InfoSection/LicencePage';

export const metadata = {
  title: 'Website Licence | Government of Sierra Leone Official Portal',
  description:
    'View the licence information, terms of use, and conditions governing the use of the Government of Sierra Leone official portal.',
};

export default function Licence() {
  return (
    <main>
      <h1 className="sr-only">Government of Sierra Leone Portal Licence Information</h1>

      <LicencePage />
    </main>
  );
}
