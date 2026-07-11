import { motion } from 'framer-motion'
import { site } from '../config/site'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-60px' }
const hidden = { opacity: 0, y: 36 }
const shown = (index) => ({ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.9, ease } })

const swatches = [
  { name: 'Black', hex: '#111111', className: 'bg-ink' },
  { name: 'Ivory', hex: '#F7F3EE', className: 'bg-ivory' },
  { name: 'Gold', hex: '#C8A97E', className: 'bg-gold' },
]

const tile = 'border border-ivory/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40'

export default function BrandIdentity() {
  return (
    <section id="identity" className="relative z-20 bg-[#0F0E0C] py-28 text-ivory md:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div initial={hidden} whileInView={shown(0)} viewport={viewport}>
          <p className="eyebrow-gold">Brand Identity</p>
          <h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">
            A house built on <span className="italic text-gold">restraint.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {/* Main logo */}
          <motion.div initial={hidden} whileInView={shown(1)} viewport={viewport} className={`${tile} md:col-span-2`}>
            <p className="text-[10px] uppercase tracking-wide2 text-ivory/40">Main Logo</p>
            <p className="mt-8 font-serif text-5xl font-light tracking-luxe transition-all duration-700 hover:tracking-[0.45em] md:text-6xl">
              ORRIS
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-luxe text-ivory/50">Parfums</p>
            <p className="mt-8 font-serif italic text-gold">{site.tagline}</p>
          </motion.div>

          {/* Gold O icon */}
          <motion.div initial={hidden} whileInView={shown(2)} viewport={viewport} className={`${tile} flex flex-col items-center justify-center text-center`}>
            <span className="o-rotate font-serif text-8xl font-light leading-none text-gold">O</span>
            <p className="mt-6 text-[10px] uppercase tracking-wide2 text-ivory/40">The O Icon</p>
            <p className="mt-2 text-xs text-ivory/55">Loader, seal, signature.</p>
          </motion.div>

          {/* Palette */}
          <motion.div initial={hidden} whileInView={shown(3)} viewport={viewport} className={tile}>
            <p className="text-[10px] uppercase tracking-wide2 text-ivory/40">Color Palette</p>
            <div className="mt-7 flex gap-5">
              {swatches.map((swatch) => (
                <div key={swatch.name} className="text-center">
                  <span className={`block h-14 w-14 rounded-full ring-1 ring-gold/40 ${swatch.className}`} />
                  <p className="mt-3 text-xs text-ivory/70">{swatch.name}</p>
                  <p className="text-[10px] text-ivory/40">{swatch.hex}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div initial={hidden} whileInView={shown(4)} viewport={viewport} className={tile}>
            <p className="text-[10px] uppercase tracking-wide2 text-ivory/40">Typography</p>
            <div className="mt-6 flex items-end gap-6">
              <div>
                <p className="font-serif text-6xl font-light leading-none">Aa</p>
                <p className="mt-3 text-xs text-ivory/55">Cormorant Garamond — headings</p>
              </div>
              <div>
                <p className="font-sans text-4xl font-light leading-none">Aa</p>
                <p className="mt-3 text-xs text-ivory/55">Inter — body &amp; UI</p>
              </div>
            </div>
          </motion.div>

          {/* Tone + versions */}
          <motion.div initial={hidden} whileInView={shown(5)} viewport={viewport} className={tile}>
            <p className="text-[10px] uppercase tracking-wide2 text-ivory/40">Tone of Voice</p>
            <p className="mt-6 font-serif text-xl font-light leading-relaxed">
              Elegant <span className="text-gold">/</span> Minimal <span className="text-gold">/</span> Luxury{' '}
              <span className="text-gold">/</span> Warm
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-11 items-center border border-ink/10 bg-ivory px-4 font-serif text-sm tracking-luxe text-ink">
                ORRIS
              </span>
              <span className="flex h-11 items-center border border-gold/40 bg-ink px-4 font-serif text-sm tracking-luxe text-gold">
                ORRIS
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink ring-1 ring-gold/40">
                <span className="font-serif text-xl text-gold">O</span>
              </span>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-wide2 text-ivory/40">Light · Dark · Social mark</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
