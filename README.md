# ORRIS PARFUMS — Luxury Perfume Website

Cinematic, scroll-driven brand + ordering website.
Stack: **React 18 + Vite + Tailwind CSS + React Three Fiber (Three.js/Drei) + GSAP ScrollTrigger + Lenis + Framer Motion**.

---

## 1. Install

Requires **Node.js 18 or newer** (check with `node -v`).

```bash
cd orris-parfums
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open http://localhost:5173 — the site hot-reloads as you edit files.

## 3. Where each file goes

```
orris-parfums/
├─ index.html                  # fonts, meta tags, favicon
├─ vite.config.js / tailwind.config.js / postcss.config.js
├─ public/
│  ├─ images/                  # all photos (replace freely, keep names)
│  └─ models/                  # (create this) bottle.glb goes here
└─ src/
   ├─ main.jsx / App.jsx       # entry + page assembly & z-layering
   ├─ index.css                # design system: buttons, textures, keyframes
   ├─ config/site.js           # ⭐ WhatsApp / email / Instagram / delivery
   ├─ data/products.js         # ⭐ perfume names, prices, sizes, notes, images
   ├─ data/notes.js            # top / heart / base notes
   ├─ lib/scrollState.js       # shared scroll → 3D animation targets
   ├─ lib/scrollTo.js          # smooth anchor scrolling (Lenis)
   ├─ hooks/                   # useLenis, usePrefersReducedMotion
   └─ components/
      ├─ Loader.jsx            # 1. rotating gold O intro
      ├─ Navbar.jsx            # sticky nav + mobile menu
      ├─ Hero.jsx              # 2. full-screen hero
      ├─ ProductScene.jsx      # fixed 3D canvas: bottle, box, card, O icon
      ├─ ScrollRig.jsx         # ⭐ all scroll choreography (GSAP timelines)
      ├─ ScrollExperience.jsx  # 3. pinned product reveal labels
      ├─ BrandStory.jsx        # 4. black editorial story panel
      ├─ Collection.jsx        # 5. product cards + WhatsApp ordering
      ├─ NotesSection.jsx      # 6. top/heart/base notes + gold particles
      ├─ PackagingReveal.jsx   # 7. pinned 3D unboxing captions
      ├─ BrandIdentity.jsx     # 8. logo, palette, typography, tone
      ├─ InstagramSection.jsx  # 9. phone mockup + IG grid
      ├─ Testimonials.jsx      # 10. quotes
      ├─ FinalCTA.jsx          # 11. dark cinematic finale
      ├─ Contact.jsx           # order form + WhatsApp/email/Instagram
      └─ Footer.jsx            # 12. footer + newsletter
```

## 4. Preview locally

`npm run dev` for development. To preview the real production build:

```bash
npm run build
npm run preview
```

## 5. Replace placeholder images

All photos live in `public/images/`. Replace any file **keeping the same file name**, or
change the `image:` path in `src/data/products.js`. Current files:

- `product-warm-amber.jpg`, `product-velvet-rose.jpg`, `product-black-musk.jpg`, `product-golden-oud.jpg` — collection cards (portrait, ~1000px wide is ideal)
- `story.jpg` — story section (large, landscape/portrait both fine)
- `packaging-open.jpg` — spare packaging shot
- `ig-1.jpg` … `ig-6.jpg` — Instagram grid (square, ~600px)

Always update the `alt` text in `products.js` / `InstagramSection.jsx` to match new photos.

## 6. Replace the placeholder 3D bottle with a GLB model

1. Create `public/models/` and drop your file in as `bottle.glb`.
2. Open `src/components/ProductScene.jsx` — the swap steps are written in the comment at the top:
   import `useGLTF` from `@react-three/drei`, load `/models/bottle.glb` inside `<Bottle>`, and
   replace the primitive shapes with `<primitive object={gltf.scene} />` **keeping the outer
   `<group ref={group}>`** (that group receives all scroll animation).
3. Adjust `scale` / `position` on the primitive until it matches the old bottle size (~1.7 units tall).
4. Keep the GLB under ~5 MB (use Draco/gltfpack compression) for fast loading.

## 7. Build

```bash
npm run build
```

Outputs a static site to `dist/`.

## 8. Deploy to Vercel

**Option A (recommended):** push the folder to GitHub → vercel.com → *Add New Project* → import the
repo. Vercel auto-detects Vite (build `npm run build`, output `dist`). Every git push redeploys.

**Option B (no GitHub):**

```bash
npx vercel        # first deploy, answer the prompts
npx vercel --prod # production deploy
```

Then add your domain (orrisparfums.com) in Vercel → Project → Settings → Domains.

## 9. Fixing common errors

| Problem | Fix |
|---|---|
| `npm install` fails / engine warnings | Upgrade Node to 18+ (nvm or nodejs.org) |
| Blank page, console: `WebGL context` | GPU/driver issue — try another browser; the site needs WebGL |
| Scroll animations don't fire | Hard refresh; ScrollTrigger recalculates on `load` — if you add tall content, call `ScrollTrigger.refresh()` |
| Images 404 | Files must be in `public/images/` and paths must start with `/images/…` |
| Fonts look wrong offline | Google Fonts needs internet; self-host the fonts for full offline use |
| WhatsApp button opens wrong chat | `whatsappNumber` in `src/config/site.js` must be digits only, international format, no `+` |
| Jerky scroll on a laptop | Close heavy tabs; DPR is already capped at 1.75 — you can lower it in `ProductScene.jsx` (`dprRange`) |
| Page feels static | You (or the OS) may have *reduced motion* enabled — the site intentionally respects it |

## 10. Still needed from you

- **Real WhatsApp digits** → `src/config/site.js` (`whatsappNumber` + `whatsappDisplay`)
- **Real prices & final sizes** → `src/data/products.js` (currently `$XX.XX`)
- Confirm the four scent names or send your real ones
- Real product photography (to replace the extracted mockup crops)
- Logo SVG/PNG if you want it instead of the typographic logo
- A GLB bottle model (optional — the placeholder glass bottle works today)
- Confirm Instagram handle, email and domain
