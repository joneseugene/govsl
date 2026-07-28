import AboutPage from '@/components/section/InfoSection/AboutPage';

export const metadata = {
  title: 'About Government of Sierra Leone | Official Portal',
  description:
    'Learn about the Government of Sierra Leone, its mission, institutions, leadership, and commitment to providing public services and information.',
};

export default function About() {
  return (
    <main>
      <h1 className="sr-only">About the Government of Sierra Leone</h1>

      <AboutPage />
    </main>
  );
}
