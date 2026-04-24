"use client"
import { motion, type Variants } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function CTASection() {
  return (
    <section
      id="contact"
      className="py-32 md:py-48 px-6 md:px-10 bg-[#c9a227] relative overflow-hidden"
    >
      {/* Background diagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #080808 0px,
            #080808 1px,
            transparent 1px,
            transparent 24px
          )`,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between mb-16 border-b border-[#080808]/20 pb-6">
          <span className="text-[#080808]/50 text-xs uppercase tracking-widest font-mono">
            Contact
          </span>
          <span className="text-[#080808]/50 text-xs tracking-widest font-mono">
            [ 06 / 06 ]
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-[clamp(3rem,9vw,8.5rem)] font-black leading-[0.88] text-[#080808] mb-8"
            style={{ fontFamily: "var(--font-display-var), serif" }}
          >
            Ready to move
            <br />
            <em className="italic">at the speed</em>
            <br />
            of good?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[#080808]/70 text-xl max-w-xl mx-auto mb-10"
          >
            Tell us what&apos;s slowing you down. We&apos;ll help you leave it behind.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="mailto:hello@surgestudio.co"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-none uppercase tracking-widest text-xs bg-[#080808] text-[#c9a227] hover:bg-[#141414] border-none px-10 h-12"
              )}
            >
              Let&apos;s Work Together →
            </a>
            <a
              href="mailto:hello@surgestudio.co"
              className="text-[#080808] text-xs uppercase tracking-widest border-b border-[#080808] pb-1 hover:opacity-60 transition-opacity font-mono"
            >
              hello@surgestudio.co
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
