import { useLocation } from 'react-router-dom'
import { FAQS } from '@/data/faqs'
import { AccordionItem } from './Accordion'
import { SectionHeading } from './SectionHeading'

interface FAQSectionProps {
  /** Defaults to the current route's FAQs. */
  path?: string
  title?: string
  className?: string
}

/**
 * Visible FAQ for a page. The same entries are emitted as FAQPage JSON-LD
 * (config/seo.ts), so questions and answers must stay identical — both read
 * from data/faqs.ts. Answers are always in the HTML, even when collapsed.
 */
export function FAQSection({ path, title = 'Frequently asked questions', className = '' }: FAQSectionProps) {
  const { pathname } = useLocation()
  const faqs = FAQS[path ?? pathname]
  if (!faqs?.length) return null

  return (
    <section aria-labelledby="faq-heading" className={`section-y ${className}`}>
      <div className="container-x">
        <SectionHeading id="faq-heading" eyebrow="FAQ" title={title} align="center" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line-soft/70 border-y border-line-soft/70 sm:mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={f.question} title={f.question} defaultOpen={i === 0}>
              <p className="pb-6 text-[1.0625rem] leading-relaxed text-silver/85">{f.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  )
}
