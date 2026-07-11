import { motion } from 'framer-motion'
import { scrollToSection } from '../lib/scrollTo'
import { waLink } from '../config/site'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-100px' }
const hidden = { opacity: 0, y: 34 }
const shown = (delay) => ({ opacity: 1, y: 0, transition: { delay, duration: 1.1, ease } })

// The section itself is transparent: behind it, the page backdrop dims to
// near-black and the 3D bottle + gold O return for a final zoom-out
// (see ScrollRig.jsx).
export default function FinalCTA() {
  return (
    <section id="cta" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center text-ivory">
      <motion.p initial={hidden} whileInView={shown(0)} viewport={viewport} className="eyebrow-gold">
        ORRIS PARFUMS
      </motion.p>
      <motion.h2
        initial={hidden}
        whileInView={shown(0.15)}
        viewport={viewport}
        className="mt-7 max-w-3xl font-serif text-4xl font-light leading-[1.15] md:text-6xl"
      >
        Find the scent that becomes <span className="italic text-gold">your signature.</span>
      </motion.h2>
      <motion.p
        initial={hidden}
        whileInView={shown(0.3)}
        viewport={viewport}
        className="mt-6 max-w-md text-sm leading-relaxed text-ivory/60"
      >
        Discover ORRIS PARFUMS — timeless scents crafted with emotion.
      </motion.p>
      <motion.div
        initial={hidden}
        whileInView={shown(0.45)}
        viewport={viewport}
        className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <button type="button" className="btn btn-gold w-full sm:w-auto" onClick={() => scrollToSection('#collection')}>
          Shop Collection
        </button>
        <a
          href={waLink('Hello, I would like to order from ORRIS PARFUMS.')}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost-light w-full sm:w-auto"
        >
          Order on WhatsApp
        </a>
        <button type="button" className="btn btn-ghost-light w-full sm:w-auto" onClick={() => scrollToSection('#contact')}>
          Contact Us
        </button>
      </motion.div>
    </section>
  )
}
