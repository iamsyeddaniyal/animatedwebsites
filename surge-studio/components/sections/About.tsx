"use client"
import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 border-b border-[#1c1c1c] pb-6">
          <span className="text-[#6b6b6b] text-xs uppercase tracking-widest font-mono">
            About
          </span>
          <span className="text-[#6b6b6b] text-xs tracking-widest font-mono">
            [ 01 / 06 ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.92] text-[#f0ebe0]"
              style={{ fontFamily: "var(--font-display-var), serif" }}
            >
              Goliath,
              <br />
              meet your
              <br />
              <em className="italic text-[#c9a227]">new obsession.</em>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6 pt-2"
          >
            <motion.p
              variants={itemVariants}
              className="text-[#f0ebe0] text-lg md:text-xl leading-relaxed"
            >
              Most big companies move like cargo ships. Deliberate. Slow.
              Committees approving committees. We help you move like a
              speedboat.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[#6b6b6b] text-base leading-relaxed"
            >
              Surge embeds directly into your team — not as a vendor, but as an
              extension of your ambition. We think fast, build faster, and ship
              before the next quarterly review needs a deck.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[#6b6b6b] text-base leading-relaxed"
            >
              Three years. Forty brands. Hundreds of campaigns that actually
              moved the needle. No fluff. No strategies that live in a shared
              drive forever. Just work that works.
            </motion.p>
            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="#contact"
                className="text-[#c9a227] text-xs uppercase tracking-widest border-b border-[#c9a227] pb-1 hover:text-[#e8b84b] hover:border-[#e8b84b] transition-colors font-mono"
              >
                Work with us →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
