"use client"
import { motion, type Variants } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowDown } from "lucide-react"

const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const stats = [
  { value: "3+", label: "Years Moving" },
  { value: "40+", label: "Brands Built" },
  { value: "$100M+", label: "Client Revenue" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-20 bg-[#080808] overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, #f0ebe0 59px, #f0ebe0 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, #f0ebe0 59px, #f0ebe0 60px)`,
        }}
      />

      {/* Section marker */}
      <div className="absolute top-20 right-6 md:right-10 text-[#6b6b6b] text-xs tracking-widest font-mono pt-4">
        [ 00 / 06 ]
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.p
            variants={itemVariants}
            className="text-[#c9a227] text-xs uppercase tracking-[0.3em] font-mono"
          >
            Design &amp; Growth Studio — Est. 2022
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.88] text-[#f0ebe0] max-w-6xl"
            style={{ fontFamily: "var(--font-display-var), serif" }}
          >
            We build
            <br />
            brands that
            <br />
            <em className="italic text-[#c9a227]">refuse to</em>
            <br />
            stand still.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[#6b6b6b] text-lg md:text-xl max-w-lg leading-relaxed"
          >
            Surge embeds directly into your team — cutting through slow thinking
            to build, launch, and grow at the speed of ambition.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-none uppercase tracking-widest text-xs bg-[#c9a227] text-[#080808] hover:bg-[#e8b84b] border-none px-8 h-12"
              )}
            >
              Start Moving →
            </a>
            <a
              href="#work"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-none uppercase tracking-widest text-xs border-[#2a2a2a] text-[#f0ebe0] hover:bg-[#141414] hover:text-[#f0ebe0] px-8 h-12"
              )}
            >
              See Our Work
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-12 pt-4 border-t border-[#1c1c1c]"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-3xl font-black text-[#f0ebe0]"
                  style={{ fontFamily: "var(--font-display-var), serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#6b6b6b] text-xs uppercase tracking-widest mt-1 font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b6b6b]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  )
}
