"use client"
import { motion, type Variants } from "framer-motion"

const sprints = [
  {
    week: "Week One",
    title: "Understand & Define",
    steps: [
      "Deep-dive brand and business audit",
      "Competitive landscape mapping",
      "Stakeholder interviews — the real ones",
      "Creative brief sign-off (two rounds, max)",
    ],
  },
  {
    week: "Week Two",
    title: "Build & Ship",
    steps: [
      "Design sprints — not design marathons",
      "Copy, concepts, and code in parallel",
      "Two feedback rounds — that's the limit",
      "Launch with real-time analytics from day one",
    ],
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Process() {
  return (
    <section id="process" className="py-32 px-6 md:px-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 border-b border-[#1c1c1c] pb-6">
          <span className="text-[#6b6b6b] text-xs uppercase tracking-widest font-mono">
            How We Work
          </span>
          <span className="text-[#6b6b6b] text-xs tracking-widest font-mono">
            [ 03 / 06 ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.92] text-[#f0ebe0] mb-6"
              style={{ fontFamily: "var(--font-display-var), serif" }}
            >
              Two weeks.
              <br />
              <em className="italic text-[#c9a227]">Real results.</em>
            </h2>
            <p className="text-[#6b6b6b] text-base leading-relaxed max-w-md">
              Every engagement runs on a two-week sprint cycle. No scope creep.
              No endless revision loops. No waiting six months for a website
              that should take six weeks. We move, you move, the market moves.
            </p>
            <div className="mt-8 p-6 border border-[#1c1c1c] bg-[#0a0a0a]">
              <p className="text-[#c9a227] text-xs uppercase tracking-widest font-mono mb-3">
                The Ground Rule
              </p>
              <p className="text-[#f0ebe0] text-base leading-relaxed">
                If you need more than two weeks of feedback cycles, we're
                solving the wrong problem. Let's start over.
              </p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-0"
          >
            {sprints.map((sprint, index) => (
              <motion.div
                key={sprint.week}
                variants={itemVariants}
                className="border-t border-[#1c1c1c] py-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#c9a227] flex items-center justify-center flex-shrink-0">
                    <span
                      className="text-[#080808] font-black text-base"
                      style={{ fontFamily: "var(--font-display-var), serif" }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#c9a227] text-xs uppercase tracking-widest font-mono mb-1">
                      {sprint.week}
                    </p>
                    <h3
                      className="text-[#f0ebe0] font-bold text-xl mb-4"
                      style={{ fontFamily: "var(--font-display-var), serif" }}
                    >
                      {sprint.title}
                    </h3>
                    <ul className="space-y-2">
                      {sprint.steps.map((step) => (
                        <li
                          key={step}
                          className="text-[#6b6b6b] text-sm flex items-center gap-3"
                        >
                          <span className="w-1 h-1 bg-[#c9a227] rounded-full inline-block flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="border-t border-[#1c1c1c] py-8">
              <p className="text-[#f0ebe0] text-xs uppercase tracking-widest font-mono">
                Then we do it again. And again.
                <br />
                Until you&apos;re unstoppable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
