"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#1c1c1c]"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-[#f0ebe0] font-black text-xl tracking-tight"
            style={{ fontFamily: "var(--font-display-var), serif" }}
          >
            surge<span className="text-[#c9a227]">—</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#6b6b6b] hover:text-[#f0ebe0] transition-colors duration-200 text-xs uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden md:inline-flex rounded-none uppercase tracking-widest text-xs bg-[#c9a227] text-[#080808] hover:bg-[#e8b84b] border-none"
              )}
            >
              Start a Project
            </a>
            <button
              className="md:hidden text-[#f0ebe0] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-[#f0ebe0] text-5xl font-black uppercase tracking-widest hover:text-[#c9a227] transition-colors"
                  style={{ fontFamily: "var(--font-display-var), serif" }}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="text-[#c9a227] text-xl uppercase tracking-widest mt-4 border-b border-[#c9a227] pb-1"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                Start a Project →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
