import { motion } from 'framer-motion'
import { products } from '../data/products'
import { site, waLink, orderMessage } from '../config/site'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-60px' }
const hidden = { opacity: 0, y: 44 }
const shown = (index) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + index * 0.12, duration: 0.9, ease } })

export default function Collection() {
  return (
    <section id="collection" className="relative z-20 bg-ivory py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div initial={hidden} whileInView={shown(0)} viewport={viewport} className="max-w-2xl">
          <p className="eyebrow">The Collection</p>
          <h2 className="mt-5 font-serif text-4xl font-light text-ink md:text-5xl">
            Four scents. <span className="italic text-gold-deep">Four stories.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/55">
            Composed in small batches and finished by hand. {site.delivery}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={hidden}
              whileInView={shown(index)}
              viewport={viewport}
              className={`group border border-gold/40 bg-[#FBF8F2] shadow-card transition-transform duration-500 ease-out hover:-translate-y-2 ${
                index % 2 === 1 ? 'xl:mt-10' : ''
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" aria-hidden="true" />

              <div className="p-6">
                <p className="eyebrow">ORRIS {product.no}</p>
                <h3 className="mt-2 font-serif text-2xl font-medium text-ink">{product.name}</h3>
                <p className="mt-1 font-serif italic text-ink/55">{product.line}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/60">{product.description}</p>
                <p className="mt-4 text-[11px] uppercase tracking-wide2 text-gold-deep">{product.notes}</p>
                <div className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-4">
                  <span className="text-xs text-ink/50">{product.size}</span>
                  <span className="font-serif text-xl text-ink">{product.price}</span>
                </div>
                <a
                  href={waLink(orderMessage(product.name))}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mt-5 w-full"
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
