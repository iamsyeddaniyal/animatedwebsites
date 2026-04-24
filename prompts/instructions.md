# Modern Website Build Instructions for Claude Code

## Overview

You are building a **modern, production-grade website** using the stack and workflow described below. Before writing a single line of code, you must complete the **Brand Extraction Phase** by visiting the reference website provided by the user. This document is your complete specification — follow every section carefully.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16+ (App Router) |
| Styling | Tailwind CSS v4+ |
| Components | shadcn/ui |
| Animations | Framer Motion v12+ |
| Language | TypeScript |
| Font Loading | `next/font` |
| Image Optimization | `next/image` |

### Project Setup Commands

```bash
npx create-next-app@latest my-site --typescript --tailwind --eslint --app --yes
cd my-site
npx shadcn@latest init --defaults
npx shadcn@latest add button card badge separator sheet navigation-menu
npm install framer-motion
```

> **Note:** The generated project includes an `AGENTS.md` (referenced by `CLAUDE.md`) with guidance specific to the installed Next.js version. **Read it before writing any code.** APIs, file conventions, and configuration formats may differ from older versions.

---

## Critical Version-Specific Differences

### Tailwind CSS v4

Tailwind v4 has **no `tailwind.config.ts`**. All theme customization lives in `globals.css` using the `@theme inline` block:

```css
@import "tailwindcss";

@theme inline {
  --font-display: var(--font-display-var);
  --font-body: var(--font-body-var);
  --color-brand-primary: var(--brand-primary);
  /* etc. */
}

:root {
  --brand-primary: #your-color;
  --font-display-var: /* set by next/font variable */;
}
```

Do **not** create or reference `tailwind.config.ts` — it does not exist in v4 projects.

### shadcn/ui with Base UI

Current shadcn/ui uses `@base-ui/react` instead of Radix UI. The `Button` component **does not support `asChild`**. To render a button as a link, use `buttonVariants` from `@/components/ui/button` applied to a plain `<a>` tag:

```tsx
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ✅ Correct
<a href="/page" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "extra-classes")}>
  Click me
</a>

// ❌ Wrong — asChild does not exist
<Button asChild><a href="/page">Click me</a></Button>
```

### Framer Motion v12 — Variants Typing

When defining animation `Variants` objects with inline `transition` properties, TypeScript will widen the `ease` string to `string` and fail type checking. Always annotate variant objects explicitly:

```tsx
import { motion, type Variants } from "framer-motion"

// ✅ Correct — explicit type prevents string-widening error
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// ❌ Wrong — TypeScript infers ease as string, causing build failure
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
```

### Next.js 16 — Remote Images

To use images hosted on external domains with `next/image`, configure `remotePatterns` in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.example-cdn.com",
      },
    ],
  },
}
```

---

## Phase 1 — Brand Extraction (REQUIRED FIRST STEP)

> **You must do this before writing any code.** If the user provides a reference website URL, fetch and analyze it completely.

### Step 1: Fetch the Reference Website

Use your web fetch capability to visit the URL. Examine:
- The raw HTML structure
- Any `<style>` tags or linked CSS files
- `<meta>` tags for fonts and descriptions
- All visible text, headings, CTAs, and taglines
- Image `src` attributes and alt text

> **Note on dynamically-loaded sites:** Sites built on Squarespace, Webflow, or similar platforms load most CSS via JavaScript. A single fetch may not capture all styles. If colors or fonts are missing, fetch individual linked CSS files or look for inline `style=` attributes on specific elements. When in doubt, ask the user to inspect-element and share the hex value directly.

### Step 2: Extract the Color Palette

From the CSS variables, inline styles, or class names, identify:

```ts
const brand = {
  colors: {
    primary: "",       // Main brand color (buttons, links, accents)
    secondary: "",     // Supporting color
    background: "",    // Page background
    surface: "",       // Card/panel backgrounds
    text: "",          // Body text
    textMuted: "",     // Secondary/muted text
    border: "",        // Border/divider color
    accent: "",        // Highlight color (badges, callouts)
  }
}
```

Define colors in `globals.css` under `:root` and expose them in the `@theme inline` block:

```css
@theme inline {
  --color-brand-primary: var(--brand-primary);
  --color-brand-secondary: var(--brand-secondary);
  /* etc. */
}

:root {
  --brand-primary: #e8560a;
  --brand-secondary: #1b4332;
  /* etc. */
}
```

Reference these in components via inline styles (`style={{ color: "var(--brand-primary)" }}`) or Tailwind arbitrary values (`text-[var(--brand-primary)]`).

### Step 3: Extract Typography

Identify:
- **Display/Heading font** — used for `<h1>`, `<h2>`, hero text
- **Body font** — used for paragraphs and UI
- Font weights used (e.g., 400, 700, 900)
- Letter spacing tendencies (tight, wide, uppercase labels)

Load fonts via `next/font/google` in `layout.tsx`, using distinct variable names:

```ts
import { Playfair_Display, Inter } from "next/font/google"

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-var",   // distinct name avoids collision with @theme inline
  weight: ["400", "700", "900"],
  display: "swap",
})

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-var",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

Then in `globals.css`, bridge the font variables into Tailwind's `@theme inline`:

```css
@theme inline {
  --font-display: var(--font-display-var);
  --font-body: var(--font-body-var);
}
```

Apply in CSS base layer:

```css
@layer base {
  body { font-family: var(--font-body-var), sans-serif; }
  h1, h2, h3, h4, h5, h6 { font-family: var(--font-display-var), serif; }
}
```

### Step 4: Extract Copywriting & Voice

Capture the exact phrases, taglines, and CTAs from the reference site. Note:
- **Hero headline** — the big statement on the homepage
- **Sub-headline** — supporting sentence below the hero
- **CTA button text** — what the primary buttons say
- **Section headers** — how they title features, about, pricing sections
- **Micro-copy patterns** — ALL CAPS labels? Em-dashes? Short punchy fragments?
- **Tone** — formal/professional, playful/casual, technical/bold, warm/human?

Use this extracted copy (or close paraphrases matching the same tone) as placeholder content throughout the build.

### Step 5: Extract Images & Visual Assets

From the reference site, note:
- Logo image URL — use the actual hosted URL with `next/image` and `remotePatterns`
- Hero image style (photography, illustration, abstract, product screenshot)
- Whether images have overlays, gradients, or border treatments
- Any background patterns, textures, or decorative elements

Use `next/image` for all images. Add the image hostname to `remotePatterns` in `next.config.ts`.

---

## Phase 2 — File Structure

Scaffold the following structure before building components:

```
/app
  layout.tsx          ← Root layout with fonts, metadata, video preload link
  page.tsx            ← Homepage (imports all sections)
  globals.css         ← @theme inline, CSS variables, base styles

/components
  /ui                 ← shadcn components (auto-generated)
  /layout
    Navbar.tsx
    Footer.tsx
  /sections
    Hero.tsx
    MediaTicker.tsx   ← Auto-scrolling logo ticker (see Phase 6)
    ScrollVideo.tsx   ← Scroll-driven video section (see Phase 4)
    Features.tsx
    About.tsx
    CTA.tsx
  /shared
    SectionWrapper.tsx

/public
  /assets
    video.mp4         ← User's local scroll video
```

---

## Phase 3 — Component Guidelines

### Navbar

- Sticky with `backdrop-blur` and subtle border on scroll
- Logo on the left (use actual brand logo via `next/image`), nav links center or right
- Mobile: hamburger menu using shadcn `Sheet` component
- CTA button using the brand's primary color — rendered as `<a>` with `buttonVariants`, **not** `<Button asChild>`

```tsx
"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Nav content */}
      <a href="#cta" className={cn(buttonVariants({ size: "sm" }), "rounded-none uppercase tracking-widest text-xs")}>
        Primary CTA
      </a>
    </motion.nav>
  )
}
```

### Hero Section

- Full-viewport height (`min-h-screen`)
- Background: full-bleed `next/image` with `fill` + dark overlay (`bg-black/50`)
- Framer Motion staggered entrance animation — **annotate `Variants` explicitly**
- Typography: display font at large scale (`text-6xl` to `text-9xl`)
- Buttons rendered as `<a>` tags with `buttonVariants`
- Scroll indicator arrow at the bottom

```tsx
import { type Variants } from "framer-motion"

const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}
```

### Features / Cards

- 3-column grid on desktop, 1-column on mobile
- Use a `gap-px bg-[border-color]` grid for a ruled-line card layout (no individual card borders)
- Animate cards into view with `whileInView` + `viewport={{ once: true }}`
- Icons from `lucide-react`
- Annotate stagger variants with `type Variants`

### Footer

- Brand logo via `next/image` (invert with `brightness-0 invert` if logo needs to appear white on dark bg)
- Navigation links grouped by category
- Social links
- Copyright line with brand voice
- Background uses brand primary/dark color

---

## Phase 4 — Scroll-Driven Video Section (CRITICAL)

This is the signature interactive feature. It goes **directly below the Hero section** (or after the Media Ticker if one is present).

### Behavior

As the user scrolls down, the video **plays frame-by-frame** in sync with scroll position. The video is pinned/sticky while the user scrolls through a tall scroll container.

### Implementation — Threshold-Based Seeking (Smooth, No Blur)

Use a `requestAnimationFrame` loop with a seek threshold to avoid blurry intermediate frames. Directly lerping `video.currentTime` on every scroll event causes the browser to decode many blurry mid-frames. Instead, only seek when the scroll position changes by a meaningful amount:

```tsx
"use client"
import { useEffect, useRef, useState } from "react"

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    video.pause()
    video.currentTime = 0

    // Only seek when scroll changes by more than this threshold (in seconds)
    // Keeps the video on clean keyframes instead of blurry decoded mid-frames
    const SEEK_THRESHOLD = 0.04
    let lastTime = 0
    let rafId: number
    let pendingProgress = 0
    let dirty = false

    const commit = () => {
      if (dirty && video.readyState >= 2) {
        dirty = false
        const duration = video.duration || 1
        const targetTime = pendingProgress * duration
        if (Math.abs(targetTime - lastTime) >= SEEK_THRESHOLD) {
          video.currentTime = targetTime
          lastTime = targetTime
        }
      }
      rafId = requestAnimationFrame(commit)
    }

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const containerHeight = container.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      if (scrolled < 0 || scrolled > containerHeight) return
      pendingProgress = scrolled / containerHeight
      setProgress(pendingProgress)
      dirty = true
    }

    rafId = requestAnimationFrame(commit)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/assets/video.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
```

> **Important:** Place the video at `/public/assets/video.mp4`. The `src` in `<video>` must be `"/assets/video.mp4"`.

### Why Not Lerp?

A lerp (`video.currentTime += (target - current) * 0.1`) seeks through many intermediate frames per RAF tick, causing the browser to render blurry decoded frames between keyframes. The threshold approach skips those in-between frames and only seeks to positions that land near clean keyframes.

### Scroll Height Tuning

- `h-[400vh]` → video plays over 4 full viewport-heights of scroll
- Increase to `h-[500vh]` or more for slower, more deliberate playback
- Match to the video's duration — longer videos benefit from taller containers

### Preloading

Add to `<head>` in `layout.tsx`:

```tsx
<link rel="preload" as="video" href="/assets/video.mp4" />
```

---

## Phase 5 — Animation System

Use Framer Motion consistently. Always import and apply `type Variants` when defining variant objects with inline transitions.

### Scroll Reveal

```tsx
"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export function SectionWrapper({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}
```

### Staggered Lists

```tsx
import { type Variants } from "framer-motion"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
```

### Hover Effects

```tsx
<motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
  {/* Card content */}
</motion.div>
```

---

## Phase 6 — Media Ticker (Optional)

An auto-scrolling logo strip is a common "As Seen On" or "Trusted By" section. Place it directly below the Hero.

### Implementation

Duplicate the logos array to create a seamless infinite loop. Use a CSS `@keyframes` animation rather than Framer Motion (simpler and more performant for continuous scrolling). Apply an edge fade with `[mask-image:linear-gradient(...)]`.

```tsx
"use client"
import Image from "next/image"

const logos = [
  { name: "Publication A", src: "https://..." },
  { name: "Publication B", src: "https://..." },
  // ...
]

const tickerLogos = [...logos, ...logos] // duplicate for seamless loop

export function MediaTicker() {
  return (
    <section className="py-14 bg-white border-y border-[#e5e5e5] overflow-hidden">
      <p className="text-center text-xs uppercase tracking-widest text-[#999] mb-8">As Seen On</p>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-16 items-center animate-ticker whitespace-nowrap">
          {tickerLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center h-16 w-52">
              <Image
                src={logo.src}
                alt={logo.name}
                width={200}
                height={64}
                className="h-14 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 28s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
```

- Logos appear grayscale at rest, full color on hover
- Pauses on hover
- Adjust `28s` to control speed — higher = slower
- Size logos with `h-14 w-auto` — increase for larger logos

---

## Phase 7 — Responsiveness & Accessibility

- All layouts must work at `sm` (375px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Use Tailwind responsive prefixes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- All images require meaningful `alt` text
- All interactive elements must be keyboard-accessible
- Color contrast must meet WCAG AA (4.5:1 for body text)
- Reduce motion for users who prefer it:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Phase 8 — Performance

- Use `next/image` with `priority` on hero images
- Add `loading="lazy"` on below-fold images
- Video must use `preload="auto"` and `muted` + `playsInline`
- No unused shadcn components — only install what's needed
- Use `"use client"` only on components that need it (Navbar, ScrollVideo, animated sections)
- Keep Server Components for static sections (Footer content, non-animated cards)
- Run `npm run build` after completing all components to catch TypeScript errors before testing

---

## Execution Order

Follow this exact order when building:

1. **Read `AGENTS.md`** to understand version-specific conventions for the installed Next.js version
2. **Extract brand** from reference URL (colors, fonts, copy, logo URL, images)
3. Configure `next.config.ts` with `remotePatterns` for any external image hosts
4. Run project setup commands
5. Configure `globals.css` with `@theme inline` block and CSS variables
6. Build `layout.tsx` with font loading, metadata, and video preload link
7. Build `Navbar.tsx`
8. Build `Hero.tsx`
9. Build `MediaTicker.tsx` (if "As Seen On" logos are available)
10. Build `ScrollVideo.tsx` (threshold-based seeking)
11. Build `Features.tsx`
12. Build `About.tsx`
13. Build `CTA.tsx`
14. Build `Footer.tsx`
15. Assemble `page.tsx`
16. Run `npm run build` — fix any TypeScript errors
17. Test scroll behavior, responsiveness, and animations
18. Final polish: spacing, typography scale, hover states

---

## Quality Bar

Before marking complete, verify:

- [ ] Brand colors applied consistently — all dark/colored sections use the same brand color token
- [ ] Extracted fonts loading correctly via `next/font` with distinct variable names
- [ ] Hero has staggered entrance animation with `type Variants` annotation
- [ ] Scroll video pins correctly, plays in sync with scroll, and uses threshold-based seeking (no blur)
- [ ] All sections animate in on scroll with `whileInView`
- [ ] Navbar becomes opaque + blurred on scroll
- [ ] Logo in navbar uses actual brand logo via `next/image`
- [ ] No `<Button asChild>` — all link-buttons use `<a>` + `buttonVariants`
- [ ] No `tailwind.config.ts` — all theme tokens in `globals.css` `@theme inline`
- [ ] All `Variants` objects annotated with `type Variants` import
- [ ] External image domains listed in `next.config.ts` `remotePatterns`
- [ ] Mobile layout is clean at 375px
- [ ] `npm run build` passes with zero errors
- [ ] Video served from `/public/assets/video.mp4`
- [ ] Copy matches the tone and voice of the reference site
