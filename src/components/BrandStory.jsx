import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-100px' }
const lineHidden = { opacity: 0, y: 34 }
const lineShown = (delay) => ({ opacity: 1, y: 0, transition: { delay, duration: 1, ease } })
const ruleHidden = { scaleX: 0 }
const ruleShown = { scaleX: 1, transition: { delay: 0.5, duration: 1.2, ease } }

export default function BrandStory() {
  return (
    <section id="story" className="relative z-20 bg-ink text-ivory">
      <div className="grid min-h-screen md:grid-cols-2">
        <div className="flex items-center px-6 py-24 md:px-14 lg:px-20">
          <div className="max-w-xl">
            <motion.p initial={lineHidden} whileInView={lineShown(0)} viewport={viewport} className="eyebrow-gold">
              Our Story
            </motion.p>

            <h2 className="mt-8 font-serif text-3xl font-light leading-[1.3] md:text-[2.6rem]">
              <motion.span className="block" initial={lineHidden} whileInView={lineShown(0.1)} viewport={viewport}>
                ORRIS PARFUMS was created for those
              </motion.span>
              <motion.span className="block" initial={lineHidden} whileInView={lineShown(0.25)} viewport={viewport}>
                who believe fragrance is more than a scent.
              </motion.span>
              <motion.span
                className="block italic text-gold"
                initial={lineHidden}
                whileInView={lineShown(0.4)}
                viewport={viewport}
              >
                It is memory, emotion, and identity.
              </motion.span>
            </h2>

            <motion.span
              className="gold-rule mt-9 origin-left"
              initial={ruleHidden}
              whileInView={ruleShown}
              viewport={viewport}
              aria-hidden="true"
            />

            <motion.p
              className="mt-9 max-w-md text-sm leading-relaxed text-ivory/60"
              initial={lineHidden}
              whileInView={lineShown(0.55)}
              viewport={viewport}
            >
              Composed in small batches from rare raw materials, each fragrance is built to live with you — on
              skin, in memory, in moments that stay.
            </motion.p>
            <motion.p
              className="mt-5 font-serif text-lg italic text-gold/90"
              initial={lineHidden}
              whileInView={lineShown(0.7)}
              viewport={viewport}
            >
              Every scent tells a story.
            </motion.p>
          </div>
        </div>

        <div className="relative min-h-[55vh] overflow-hidden md:min-h-full">
          <img
            id="story-img"
            src="/images/story.jpg"
            alt="ORRIS perfume bottle resting on ivory silk in warm light"
            className="absolute inset-0 h-[115%] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
