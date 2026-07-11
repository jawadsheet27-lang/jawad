import { motion } from 'framer-motion'
import { noteGroups } from '../data/notes'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-60px' }
const hidden = { opacity: 0, y: 40 }
const shown = (index) => ({ opacity: 1, y: 0, transition: { delay: index * 0.15, duration: 0.9, ease } })

const particles = [
  { left: '8%', top: '18%', delay: '0s', size: '5px' },
  { left: '16%', top: '70%', delay: '1.4s', size: '4px' },
  { left: '30%', top: '32%', delay: '2.6s', size: '3px' },
  { left: '52%', top: '14%', delay: '0.9s', size: '4px' },
  { left: '68%', top: '76%', delay: '2s', size: '5px' },
  { left: '82%', top: '26%', delay: '3.2s', size: '3px' },
  { left: '92%', top: '58%', delay: '1.1s', size: '4px' },
]

export default function NotesSection() {
  return (
    <section id="notes" className="relative z-20 overflow-hidden bg-cream py-28 md:py-36">
      {/* Soft smoke-like glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#d9c4a3]/25 blur-3xl" aria-hidden="true" />

      {/* Floating gold particles */}
      {particles.map((particle, index) => (
        <span
          key={index}
          className="float-dot pointer-events-none absolute rounded-full bg-gold"
          aria-hidden="true"
          style={ { left: particle.left, top: particle.top, width: particle.size, height: particle.size, animationDelay: particle.delay } }
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div initial={hidden} whileInView={shown(0)} viewport={viewport} className="text-center">
          <p className="eyebrow">Inside the Flacon</p>
          <h2 className="mt-5 font-serif text-4xl font-light text-ink md:text-5xl">
            The anatomy of <span className="italic text-gold-deep">a scent.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {noteGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={hidden}
              whileInView={shown(index)}
              viewport={viewport}
              className="border-t border-gold/50 pt-8 text-center"
            >
              <h3 className="font-serif text-2xl font-medium text-gold-deep">{group.title}</h3>
              <p className="mt-1 text-[11px] uppercase tracking-wide2 text-ink/40">{group.subtitle}</p>
              <ul className="mt-7 space-y-3">
                {group.notes.map((note) => (
                  <li key={note} className="text-sm text-ink/70">
                    <span className="mr-2 inline-block h-1 w-1 rounded-full bg-gold align-middle" aria-hidden="true" />
                    {note}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
