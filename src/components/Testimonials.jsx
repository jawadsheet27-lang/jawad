import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-60px' }
const hidden = { opacity: 0, y: 40 }
const shown = (index) => ({ opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.9, ease } })

const quotes = [
  { text: 'Elegant, warm, and unforgettable.', author: 'R. — Private client, Beirut' },
  { text: 'A scent that feels like a memory.', author: 'L. — Collector, Paris' },
  { text: 'Minimal, luxurious, and deeply personal.', author: 'N. — Stylist, Dubai' },
]

export default function Testimonials() {
  return (
    <section className="relative z-20 bg-cream py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div initial={hidden} whileInView={shown(0)} viewport={viewport} className="text-center">
          <p className="eyebrow">Voices</p>
          <h2 className="mt-5 font-serif text-4xl font-light text-ink md:text-5xl">
            Worn. Remembered. <span className="italic text-gold-deep">Loved.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((quote, index) => (
            <motion.figure
              key={quote.author}
              initial={hidden}
              whileInView={shown(index)}
              viewport={viewport}
              className="border border-gold/30 bg-[#FBF8F2] p-8 shadow-card"
            >
              <span className="font-serif text-6xl leading-none text-gold" aria-hidden="true">
                “
              </span>
              <blockquote className="mt-2 font-serif text-2xl font-light leading-snug text-ink">{quote.text}</blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-wide2 text-ink/45">{quote.author}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
