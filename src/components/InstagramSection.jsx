import { motion } from 'framer-motion'
import { site, instagramUrl } from '../config/site'

const ease = [0.22, 1, 0.36, 1]
const viewport = { once: true, margin: '-80px' }
const hidden = { opacity: 0, y: 36 }
const shown = { opacity: 1, y: 0, transition: { duration: 0.9, ease } }
const phoneHidden = { opacity: 0, y: 90, rotate: 2.5 }
const phoneShown = { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.2, ease } }
const tileHidden = { opacity: 0, scale: 0.94 }
const tileShown = (index) => ({ opacity: 1, scale: 1, transition: { delay: 0.35 + index * 0.09, duration: 0.7, ease } })
const perspectiveStyle = { perspective: '1200px' }

const tiles = [
  { src: '/images/ig-1.jpg', alt: 'Black perfume bottle beside a pale flower' },
  { src: '/images/ig-2.jpg', alt: 'Amber perfume vials in warm light' },
  { src: '/images/ig-3.jpg', alt: 'Cream ORRIS brand card' },
  { src: '/images/ig-4.jpg', alt: 'Soft smoke over a dark background' },
  { src: '/images/ig-5.jpg', alt: 'Ivory ORRIS packaging box' },
  { src: '/images/ig-6.jpg', alt: 'Black thank-you card with gold ORRIS logo' },
]

export default function InstagramSection() {
  return (
    <section id="instagram" className="relative z-20 bg-ivory py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 lg:px-10">
        <motion.div initial={hidden} whileInView={shown} viewport={viewport}>
          <p className="eyebrow">@{site.instagram}</p>
          <h2 className="mt-5 font-serif text-4xl font-light text-ink md:text-5xl">
            Follow <span className="italic text-gold-deep">the story.</span>
          </h2>
          <div className="mt-7 space-y-1 text-sm leading-relaxed text-ink/60">
            <p>Niche Perfume House.</p>
            <p>Timeless scents. Crafted with emotion.</p>
            <p>Worldwide Shipping.</p>
            <p className="text-gold-deep">{site.domain}</p>
          </div>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-9">
            Follow on Instagram
          </a>
        </motion.div>

        <div style={perspectiveStyle}>
          <motion.div
            initial={phoneHidden}
            whileInView={phoneShown}
            viewport={viewport}
            className="mx-auto w-[290px] rounded-[2.8rem] bg-ink p-3 shadow-soft transition-transform duration-700 ease-out hover:[transform:rotateX(4deg)_rotateY(-7deg)]"
          >
            <div className="overflow-hidden rounded-[2.2rem] bg-ivory">
              <div className="flex items-center gap-3 px-4 pb-3 pt-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ink">
                  <span className="font-serif text-xl text-gold">O</span>
                </span>
                <div>
                  <p className="text-[13px] font-medium text-ink">{site.instagram}</p>
                  <p className="text-[11px] text-ink/50">Niche Perfume House · 6,362 followers</p>
                </div>
              </div>
              <p className="px-4 pb-4 text-[11px] leading-relaxed text-ink/60">
                Timeless scents. Crafted with emotion. ✨ Worldwide shipping — {site.domain}
              </p>
              <div className="grid grid-cols-3 gap-px bg-ink/10">
                {tiles.map((tileImage, index) => (
                  <motion.img
                    key={tileImage.src}
                    src={tileImage.src}
                    alt={tileImage.alt}
                    loading="lazy"
                    initial={tileHidden}
                    whileInView={tileShown(index)}
                    viewport={viewport}
                    className="aspect-square w-full object-cover"
                  />
                ))}
              </div>
              <div className="h-10 bg-ivory" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
