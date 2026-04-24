"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export function SectionWrapper({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
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
