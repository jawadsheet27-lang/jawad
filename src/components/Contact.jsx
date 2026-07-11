import { useState } from 'react'
import { motion } from 'framer-motion'
import { site, waLink, instagramUrl } from '../config/site'
import { products } from '../data/products'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-60px' }
const hidden = { opacity: 0, y: 36 }
const shown = (delay) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.9, ease } })

const inputClass =
  'w-full border-b border-ivory/25 bg-transparent py-2.5 text-sm text-ivory placeholder:text-ivory/30 transition-colors duration-300 focus:border-gold focus:outline-none'

export default function Contact() {
  const [name, setName] = useState('')
  const [perfume, setPerfume] = useState(products[0].name)
  const [message, setMessage] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const intro = name ? 'Hello, my name is ' + name + '. ' : 'Hello. '
    const body = "I'm interested in ordering " + perfume + ' from ORRIS PARFUMS.'
    const extra = message ? ' ' + message : ''
    window.open(waLink(intro + body + extra), '_blank', 'noopener')
  }

  return (
    <section id="contact" className="relative z-20 bg-coal py-28 text-ivory md:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div initial={hidden} whileInView={shown(0)} viewport={viewport} className="max-w-2xl">
          <p className="eyebrow-gold">Order &amp; Contact</p>
          <h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">
            Made for moments <span className="italic text-gold">that stay.</span>
          </h2>
          <p className="mt-5 font-serif italic text-gold/90">{site.delivery}</p>
        </motion.div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Direct channels */}
          <motion.div initial={hidden} whileInView={shown(0.1)} viewport={viewport} className="space-y-4">
            <a
              href={waLink('Hello ORRIS PARFUMS, I would like to place an order.')}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-ivory/10 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/60"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wide2 text-ivory/40">Order on WhatsApp</p>
                <p className="mt-2 font-serif text-xl">{site.whatsappDisplay}</p>
              </div>
              <span className="text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href={'mailto:' + site.email}
              className="group flex items-center justify-between border border-ivory/10 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/60"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wide2 text-ivory/40">Contact by Email</p>
                <p className="mt-2 font-serif text-xl">{site.email}</p>
              </div>
              <span className="text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-ivory/10 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/60"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wide2 text-ivory/40">Follow on Instagram</p>
                <p className="mt-2 font-serif text-xl">@{site.instagram}</p>
              </div>
              <span className="text-gold transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </motion.div>

          {/* Order form -> opens WhatsApp with a composed message */}
          <motion.form initial={hidden} whileInView={shown(0.2)} viewport={viewport} onSubmit={submit} className="space-y-7">
            <div>
              <label htmlFor="contact-name" className="text-[10px] uppercase tracking-wide2 text-ivory/40">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-perfume" className="text-[10px] uppercase tracking-wide2 text-ivory/40">
                Perfume
              </label>
              <select
                id="contact-perfume"
                value={perfume}
                onChange={(event) => setPerfume(event.target.value)}
                className={inputClass + ' bg-coal'}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.name}>
                    ORRIS {product.no} — {product.name}
                  </option>
                ))}
                <option value="the collection">Not sure yet — the collection</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="text-[10px] uppercase tracking-wide2 text-ivory/40">
                Message (optional)
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Quantity, delivery address, questions…"
                className={inputClass + ' resize-none'}
              />
            </div>
            <button type="submit" className="btn btn-gold w-full sm:w-auto">
              Send via WhatsApp
            </button>
            <p className="text-[11px] leading-relaxed text-ivory/35">
              The form opens WhatsApp with your message pre-filled — nothing is stored on the website.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
