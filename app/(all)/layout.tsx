'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/layout/header/page'
import Footer from '@/components/layout/footer/page'
import { homeNavLinks } from '@/libs/consts/nav.const'

export default function AllLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    if (page === '/' || page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (page.startsWith('/')) {
      router.push(page)
    } else {
      router.push(`/${page}`)
    }
  }

  return (
    <>
      {/* HEADER */}
      <Header links={homeNavLinks} onNavigate={handleNavigate} />

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />
    </>
  )
}