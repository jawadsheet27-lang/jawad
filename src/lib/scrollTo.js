// Central smooth-scroll helper. Uses the Lenis instance when available and
// falls back to native smooth scrolling (e.g. for reduced-motion users).

let lenisInstance = null

export function setLenis(lenis) {
  lenisInstance = lenis
}

export function scrollToSection(selector) {
  if (lenisInstance) {
    lenisInstance.scrollTo(selector, { duration: 1.6, offset: 0 })
  } else {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}
