import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import Home from '@/pages/Home'

// Home is eagerly loaded for the fastest first paint; other pages are split.
const Healthcare = lazy(() => import('@/pages/Healthcare'))
const Wellness = lazy(() => import('@/pages/Wellness'))
const CorporateWellness = lazy(() => import('@/pages/CorporateWellness'))
const Experts = lazy(() => import('@/pages/Experts'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
