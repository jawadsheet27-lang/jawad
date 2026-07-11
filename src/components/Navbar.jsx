import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrollToSection } from '../lib/scrollTo'
import { site, instagramUrl, waLink } from '../config/site'

const links = [
  { label: 'Home', target: '#hero' },
  { label: 'Collection', target: '#collection' },
  { label: 'Story', target: '#story' },
  { label: 'Notes', target: '#notes' },
  { label: 'Packaging', target: '#packaging' },
  { label: 'Instagram', target: '#instagram' },
  { label: 'Contact', target: '#contact' },
]

const ease = [0.22, 1, 0.36, 1]
const menuHidden = { opacity: 0 }
const menuShown = { opacity: 1 }
const menuTransition = { duration: 0.45, ease: 'easeOut' }
const itemHidden = { opacity: 0, y: 16 }
const itemShown = { opacity: 1, y: 0 }
const itemTransition = (index) => ({ delay: 0.06 * index, duration: 0.6, ease })

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (target) => {
    setOpen(false)
    scrollToSection(target)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
        scrolled && !open
          ? 'border-b border-ink/5 bg-ivory/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <button type="button" onClick={() => go('#hero')} className="text-left" aria-label="ORRIS PARFUMS home">
          <span className="block font-serif text-xl font-medium tracking-luxe text-ink">ORRIS</span>
          <span className="block text-[9px] uppercase tracking-luxe text-gold-deep">Parfums</span>
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => go(link.target)}
                className="nav-link text-[11px] uppercase tracking-wide2 text-ink/75 transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={waLink('Hello, I would like to place an order from ' + site.name + '.')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary hidden !min-h-[42px] !px-5 !py-2 md:inline-flex"
          >
            Order
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-6 bg-ink transition-transform duration-500 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-500 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={menuHidden}
            animate={menuShown}
            exit={menuHidden}
            transition={menuTransition}
            className="texture-noise fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ivory lg:hidden"
          >
            <ul className="flex flex-col px-8 pt-8">
              {links.map((link, index) => (
                <motion.li key={link.label} initial={itemHidden} animate={itemShown} transition={itemTransition(index)}>
                  <button
                    type="button"
                    onClick={() => go(link.target)}
                    className="py-3.5 font-serif text-3xl font-light text-ink"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 border-t border-ink/10 px-8 py-6 text-sm text-ink/60">
              <p>{site.whatsappDisplay}</p>
              <p className="mt-1">{site.email}</p>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-1 block text-gold-deep">
                @{site.instagram}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
