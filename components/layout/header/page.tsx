'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LOGO } from '@/libs/consts/nav.const';
import { usePathname } from 'next/navigation';
import { homeSections } from '@/libs/consts/home.const';

type NavLink = {
  label: string;
  id: string;
  key: string;
  href: string;
};

interface Props {
  links: NavLink[];
}

export default function Header({ links }: Props) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const isHomePage = pathname === '/' || pathname === '/home';

  const [activeSection, setActiveSection] = useState('');

  /* ---------------- ACTIVE ROUTE ---------------- */

  const routeActive = useMemo(() => {
    if (isHomePage) return '';

    const matchedSection = Object.entries(homeSections).find(([, section]) => {
      const routes = section.routes;

      if ('all' in routes && pathname.startsWith(routes.all)) {
        return true;
      }

      return false;
    });

    return matchedSection?.[1]?.id ?? '';
  }, [pathname, isHomePage]);

  const active = isHomePage ? activeSection : routeActive;

  /* ---------------- HOME SCROLL ACTIVE ---------------- */

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      let currentSection = '';

      for (const link of links) {
        const element = document.getElementById(link.id);

        if (!element) continue;

        if (
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          currentSection = link.id;
        }
      }

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection));
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage, links]);

  /* ---------------- HOME ANCHOR CLICK ---------------- */

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHomePage || !id) return;

    e.preventDefault();

    const element = document.getElementById(id);

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY - 88;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });

    setOpen(false);
  };

  return (
    <>
      <header
        className="
          sticky top-0 z-50
          border-t-4 border-[#003366]
          bg-white/95
          backdrop-blur-lg
        "
      >
        <div
          className="
          mx-auto max-w-6xl px-5 md:px-8
        "
        >
          <div
            className="
            flex h-20 items-center justify-between
          "
          >
            {/* LOGO */}

            <Link
              href="/"
              aria-label="
                Government of Sierra Leone homepage
              "
              className="
                flex items-center gap-3.5
              "
            >
              <div
                className="
                  relative h-10 w-10 shrink-0
                "
              >
                <Image
                  src={LOGO.coatOfArms.src}
                  alt={LOGO.coatOfArms.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <span
                className="
                  text-3xl font-black
                  tracking-tight
                  text-[#003366]
                "
              >
                GOV.SL
              </span>
            </Link>

            {/* DESKTOP NAVIGATION */}

            <nav
              aria-label="Main navigation"
              className="
                hidden items-center gap-9 md:flex
              "
            >
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={isHomePage ? `/#${link.id}` : link.href}
                  onClick={(e) => handleHomeClick(e, link.id)}
                  className={`
                    relative text-sm
                    transition-colors
                    hover:text-[#003366]

                    ${
                      active === link.id
                        ? `
                          text-[#003366]
                          after:absolute
                          after:-bottom-1
                          after:left-0
                          after:h-0.5
                          after:w-full
                          after:bg-[#008A3C]
                          `
                        : 'text-gray-700'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* MOBILE MENU BUTTON */}

            <button
              className="
                rounded p-2
                text-[#003366]
                focus:outline-none
                focus:ring-2
                focus:ring-[#003366]/40
                md:hidden
              "
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="
                    M4 6h16
                    M4 12h16
                    M4 18h16
                  "
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="
          h-1 bg-[#008A3C]
        "
        />
      </header>

      {/* MOBILE DRAWER */}

      <div
        className={`
          fixed inset-0 z-50
          transition-opacity
          md:hidden

          ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}
        `}
      >
        <div
          className="
            absolute inset-0
            bg-black/50
            backdrop-blur-sm
          "
          onClick={() => setOpen(false)}
        />

        <div
          className={`
            absolute right-0 top-0
            h-full w-72
            bg-[#003366]
            text-white
            shadow-2xl
            transition-transform
            duration-300

            ${open ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div
            className="
              flex items-center justify-between
              border-b border-white/15
              p-6
            "
          >
            <span
              className="
                text-xl font-bold
              "
            >
              Menu
            </span>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="
                rounded p-2
                hover:bg-white/10
              "
            >
              ✕
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="
              flex flex-col gap-2 p-5
            "
          >
            {links.map((link) => (
              <Link
                key={link.id}
                href={isHomePage ? `/#${link.id}` : link.href}
                onClick={(e) => handleHomeClick(e, link.id)}
                className={`
                  rounded-lg px-5 py-4
                  text-lg font-medium

                  ${active === link.id ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
