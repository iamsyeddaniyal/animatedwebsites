"use client"
import { motion, type Variants } from "framer-motion"

const rules = [
  {
    number: "01",
    rule: "Speed is a feature.",
    detail:
      "Every day you spend in committee is a day your competitor spends in market. We don't wait for perfect. We ship and improve.",
  },
  {
    number: "02",
    rule: "Clarity beats cleverness.",
    detail:
      "If your customer needs a translator to understand your value proposition, you don't have one. We write and design for immediate comprehension.",
  },
  {
    number: "03",
    rule: "Two feedback rounds. Final answer.",
    detail:
      "Unlimited revisions is a myth that benefits no one. Structure creates focus. Constraints create better work.",
  },
  {
    number: "04",
    rule: "We say no more than yes.",
    detail:
      "We take on fewer clients than we could. This means your project gets our full attention — not whatever's left after twelve others.",
  },
  {
    number: "05",
    rule: "Discomfort is part of the service.",
    detail:
      "If we aren't pushing you toward something you'd never thought to do, we aren't doing our job. Comfortable is just slow-moving mediocre.",
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Rules() {
  return (
    <section className="py-32 px-6 md:px-10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 border-b border-[#1c1c1c] pb-6">
          <span className="text-[#6b6b6b] text-xs uppercase tracking-widest font-mono">
            How We Operate
          </span>
          <span className="text-[#6b6b6b] text-xs tracking-widest font-mono">
            [ 05 / 06 ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <h2
            className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.92] text-[#f0ebe0]"
            style={{ fontFamily: "var(--font-display-var), serif" }}
          >
            The rules we
            <br />
            <em className="italic text-[#c9a227]">don&apos;t break.</em>
          </h2>
          <p className="text-[#6b6b6b] text-base leading-relaxed self-end">
            We&apos;re easy to work with. We&apos;re not easy to push around. There&apos;s a
            difference, and the difference is what makes the work actually good.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-0"
        >
          {rules.map((rule) => (
            <motion.div
              key={rule.number}
              variants={itemVariants}
              className="border-t border-[#1c1c1c] py-8 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-8 items-start"
            >
              <span className="text-[#c9a227] font-mono text-xs tracking-widest">
                {rule.number}
              </span>
              <h3
                className="text-[#f0ebe0] font-bold text-xl md:text-2xl"
                style={{ fontFamily: "var(--font-display-var), serif" }}
              >
                {rule.rule}
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">
                {rule.detail}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-[#1c1c1c]" />
        </motion.div>
      </div>
    </section>
  )
}
