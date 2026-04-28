// components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { LOGO } from '@/libs/consts/nav.const'
import { usePathname, useRouter } from 'next/navigation'
import { homeSections } from '@/libs/consts/home.const'

type Link = { label: string; id: string; key: string }

interface Props {
    links: Link[]
    onNavigate?: (page: string) => void
}

export default function Header({ links, onNavigate }: Props) {
    const [active, setActive] = useState('')
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const isHomePage = pathname === '/' || pathname === '/home'

    // Close mobile menu when active link changes
    useEffect(() => setOpen(false), [active])

    // Update active link when route changes
    useEffect(() => {
        if (isHomePage) {
            const sectionLink = links.find((link) => pathname.includes(link.key))
            setActive(sectionLink?.id ?? '')
        } else {
            const matchedSection = Object.entries(homeSections).find(
                ([, section]) =>
                    section.routes.all === pathname || section.routes.detail('').startsWith(pathname)
            )
            if (matchedSection) setActive(matchedSection[1].id)
        }
    }, [pathname, isHomePage, links])

    const handleNavigate = (link: Link) => {
        if (isHomePage) {
            scrollToSection(link.id)
        } else {
            navigateToPage(link.key)
        }
    }

    const scrollToSection = (id: string) => {
        setActive(id)
        if (!id) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        const el = document.getElementById(id)
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 88
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    const navigateToPage = (key: string) => {
        const section = homeSections[key as keyof typeof homeSections]

        if (!section) {
            const route = `/${key}`
            if (onNavigate) onNavigate(route)
            else router.push(route)
            return
        }

        let route: string
        const routes = section.routes

        if ('all' in routes) route = routes.all
        else route = `/${section.id}`

        if (onNavigate) onNavigate(route)
        else router.push(route)
    }

    return (
        <>
            <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 border-t-4 border-[#003366]">
                <div className="mx-auto max-w-6xl px-5 md:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <button
                            onClick={() => {
                                if (isHomePage) {
                                    scrollToSection('')
                                } else {
                                    router.push('/')
                                }
                            }}
                            className="flex items-center gap-3.5 focus:outline-none focus:ring-2 focus:ring-[#003366]/40 rounded transition hover:cursor-pointer"
                            aria-label="Government of Sierra Leone – Home"
                        >
                            <div className="relative h-10 w-10 shrink-0">
                                <Image
                                    src={LOGO.coatOfArms.src}
                                    alt={LOGO.coatOfArms.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-3xl font-black tracking-tight text-[#003366]">GOV.SL</span>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-9">
                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => handleNavigate(link)}
                                    className={`relative font-regular text-sm transition-colors hover:text-[#003366] ${active === link.id
                                        ? 'text-[#003366] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#008A3C] after:rounded'
                                        : 'text-gray-700'
                                        }`}
                                >
                                    {link.label}
                                    {!isHomePage && (
                                        <span className="ml-1.5 text-xs text-gray-400 font-normal">
                                            ↗
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-[#003366] focus:outline-none focus:ring-2 focus:ring-[#003366]/40 rounded"
                            onClick={() => setOpen(true)}
                            aria-label="Open navigation menu"
                            aria-expanded={open}
                        >
                            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Green accent bar */}
                <div className="h-1 bg-[#008A3C]" />
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-50 transition-opacity md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
            >
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />
                <div
                    className={`absolute right-0 top-0 h-full w-72 bg-[#003366] text-white shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex items-center justify-between border-b border-white/15 p-6">
                        <span className="text-xl font-bold">Menu</span>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close menu"
                            className="p-2 rounded hover:bg-white/10 transition"
                        >
                            <svg className="h-7 w-7" fill="none" stroke="white" strokeWidth="2">
                                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2 p-5">
                        {links.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavigate(link)}
                                className={`rounded-lg px-5 py-4 text-left text-lg font-medium transition ${active === link.id ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{link.label}</span>
                                    {!isHomePage && <span className="text-sm opacity-70">↗</span>}
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}
