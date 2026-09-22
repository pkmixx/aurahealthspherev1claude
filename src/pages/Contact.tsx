import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { CONTACT, ENQUIRY_FORM_ENABLED } from '@/config/site'
import { ENQUIRY_INTERESTS, isEnquiryInterest } from '@/data/enquiry'
import { useDocumentMeta } from '@/lib/hooks'
import { formatEnquiry, submitEnquiry, type Enquiry } from '@/services/enquiry'
import { PageHero } from '@/components/PageHero'
import { Button, ButtonAnchor } from '@/components/Button'
import { ContactCard } from '@/components/ContactCard'
import { Reveal } from '@/components/Reveal'
import { HealthDisclaimer } from '@/components/HealthDisclaimer'

type Errors = Partial<Record<keyof Enquiry, string>>

const EMPTY: Enquiry = { name: '', organisation: '', phone: '', email: '', interest: '', message: '' }

function validate(v: Enquiry): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  const digits = v.phone.replace(/\D/g, '')
  if (!digits) e.phone = 'Please enter your phone number.'
  else if (digits.length < 10 || digits.length > 13 || !/^[+\d\s()-]+$/.test(v.phone.trim()))
    e.phone = 'Please enter a valid phone number (at least 10 digits).'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.interest) e.interest = 'Please choose what you are interested in.'
  if (v.message.trim().length < 10) e.message = 'Please tell us a little more (at least 10 characters).'
  if (v.message.length > 1500) e.message = 'Please keep your message under 1500 characters.'
  return e
}

export default function Contact() {
  useDocumentMeta(ROUTES.contact.title, ROUTES.contact.description)
  const [params] = useSearchParams()
  const [values, setValues] = useState<Enquiry>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Enquiry, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')
  const [submitted, setSubmitted] = useState<Enquiry | null>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // Pre-fill from CTA links: /contact?interest=…&topic=…
  useEffect(() => {
    const interest = params.get('interest')
    const topic = params.get('topic')
    setValues((v) => ({
      ...v,
      interest: isEnquiryInterest(interest) ? interest : v.interest,
      message: topic && !v.message ? `I'd like to know more about ${topic}.` : v.message,
    }))
  }, [params])

  useEffect(() => {
    if (status === 'done') successRef.current?.focus()
  }, [status])

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
  }
  const blur = (key: keyof Enquiry) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, phone: true, email: true, interest: true, message: true })
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('submitting')
    await submitEnquiry(values) // Stage 1: no-op, nothing is sent.
    setSubmitted(values)
    setStatus('done')
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setTouched({})
    setSubmitted(null)
    setStatus('idle')
  }

  const errorList = Object.entries(errors) as [keyof Enquiry, string][]
  const showSummary = errorList.length > 0 && Object.keys(touched).length >= 5

  const fieldProps = (key: keyof Enquiry) => ({
    id: `f-${key}`,
    name: key,
    'aria-invalid': touched[key] && errors[key] ? true : undefined,
    'aria-describedby': touched[key] && errors[key] ? `f-${key}-error` : undefined,
    onBlur: () => blur(key),
  })

  const FieldError = ({ k }: { k: keyof Enquiry }) =>
    touched[k] && errors[k] ? (
      <p id={`f-${k}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-[#ff9aa6]">
        <AlertCircle aria-hidden className="size-4 shrink-0" />
        {errors[k]}
      </p>
    ) : null

  const mailto =
    submitted && CONTACT.email
      ? `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${submitted.interest}`)}&body=${encodeURIComponent(formatEnquiry(submitted))}`
      : null

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Tell us what you need. <span className="text-gradient">We'll help.</span>
          </>
        }
        description={
          ENQUIRY_FORM_ENABLED
            ? 'Healthcare, wellness or a corporate program — share a few details and our team will guide you to the right solution.'
            : 'Healthcare, wellness or a corporate program — call or email our team and we will guide you to the right solution.'
        }
      />

      <section id="enquiry" aria-label="Enquiry" className="container-x scroll-mt-24 pb-16 sm:pb-24">
        <div className={ENQUIRY_FORM_ENABLED ? 'grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10' : 'mx-auto max-w-2xl'}>
          {/* Form (hidden while ENQUIRY_FORM_ENABLED is false) */}
          {ENQUIRY_FORM_ENABLED && (
          <Reveal className="card rounded-[1.75rem] p-5 xs:p-6 sm:p-10">
            {status === 'done' && submitted ? (
              <div ref={successRef} tabIndex={-1} className="outline-none" role="status">
                <span className="grid size-14 place-items-center rounded-full bg-cyan/10 text-cyan">
                  <CheckCircle2 aria-hidden className="size-7" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">Thank you, {submitted.name.split(' ')[0]}.</h2>
                <p className="mt-3 text-[1.0625rem] text-silver/85">
                  Your enquiry about <strong className="text-white">{submitted.interest}</strong> is complete and ready.
                </p>
                <div className="mt-6 rounded-2xl border border-line bg-navy-950/60 p-4 text-[0.9375rem] text-silver/90 sm:p-5">
                  <p className="font-medium text-white">Please note</p>
                  <p className="mt-1">
                    Online enquiries are not connected yet, so this form has <strong className="text-white">not been sent</strong>.
                    {CONTACT.email || CONTACT.phone
                      ? ' Please use one of the options below to reach our team directly.'
                      : ' Direct contact details will be published here shortly.'}
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                  {mailto && (
                    <ButtonAnchor href={mailto} arrow>
                      Send via email
                    </ButtonAnchor>
                  )}
                  {CONTACT.phone && (
                    <ButtonAnchor href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} variant="secondary">
                      Call us
                    </ButtonAnchor>
                  )}
                  <Button variant="secondary" onClick={reset}>
                    Start a new enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-labelledby="form-title">
                <h2 id="form-title" className="text-2xl font-semibold sm:text-[1.75rem]">
                  Send an enquiry
                </h2>
                <p className="mt-2 text-muted">
                  Fields marked <span aria-hidden className="text-cyan">*</span>
                  <span className="sr-only">with an asterisk</span> are required.
                </p>

                {showSummary && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="mt-6 rounded-2xl border border-[#ff7a8a]/40 bg-[#ff7a8a]/10 p-4 text-[0.9375rem] outline-none"
                  >
                    <p className="font-medium text-white">Please check the following:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[#ffc2ca]">
                      {errorList.map(([k, msg]) => (
                        <li key={k}>
                          <a href={`#f-${k}`} className="underline underline-offset-2 hover:text-white">
                            {msg}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="f-name" required>
                      Name
                    </Label>
                    <input
                      {...fieldProps('name')}
                      type="text"
                      autoComplete="name"
                      className="field"
                      value={values.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                    <FieldError k="name" />
                  </div>
                  <div>
                    <Label htmlFor="f-organisation">Company / Organisation</Label>
                    <input
                      {...fieldProps('organisation')}
                      type="text"
                      autoComplete="organization"
                      className="field"
                      value={values.organisation}
                      onChange={(e) => set('organisation', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="f-phone" required>
                      Phone
                    </Label>
                    <input
                      {...fieldProps('phone')}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className="field"
                      value={values.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                    <FieldError k="phone" />
                  </div>
                  <div>
                    <Label htmlFor="f-email" required>
                      Email
                    </Label>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className="field"
                      value={values.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                    <FieldError k="email" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="f-interest" required>
                      Interested in
                    </Label>
                    <div className="relative">
                      <select
                        {...fieldProps('interest')}
                        className="field appearance-none pr-11"
                        value={values.interest}
                        onChange={(e) => set('interest', e.target.value as Enquiry['interest'])}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {ENQUIRY_INTERESTS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 fill-muted">
                        <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                      </svg>
                    </div>
                    <FieldError k="interest" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="f-message" required>
                      Message
                    </Label>
                    <textarea
                      {...fieldProps('message')}
                      rows={5}
                      className="field resize-y"
                      placeholder="Tell us briefly what you're looking for"
                      value={values.message}
                      onChange={(e) => set('message', e.target.value)}
                    />
                    <FieldError k="message" />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted sm:max-w-xs">We only use these details to respond to your enquiry.</p>
                  <Button type="submit" size="lg" arrow disabled={status === 'submitting'} className="w-full sm:w-auto">
                    {status === 'submitting' ? 'Checking…' : 'Submit enquiry'}
                  </Button>
                </div>
              </form>
            )}
          </Reveal>
          )}

          {/* Direct contact */}
          <Reveal delay={100} as="aside" aria-labelledby="talk-heading" className="flex flex-col gap-4">
            <div className="card relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
              <div aria-hidden className="absolute -top-20 -right-20 size-56 rounded-full bg-electric/25 blur-3xl" />
              <h2 id="talk-heading" className="relative text-2xl font-semibold">
                {ENQUIRY_FORM_ENABLED ? 'Prefer to talk to us?' : 'Talk to us'}
              </h2>
              <p className="relative mt-2 text-muted">Reach our team directly — we're happy to help you choose.</p>
            </div>
            <ContactCard
              icon={<Phone aria-hidden className="size-5" />}
              label="Call us — contact & enquiries"
              value={CONTACT.phone}
              href={CONTACT.phone ? `tel:${CONTACT.phone.replace(/\s/g, '')}` : undefined}
            />
            <ContactCard
              icon={<Mail aria-hidden className="size-5" />}
              label="Email us — support"
              value={CONTACT.email}
              href={CONTACT.email ? `mailto:${CONTACT.email}` : undefined}
            />
            {CONTACT.whatsapp && (
              <ContactCard
                icon={<MessageCircle aria-hidden className="size-5" />}
                label="WhatsApp"
                value="Chat with us"
                href={`https://wa.me/${CONTACT.whatsapp}`}
                external
              />
            )}
            {CONTACT.address && <ContactCard icon={<MapPin aria-hidden className="size-5" />} label="Address" value={CONTACT.address} />}
            {CONTACT.hours && <ContactCard icon={<Clock aria-hidden className="size-5" />} label="Hours" value={CONTACT.hours} />}
            <HealthDisclaimer compact />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.9375rem] font-medium text-silver">
      {children}
      {required && (
        <span aria-hidden className="ml-0.5 text-cyan">
          *
        </span>
      )}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  )
}
