// Interaction QA: mobile menu, expert modal, contact form validation/success, deep links, tabs.
import { chromium } from 'playwright'
const BASE = process.env.QA_BASE || 'http://localhost:4173'
const OUT = process.argv[2] || 'screenshots'
const browser = await chromium.launch({ channel: 'chrome' })
const results = []
const visible = (loc, timeout = 4000) => loc.waitFor({ state: 'visible', timeout }).then(() => true, () => false)
const valueIs = async (loc, expected, timeout = 4000) => {
  const end = Date.now() + timeout
  while (Date.now() < end) {
    try { if ((await loc.inputValue()) === expected) return true } catch {}
    await new Promise((r) => setTimeout(r, 100))
  }
  return false
}
const check = (name, ok, extra = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`)
// Form checks follow ENQUIRY_FORM_ENABLED in src/config/site.ts.
const { readFileSync } = await import('node:fs')
const FORM = /ENQUIRY_FORM_ENABLED = true/.test(readFileSync('src/config/site.ts', 'utf8'))

const m = await (await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })).newPage()
const errors = []
m.on('pageerror', (e) => errors.push(String(e)))
m.on('console', (x) => x.type() === 'error' && errors.push(x.text()))

// Mobile menu
await m.goto(BASE + '/')
await m.getByRole('button', { name: 'Open menu' }).click()
const dialog = m.getByRole('dialog', { name: 'Site menu' })
check('mobile menu opens', await dialog.waitFor({ state: 'visible', timeout: 3000 }).then(() => true, () => false))
await m.getByRole('button', { name: 'Show Wellness services' }).click()
await m.screenshot({ path: `${OUT}/ix-mobile-menu.png` })
await m.keyboard.press('Escape')
await m.waitForTimeout(350)
check('mobile menu closes on Esc', (await m.locator('#mobile-menu').getAttribute('aria-hidden')) === 'true')
check('focus returns to menu button', await m.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Open menu'))
await m.getByRole('button', { name: 'Open menu' }).click()
await m.getByRole('dialog').getByRole('link', { name: 'Corporate Wellness', exact: true }).click()
await m.waitForURL('**/corporate-wellness')
check('mobile menu navigates', m.url().endsWith('/corporate-wellness'))

// Wellness deep link opens the right accordion
await m.goto(BASE + '/wellness#self-defence')
await m.waitForTimeout(600)
check('deep link #self-defence visible', await m.locator('#self-defence').isVisible())
await m.goto(BASE + '/wellness#lifestyle-engagement')
await m.waitForTimeout(600)
check('deep link #lifestyle-engagement visible', await m.locator('#lifestyle-engagement').isVisible())

// Wellness search
await m.goto(BASE + '/wellness')
await m.fill('#activity-search', 'camp')
const n = await m.locator('article[id]').count()
check('search "camp" filters results', n > 0 && n < 15, `${n} results`)
await m.fill('#activity-search', 'zzzz')
check('empty search shows message', await m.getByText('No activities match').isVisible())

// Expert modal
await m.goto(BASE + '/experts')
await m.getByRole('button', { name: 'View profile of Kunjan Paul' }).click({ timeout: 8000 })
const modal = m.locator('dialog[open]')
check('expert modal opens', await visible(modal))
check('modal URL updated', m.url().includes('expert=kunjan-paul'))
await m.screenshot({ path: `${OUT}/ix-expert-modal.png` })
await m.keyboard.press('Escape')
await m.waitForTimeout(200)
check('modal closes on Esc', (await m.locator('dialog[open]').count()) === 0 && !m.url().includes('expert='))
await m.goto(BASE + '/experts?expert=dr-rohini-khera-bhatt')
check('modal deep link opens', await m.locator('dialog[open]').waitFor({ state: 'visible', timeout: 3000 }).then(() => true, () => false))
await m.getByRole('dialog').getByRole('link', { name: 'Contact Us' }).click()
await m.waitForURL('**/contact**')
if (FORM) {
check('modal CTA prefills interest', await valueIs(m.locator('#f-interest'), 'Doctor Consultation'))
check('modal CTA prefills message', (await m.locator('#f-message').inputValue()).includes('Dr. Rohini Khera Bhatt'))

// Contact validation
await m.goto(BASE + '/contact')
await m.getByRole('button', { name: /Submit enquiry/ }).click()
await m.waitForTimeout(100)
const alertVisible = await m.getByRole('alert').isVisible()
check('validation summary shown on empty submit', alertVisible)
check('fields marked invalid', (await m.locator('[aria-invalid="true"]').count()) === 5)
await m.screenshot({ path: `${OUT}/ix-contact-errors.png`, fullPage: false })
await m.fill('#f-name', 'Asha Rao')
await m.fill('#f-phone', '12345')
await m.fill('#f-email', 'bad@')
await m.locator('#f-email').blur()
check('invalid phone message', await m.getByText('valid phone number').first().isVisible())
check('invalid email message', await m.getByText('valid email address').first().isVisible())
await m.fill('#f-phone', '+91 98765 43210')
await m.fill('#f-email', 'asha@example.com')
await m.selectOption('#f-interest', 'Corporate Wellness')
await m.fill('#f-message', 'We would like a wellness program for 120 employees.')
await m.getByRole('button', { name: /Submit enquiry/ }).click()
await m.waitForTimeout(200)
check('success state shown', await m.getByText('Thank you, Asha.').isVisible())
check('success is honest (not sent)', await m.getByText('not been sent').isVisible())
await m.screenshot({ path: `${OUT}/ix-contact-success.png` })
} else {
// Form hidden: Contact shows phone and email only
await m.goto(BASE + '/contact')
check('enquiry form hidden', (await m.locator('form, #f-message').count()) === 0)
check('phone link shown', await visible(m.locator('a[href^="tel:"]').first()))
check('email link shown', await visible(m.locator('main a[href^="mailto:"]').first()))
await m.screenshot({ path: `${OUT}/ix-contact-direct.png` })
}

// Healthcare CTA prefill
await m.goto(BASE + '/healthcare')
await m.locator('#lab-tests').getByRole('link', { name: 'Contact us about Lab Tests' }).click()
await m.waitForURL('**/contact**')
if (FORM) check('healthcare CTA prefills Lab Tests', await valueIs(m.locator('#f-interest'), 'Lab Tests'))

// Desktop: dropdown + tabs keyboard
const d = await (await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })).newPage()
d.on('pageerror', (e) => errors.push(String(e)))
await d.goto(BASE + '/')
await d.getByRole('link', { name: 'Healthcare', exact: true }).first().hover()
await d.waitForTimeout(150)
check('desktop dropdown opens on hover', await d.locator('#menu-healthcare').isVisible())
await d.screenshot({ path: `${OUT}/ix-dropdown.png` })
await d.locator('#menu-healthcare').getByRole('link', { name: 'Pharmacy' }).click()
await d.waitForURL('**/healthcare#pharmacy')
await d.waitForTimeout(400)
const top = await d.locator('#pharmacy').evaluate((el) => el.getBoundingClientRect().top)
check('dropdown link scrolls to anchor', top < 300 && top > 0, `top=${Math.round(top)}`)
await d.goto(BASE + '/')
await d.getByRole('tab', { name: /Mind & Well-being/ }).focus()
await d.keyboard.press('ArrowRight')
check('tabs arrow-key navigation', (await d.getByRole('tab', { selected: true }).textContent())?.includes('Fitness'))
// Explore Services scrolls to #services
await d.getByRole('link', { name: 'Explore Services' }).click()
await d.waitForTimeout(500)
check('Explore Services scrolls to services', (await d.locator('#services').evaluate((el) => el.getBoundingClientRect().top)) < 200)

// Floating WhatsApp button
const wa = d.getByRole('link', { name: /WhatsApp/ }).last()
check('whatsapp button visible', await visible(wa))
const waHref = (await wa.getAttribute('href')) || ''
check('whatsapp link has number + greeting', waHref.startsWith('https://wa.me/917387996455?text=') && waHref.includes('AURASPHERE'), waHref)
check('whatsapp opens in new tab', (await wa.getAttribute('target')) === '_blank')
await wa.hover()
await d.waitForTimeout(400)
check('whatsapp label shows on hover', await d.getByText('Chat on WhatsApp').isVisible())
await d.screenshot({ path: `${OUT}/ix-whatsapp-hover.png` })
await d.mouse.move(10, 400)
await d.evaluate(() => window.scrollTo(0, 2000))
await d.waitForTimeout(500)
const [waBox, topBox] = [await wa.boundingBox(), await d.getByRole('button', { name: 'Back to top' }).boundingBox()]
check('back-to-top sits above whatsapp', !!waBox && !!topBox && topBox.y + topBox.height <= waBox.y, `top=${topBox?.y} wa=${waBox?.y}`)
await m.goto(BASE + '/')
await m.evaluate(() => window.scrollTo(0, 2000))
await m.waitForTimeout(500)
await m.screenshot({ path: `${OUT}/ix-whatsapp-mobile.png` })

// Footer social icons (placeholders until URLs are supplied)
const social = d.getByRole('list', { name: 'Social media' })
check('footer social icons shown', (await social.locator('li').count()) === 5)
await social.scrollIntoViewIfNeeded()
await d.waitForTimeout(300)
await d.screenshot({ path: `${OUT}/ix-footer-social.png` })

check('no runtime errors', errors.length === 0, errors.join(' | '))
await browser.close()
console.log(results.join('\n'))
