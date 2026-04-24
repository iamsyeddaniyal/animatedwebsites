"use client"

const services = [
  "Strategy",
  "Branding",
  "Campaigns",
  "Art Direction",
  "Copywriting",
  "UI/UX Design",
  "Web Development",
  "Video Production",
  "Growth Marketing",
  "Content Systems",
]

const tickerItems = [...services, ...services]

export function ServicesTicker() {
  return (
    <section className="py-8 bg-[#c9a227] overflow-hidden border-y border-[#b8901f]">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex items-center animate-services-ticker whitespace-nowrap">
          {tickerItems.map((service, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <span
                className="text-[#080808] font-black uppercase tracking-widest text-sm px-8"
                style={{ fontFamily: "var(--font-display-var), serif" }}
              >
                {service}
              </span>
              <span className="text-[#080808]/30 text-base select-none">◆</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes services-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-services-ticker {
          animation: services-ticker 30s linear infinite;
        }
        .animate-services-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
