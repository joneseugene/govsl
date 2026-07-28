import ContactPage from '@/components/section/InfoSection/ContactPage';

export const metadata = {
  title: 'Contact Government of Sierra Leone | Official Portal',
  description:
    'Contact the Government of Sierra Leone for inquiries, support, public services, and official information.',
};

export default function Contact() {
  return (
    <main>
      <h1 className="sr-only">Contact Government of Sierra Leone</h1>

      <ContactPage />
    </main>
  );
}
