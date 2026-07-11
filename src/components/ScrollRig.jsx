import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneTargets as T } from '../lib/scrollState'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// One place that maps scroll progress -> 3D scene targets + DOM reveals.
// All timelines are scrubbed; the 3D scene applies frame-damping on top,
// so every movement stays soft even on fast scrolling.
export default function ScrollRig() {
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      const scrub = 1.1

      /* --- 3. Scroll-driven product reveal (pinned) ------------------- */
      gsap.set('.reveal-label', { opacity: 0, y: 30 })
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '#reveal', start: 'top top', end: 'bottom bottom', scrub },
        })
        .to(T, { camZ: 5.6, bottleRotY: Math.PI * 0.85, bottleZ: 0.6, bottleY: 0.05, capLift: 1, lightIntensity: 1.4 }, 0)
        .to('.reveal-label-1', { opacity: 1, y: 0, duration: 0.08 }, 0.1)
        .to('.reveal-label-2', { opacity: 1, y: 0, duration: 0.08 }, 0.3)
        .to('.reveal-label-3', { opacity: 1, y: 0, duration: 0.08 }, 0.5)
        .to('.reveal-label-4', { opacity: 1, y: 0, duration: 0.08 }, 0.7)
        .to(T, { capLift: 0.25, camOrbit: 0.18 }, 0.75)

      /* --- 4. Story: the bottle travels off stage to the left --------- */
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '#story', start: 'top bottom', end: 'top 20%', scrub },
        })
        .to(T, { bottleX: -4.4, bottleY: -0.4, bottleZ: 0, bottleRotY: Math.PI * 1.4, capLift: 0, camOrbit: 0, camZ: 7, lightIntensity: 1 }, 0)

      gsap.to('#story-img', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: '#story', start: 'top bottom', end: 'bottom top', scrub: true },
      })

      /* --- 7. Packaging / unboxing (pinned) ---------------------------- */
      gsap.set('.pack-step', { opacity: 0, y: 26 })
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '#packaging', start: 'top top', end: 'bottom bottom', scrub },
        })
        .to(T, { bottleX: 0, bottleY: -0.5, bottleZ: 0, bottleRotY: Math.PI * 2, camZ: 6.6 }, 0)
        .to(T, { boxProgress: 1 }, 0.06)
        .to('.pack-step-1', { opacity: 1, y: 0, duration: 0.06 }, 0.1)
        .to('.pack-step-1', { opacity: 0, y: -18, duration: 0.05 }, 0.3)
        .to(T, { bottleY: 0.55, capLift: 0.3, camZ: 5.9 }, 0.32)
        .to('.pack-step-2', { opacity: 1, y: 0, duration: 0.06 }, 0.4)
        .to('.pack-step-2', { opacity: 0, y: -18, duration: 0.05 }, 0.58)
        .to(T, { cardProgress: 1, camOrbit: 0.3 }, 0.55)
        .to('.pack-step-3', { opacity: 1, y: 0, duration: 0.06 }, 0.66)
        .to(T, { oIconProgress: 0.8, camZ: 5.4, lightIntensity: 1.4 }, 0.7)
        .to(T, { capLift: 0, bottleY: 0.35, camOrbit: 0.1, camZ: 6.1 }, 0.86)

      /* --- Exit the stage before the identity/social sections ---------- */
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '#identity', start: 'top 90%', end: 'top 30%', scrub },
        })
        .to(T, { bottleY: 4, boxProgress: 0, cardProgress: 0, oIconProgress: 0, camOrbit: 0, camZ: 7 }, 0)

      /* --- 11. Final CTA: cinematic return ------------------------------ */
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '#cta', start: 'top 90%', end: 'center center', scrub },
        })
        .to(T, { bottleX: 0, bottleY: -0.1, bottleZ: 0, bottleRotY: Math.PI * 3, camZ: 8.4, oIconProgress: 1, lightIntensity: 1.6 }, 0)

      /* Backdrop dims to near-black for the finale */
      gsap.to('#stage-bg', {
        backgroundColor: '#15120E',
        ease: 'none',
        scrollTrigger: { trigger: '#cta', start: 'top 95%', end: 'top 35%', scrub: true },
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reduced])

  return null
}
