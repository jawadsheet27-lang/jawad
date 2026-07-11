// Pinned scroll chapter: the bottle rotates, drifts closer and lifts its cap
// while four feature labels fade in around it (see ScrollRig.jsx).

const labels = [
  { id: 1, text: 'Warm amber depth', side: 'left', top: '24%' },
  { id: 2, text: 'Soft floral emotion', side: 'right', top: '36%' },
  { id: 3, text: 'Crafted with care', side: 'left', top: '54%' },
  { id: 4, text: 'Made for unforgettable presence', side: 'right', top: '64%' },
]

export default function ScrollExperience() {
  return (
    <section id="reveal" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen">
        <div className="pointer-events-none relative mx-auto h-full w-full max-w-6xl px-6">
          {labels.map((label, index) => (
            <div
              key={label.id}
              className={`reveal-label reveal-label-${label.id} absolute max-w-[230px] md:max-w-xs ${
                label.side === 'left' ? 'left-6 text-left md:left-10' : 'right-6 text-right md:right-10'
              }`}
              style={ { top: label.top } }
            >
              <p className="eyebrow">0{index + 1}</p>
              <p className="mt-2 font-serif text-2xl font-light leading-snug text-ink md:text-3xl">{label.text}</p>
              <span className={`gold-rule mt-3 ${label.side === 'right' ? 'ml-auto' : ''}`} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
