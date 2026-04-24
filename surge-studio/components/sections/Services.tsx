"use client"
import { motion, type Variants } from "framer-motion"
import {
  Target,
  PenTool,
  Megaphone,
  Layers,
  Code2,
  Video,
  Zap,
  FileText,
} from "lucide-react"

const services = [
  {
    icon: Target,
    title: "Strategy",
    desc: "Market positioning, competitor analysis, and growth roadmaps built to survive contact with reality — not just look good in a presentation.",
  },
  {
    icon: PenTool,
    title: "Branding",
    desc: "Visual identity systems, brand voice, and guidelines that scale from a landing page to a Times Square billboard without losing their nerve.",
  },
  {
    icon: Megaphone,
    title: "Campaigns",
    desc: "Integrated campaigns across digital, print, and experiential. The kind that make noise in the right rooms and silence in the wrong ones.",
  },
  {
    icon: Layers,
    title: "Art Direction",
    desc: "Visual concepts and design systems that communicate ambition before anyone reads a single word. Because first impressions last forever.",
  },
  {
    icon: FileText,
    title: "Copywriting",
    desc: "Words that read like poetry and sell like a seasoned closer. Messaging that earns its place on the page and actually gets read.",
  },
  {
    icon: Zap,
    title: "UI/UX Design",
    desc: "Interfaces that feel inevitable. Digital products that users remember — and come back to — because they're genuinely delightful to use.",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Fast, accessible, and built to convert. Sites that perform as well as they look and never keep your customers waiting.",
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Brand films, product demos, and content series that stop the scroll and hold attention long enough to change a mind.",
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 border-b border-[#1c1c1c] pb-6">
          <span className="text-[#6b6b6b] text-xs uppercase tracking-widest font-mono">
            Services
          </span>
          <span className="text-[#6b6b6b] text-xs tracking-widest font-mono">
            [ 02 / 06 ]
          </span>
        </div>

        <div className="mb-16">
          <h2
            className="text-[clamp(2rem,5vw,5rem)] font-black leading-[0.92] text-[#f0ebe0]"
            style={{ fontFamily: "var(--font-display-var), serif" }}
          >
            Everything you need.
            <br />
            <em className="italic text-[#c9a227]">Nothing you don&apos;t.</em>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1c1c1c]"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02, backgroundColor: "#0f0f0f" }}
                className="bg-[#0a0a0a] p-8 group cursor-default transition-colors duration-200"
              >
                <Icon
                  size={22}
                  className="text-[#c9a227] mb-5 group-hover:scale-110 transition-transform duration-200"
                />
                <h3
                  className="text-[#f0ebe0] font-bold text-base mb-3 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-display-var), serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
