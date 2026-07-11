import { motion } from 'framer-motion'
import { scrollToSection } from '../lib/scrollTo'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (order) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + order * 0.18, duration: 1.1, ease },
  }),
}

export default function Hero({ ready }) {
  const state = ready ? 'show' : 'hidden'

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[640px] flex-col items-center justify-between px-6 pb-8 pt-28 text-center"
    >
      <div>
        <motion.p variants={fadeUp} initial="hidden" animate={state} custom={0} className="eyebrow">
          Niche Perfume House — Beirut
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={state}
          custom={1}
          className="mx-auto mt-6 max-w-3xl font-serif text-5xl font-light leading-[1.08] text-ink md:text-7xl"
        >
          Timeless scents.
          <br />
          <span className="italic text-gold-deep">Crafted with emotion.</span>
        </motion.h1>
      </div>

      {/* The 3D bottle floats in the open space between heading and footer copy */}

      <div className="w-full">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={state}
          custom={2}
          className="mx-auto max-w-md text-sm leading-relaxed text-ink/60"
        >
          A niche perfume house creating warm, elegant fragrances for unforgettable moments.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={state}
          custom={3}
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={() => scrollToSection('#collection')}>
            Explore Collection
          </button>
          <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={() => scrollToSection('#story')}>
            Discover the Story
          </button>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={state}
          custom={4}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-luxe text-ink/40">Scroll</span>
          <span className="scroll-cue-line block h-8 w-px bg-gold" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}
