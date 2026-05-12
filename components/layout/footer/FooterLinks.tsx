'use client';

interface FooterLink {
  label: string;
  page: string;
}

interface FooterLinksProps {
  links: FooterLink[];
  onNavigate: (page: string) => void;
}

export function FooterLinks({ links, onNavigate }: FooterLinksProps) {
  return (
    <nav className="mb-12 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-10">
      {links.map(({ label, page }) => (
        <button
          key={page}
          onClick={() => onNavigate(page)}
          className="text-left text-[#1e60aa] transition hover:text-[#003366]"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
