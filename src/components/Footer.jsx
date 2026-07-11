import { useState } from 'react'
import { site, instagramUrl, waLink } from '../config/site'
import { scrollToSection } from '../lib/scrollTo'

const exploreLinks = [
  { label: 'Collection', target: '#collection' },
  { label: 'Story', target: '#story' },
  { label: 'Notes', target: '#notes' },
  { label: 'Packaging', target: '#packaging' },
  { label: 'Instagram', target: '#instagram' },
  { label: 'Contact', target: '#contact' },
]

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  // NOTE: connect this to a real service (Mailchimp, Buttondown, Formspree...)
  const subscribe = (event) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="relative z-20 border-t border-gold/20 bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl font-light tracking-luxe">ORRIS</p>
          <p className="mt-1 text-[10px] uppercase tracking-luxe text-gold">Parfums</p>
          <p className="mt-6 max-w-xs font-serif italic text-ivory/70">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-ivory/45">{site.delivery}</p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow-gold">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  className="text-sm text-ivory/60 transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow-gold">Newsletter</p>
          {subscribed ? (
            <p className="mt-5 font-serif italic text-gold">Welcome to the story.</p>
          ) : (
            <form onSubmit={subscribe} className="mt-5 flex border-b border-ivory/25 transition-colors duration-300 focus-within:border-gold">
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email address"
                className="w-full bg-transparent py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none"
              />
              <button type="submit" className="pl-3 text-[11px] uppercase tracking-wide2 text-gold">
                Join
              </button>
            </form>
          )}
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ivory/50">
            <a
              href={waLink('Hello ORRIS PARFUMS, I would like to place an order.')}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-gold"
            >
              WhatsApp
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="transition-colors duration-300 hover:text-gold">
              Instagram
            </a>
            <a href={'mailto:' + site.email} className="transition-colors duration-300 hover:text-gold">
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10 px-6 py-6 text-center">
        <p className="text-[11px] text-ivory/40">
          © {new Date().getFullYear()} {site.name} · {site.domain}
        </p>
        <p className="mt-1.5 font-serif text-sm italic text-gold/60">{site.message}</p>
      </div>
    </footer>
  )
}
