'use client';

import Header from '@/components/layout/header/page';
import Footer from '@/components/layout/footer/page';
import { homeNavLinks } from '@/libs/consts/nav.const';

export default function AllLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* HEADER */}
      <Header links={homeNavLinks} />

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
