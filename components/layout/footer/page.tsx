'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { footerNavLinks, LOGO } from '@/libs/consts/nav.const';
import { FooterLinks } from './FooterLinks';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="border-t-2 border-[#003366]/20 bg-[#f8f8f8] text-[#0b0c0c]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        {/* Branding */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-4">
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
        <FooterLinks links={footerNavLinks} />
      </div>

      {/* Green accent bar */}
      <div className="h-1.5 bg-[#008A3C]" />
    </footer>
  );
}
