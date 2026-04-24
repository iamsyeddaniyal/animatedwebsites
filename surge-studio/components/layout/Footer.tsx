import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const footerLinks: Record<string, string[]> = {
  Services: [
    "Strategy",
    "Branding",
    "Campaigns",
    "UI/UX Design",
    "Web Development",
    "Video",
  ],
  Studio: ["About", "Process", "Work", "Journal"],
  Connect: ["LinkedIn", "Instagram", "hello@surgestudio.co"],
}

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1c1c1c] px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 border-b border-[#1c1c1c] pb-8">
          <a
            href="/"
            className="text-[#f0ebe0] font-black text-3xl tracking-tight"
            style={{ fontFamily: "var(--font-display-var), serif" }}
          >
            surge<span className="text-[#c9a227]">—</span>
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-none uppercase tracking-widest text-xs bg-[#c9a227] text-[#080808] hover:bg-[#e8b84b] border-none"
            )}
          >
            Start a Project
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-xs">
              A kinetic design and growth studio. We make enterprises move like
              startups — without losing their footing.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[#f0ebe0] text-xs uppercase tracking-widest font-mono mb-4">
                {category}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#6b6b6b] text-sm hover:text-[#f0ebe0] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#1c1c1c] pt-8">
          <p className="text-[#6b6b6b] text-xs font-mono">
            surge— ©2025. All rights reserved.
          </p>
          <p className="text-[#6b6b6b] text-xs font-mono italic">
            If you aren&apos;t moving, you&apos;re standing still.
          </p>
        </div>
      </div>
    </footer>
  )
}
