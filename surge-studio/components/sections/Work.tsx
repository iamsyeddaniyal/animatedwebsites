"use client"
import { motion, type Variants } from "framer-motion"

const results = [
  {
    before:
      "No clear brand voice. Three different agencies. Zero visual cohesion across channels.",
    after:
      "One unified identity across every touchpoint. 40% lift in brand recall. Campaign featured in industry press.",
    industry: "Enterprise SaaS",
  },
  {
    before:
      "Product launch sitting 18 months out on the roadmap. Usual reasons. Usual excuses.",
    after:
      "Launched in 11 weeks flat. 2,000 waitlist sign-ups in the first 48 hours. Team celebrated properly.",
    industry: "Consumer Tech",
  },
  {
    before:
      "Website converting at 0.8%. Everyone on the team had a theory. Nobody had a plan.",
    after:
      "New site live in 3 weeks. Conversion rate: 3.4%. Sales team stopped blaming the funnel.",
    industry: "B2B Fintech",
  },
  {
    before:
      "Annual report that looked like a spreadsheet in a blazer. CFO uncomfortable. Board uneasy.",
    after:
      "A document so well-designed it became a recruiting tool. Three senior hires cited it in interviews.",
    industry: "Financial Services",
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

export function Work() {
  return (
    <section id="work" className="py-32 px-6 md:px-10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 border-b border-[#1c1c1c] pb-6">
          <span className="text-[#6b6b6b] text-xs uppercase tracking-widest font-mono">
            Work
          </span>
          <span className="text-[#6b6b6b] text-xs tracking-widest font-mono">
            [ 04 / 06 ]
          </span>
        </div>

        <div className="mb-16">
          <h2
            className="text-[clamp(2rem,5vw,5rem)] font-black leading-[0.92] text-[#f0ebe0]"
            style={{ fontFamily: "var(--font-display-var), serif" }}
          >
            Before Surge.
            <br />
            <em className="italic text-[#c9a227]">After Surge.</em>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-px bg-[#1c1c1c]"
        >
          {results.map((result, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-[#0a0a0a] grid grid-cols-1 md:grid-cols-2"
            >
              <div className="p-8 md:p-10 md:border-r border-b md:border-b-0 border-[#1c1c1c]">
                <p className="text-[#6b6b6b] text-xs uppercase tracking-widest font-mono mb-4">
                  Before
                </p>
                <p className="text-[#3a3a3a] text-base md:text-lg leading-relaxed line-through decoration-[#2a2a2a]">
                  {result.before}
                </p>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#c9a227] text-xs uppercase tracking-widest font-mono">
                    After
                  </p>
                  <span className="text-[#6b6b6b] text-xs uppercase tracking-widest font-mono border border-[#1c1c1c] px-2 py-1">
                    {result.industry}
                  </span>
                </div>
                <p className="text-[#f0ebe0] text-base md:text-lg leading-relaxed">
                  {result.after}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
