import { motion } from 'framer-motion'
import { site } from '../config/site'

const ease = [0.22, 1, 0.36, 1]
const perspectiveStyle = { perspective: '800px' }
const hidden = { opacity: 0, y: 14 }
const shown = { opacity: 1, y: 0 }
const exitFade = { opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }
const t1 = { delay: 0.45, duration: 1, ease }
const t2 = { delay: 0.65, duration: 1, ease }
const t3 = { delay: 1, duration: 1.1, ease }

export default function Loader() {
  return (
    <motion.div
      className="texture-noise fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory"
      exit={exitFade}
      role="status"
      aria-label="ORRIS PARFUMS is loading"
    >
      <div style={perspectiveStyle}>
        <span className="loader-o font-serif font-light text-gold">O</span>
      </div>
      <div className="loader-shadow mt-3" aria-hidden="true" />

      <motion.p
        initial={hidden}
        animate={shown}
        transition={t1}
        className="mt-10 font-serif text-2xl font-light tracking-luxe text-ink"
      >
        ORRIS
      </motion.p>
      <motion.p
        initial={hidden}
        animate={shown}
        transition={t2}
        className="mt-1 text-[10px] uppercase tracking-luxe text-ink/50"
      >
        Parfums
      </motion.p>
      <motion.p
        initial={hidden}
        animate={shown}
        transition={t3}
        className="mt-7 font-serif text-base font-light italic text-ink/50"
      >
        {site.tagline}
      </motion.p>
    </motion.div>
  )
}
