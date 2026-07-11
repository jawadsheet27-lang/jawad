// Pinned unboxing chapter: the ivory box rises, its lid opens, the bottle
// lifts out, the thank-you card floats in and the gold O appears
// (scroll choreography lives in ScrollRig.jsx).

const steps = [
  { id: 1, eyebrow: '01 — The box', text: 'Ivory, weighted, quiet. It opens with a black ribbon pull.' },
  { id: 2, eyebrow: '02 — The bottle', text: 'Glass rises into warm light. Gold catches first.' },
  { id: 3, eyebrow: '03 — The card', text: 'Signed by hand. Every scent tells a story.' },
]

export default function PackagingReveal() {
  return (
    <section id="packaging" className="relative h-[350vh]">
      <div className="sticky top-0 h-screen">
        <div className="pointer-events-none relative mx-auto h-full w-full max-w-6xl px-6">
          <div className="absolute inset-x-6 top-24 text-center md:top-28">
            <p className="eyebrow">The Ritual</p>
            <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-light leading-tight text-ink md:text-5xl">
              An unboxing made to be remembered.
            </h2>
          </div>

          {steps.map((step) => (
            <div
              key={step.id}
              className={`pack-step pack-step-${step.id} absolute bottom-[16%] max-w-[240px] md:max-w-xs ${
                step.id === 2 ? 'left-6 text-left md:left-10' : 'right-6 text-right md:right-10'
              }`}
            >
              <p className="eyebrow">{step.eyebrow}</p>
              <p className="mt-2 font-serif text-xl font-light leading-snug text-ink md:text-2xl">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
