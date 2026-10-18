import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import Home from '@/pages/Home'

// Home is eagerly loaded for the fastest first paint; other pages are split.
const pageLoaders = {
  [ROUTES.healthcare.path]: () => import('@/pages/Healthcare'),
  [ROUTES.wellness.path]: () => import('@/pages/Wellness'),
  [ROUTES.corporate.path]: () => import('@/pages/CorporateWellness'),
  [ROUTES.experts.path]: () => import('@/pages/Experts'),
  [ROUTES.about.path]: () => import('@/pages/About'),
  [ROUTES.contact.path]: () => import('@/pages/Contact'),
  [ROUTES.disclaimer.path]: () => import('@/pages/Disclaimer'),
}
const loadNotFound = () => import('@/pages/NotFound')

const Healthcare = lazy(pageLoaders[ROUTES.healthcare.path])
const Wellness = lazy(pageLoaders[ROUTES.wellness.path])
const CorporateWellness = lazy(pageLoaders[ROUTES.corporate.path])
const Experts = lazy(pageLoaders[ROUTES.experts.path])
const About = lazy(pageLoaders[ROUTES.about.path])
const Contact = lazy(pageLoaders[ROUTES.contact.path])
const Disclaimer = lazy(pageLoaders[ROUTES.disclaimer.path])
const NotFound = lazy(loadNotFound)

/**
 * Loads the code for `pathname` ahead of hydration, so prerendered HTML is
 * hydrated in place instead of flashing the Suspense fallback.
 */
export function preloadRoute(pathname: string): Promise<unknown> {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  if (path === ROUTES.home.path) return Promise.resolve()
  return (pageLoaders[path] ?? loadNotFound)()
}

export function App() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-[70vh] outline-none">
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path={ROUTES.home.path} element={<Home />} />
            <Route path={ROUTES.healthcare.path} element={<Healthcare />} />
            <Route path={ROUTES.wellness.path} element={<Wellness />} />
            <Route path={ROUTES.corporate.path} element={<CorporateWellness />} />
            <Route path={ROUTES.experts.path} element={<Experts />} />
            <Route path={ROUTES.about.path} element={<About />} />
            <Route path={ROUTES.contact.path} element={<Contact />} />
            <Route path={ROUTES.disclaimer.path} element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  )
}
