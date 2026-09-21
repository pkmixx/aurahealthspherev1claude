import { useDocumentMeta } from '@/lib/hooks'
import { ButtonLink } from '@/components/Button'
import { OrbitRings } from '@/components/OrbitRings'

export default function NotFound() {
  useDocumentMeta('Page not found | AURASPHERE Wellness 360', 'The page you are looking for could not be found.')
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden px-4 pt-28 pb-16 text-center">
      <OrbitRings className="absolute top-1/2 left-1/2 -z-10 w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div>
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">This page is out of orbit.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you're looking for doesn't exist or has moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 xs:flex-row">
          <ButtonLink to="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
