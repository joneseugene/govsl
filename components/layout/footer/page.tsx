// components/Footer.tsx
import Image from 'next/image'
import { footerNavLinks, LOGO } from '@/libs/consts/nav.const'
import sierraLeoneFlag from '@/sierra-leone-flag.svg'

interface FooterProps {
    onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
    return (
        <footer className="bg-[#f8f8f8] border-t-2 border-[#003366]/20 text-[#0b0c0c]">
            <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
                {/* Branding */}
                <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-[#003366]/50 rounded transition"
                        aria-label="Government of Sierra Leone – Home"
                    >
                        <div className="relative h-12 w-auto min-w-20">
                            <Image
                                src={LOGO.coatOfArms.src}
                                alt={LOGO.coatOfArms.alt}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div className="relative h-9 w-auto min-w-15">
                            <Image
                                src={LOGO.flag.src}
                                alt={LOGO.flag.alt}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        <span className="text-xl font-bold text-[#003366]">GOV.SL</span>
                    </button>

                    <p className="text-sm text-gray-600 sm:text-right">
                        Serving Sierra Leone with integrity and progress
                    </p>
                </div>

                {/* Links */}
                <nav className="mb-12 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-10">
                    {footerNavLinks.map(({ label, page }) => (
                        <button
                            key={page}
                            onClick={() => onNavigate(page)}
                            className="text-left text-[#1e60aa] hover:text-[#003366] hover:underline focus-visible:underline focus:outline-none focus:ring-2 focus:ring-[#003366]/40 transition"
                        >
                            {label}
                        </button>
                    ))}
                </nav>

                {/* Legal */}
                <div className="flex flex-col gap-4 border-t border-gray-300 pt-8 text-sm sm:flex-row sm:justify-between sm:items-center">
                    <p className="text-gray-600">
                        © {new Date().getFullYear()} Government of Sierra Leone. All rights reserved.
                    </p>

                    <button
                        onClick={() => onNavigate('login')}
                        className="text-[#1e60aa] hover:text-[#003366] hover:underline focus:outline-none focus:ring-2 focus:ring-[#003366]/40 transition font-medium"
                    >
                        Admin Sign In →
                    </button>
                </div>
            </div>

            {/* Green accent bar – visually links to header */}
            <div className="h-1.5 bg-[#008A3C]" />
        </footer>
    )
}