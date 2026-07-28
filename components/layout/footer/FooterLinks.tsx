import Link from 'next/link';

interface FooterLink {
  label: string;
  page: string;
}

interface FooterLinksProps {
  links: FooterLink[];
}

export function FooterLinks({ links }: FooterLinksProps) {
  return (
    <nav
      aria-label="Footer navigation"
      className="mb-12 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-10"
    >
      {links.map(({ label, page }) => (
        <Link
          key={page}
          href={page}
          className="text-left text-[#1e60aa] transition hover:text-[#003366]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
