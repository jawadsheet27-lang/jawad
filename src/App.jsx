import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import useLenis from './hooks/useLenis'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ProductScene from './components/ProductScene'
import ScrollRig from './components/ScrollRig'
import Hero from './components/Hero'
import ScrollExperience from './components/ScrollExperience'
import BrandStory from './components/BrandStory'
import Collection from './components/Collection'
import NotesSection from './components/NotesSection'
import PackagingReveal from './components/PackagingReveal'
import BrandIdentity from './components/BrandIdentity'
import InstagramSection from './components/InstagramSection'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  // Calm, expensive intro — short enough to never annoy.
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>

      {/* Fixed stage: backdrop + paper texture + 3D canvas live behind all content */}
      <div id="stage-bg" className="fixed inset-0 z-0 bg-ivory" aria-hidden="true" />
      <div
        className="texture-noise paper-overlay pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      <ProductScene />
      <ScrollRig />
      <Navbar />

      <main className="relative z-20">
        <Hero ready={ready} />
        <ScrollExperience />
        <BrandStory />
        <Collection />
        <NotesSection />
        <PackagingReveal />
        <BrandIdentity />
        <InstagramSection />
        <Testimonials />
        <FinalCTA />
        <Contact />
        <Footer />
      </main>

      {/* Film grain on top of everything */}
      <div className="texture-noise grain pointer-events-none fixed inset-0 z-30" aria-hidden="true" />
    </MotionConfig>
  )
}
