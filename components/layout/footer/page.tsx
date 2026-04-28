'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { footerNavLinks, LOGO } from '@/libs/consts/nav.const';

export default function Footer() {
  const router = useRouter();

  const onNavigate = (page: string) => {
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page.startsWith('/')) {
      router.push(page);
    } else {
      router.push(`/${page}`);
    }
  };

  return (
    <footer className="bg-[#f8f8f8] border-t-2 border-[#003366]/20 text-[#0b0c0c]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        {/* Branding */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-4">
            {/* Coat of Arms */}
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <Image
                src={LOGO.coatOfArms.src}
                alt={LOGO.coatOfArms.alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Flag */}
            <div className="relative h-10 w-14 sm:h-12 sm:w-16">
              <Image
                src={LOGO.flag.src}
                alt={LOGO.flag.alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Text */}
            <span className="text-xl font-bold text-[#003366]">GOV.SL</span>
          </button>
        </div>

        {/* Links */}
        <nav className="mb-12 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-10">
          {footerNavLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="text-left text-[#1e60aa] hover:text-[#003366] transition"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Green accent bar */}
      <div className="h-1.5 bg-[#008A3C]" />
    </footer>
  );
}
