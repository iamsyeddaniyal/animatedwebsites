import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { ServicesTicker } from "@/components/sections/ServicesTicker"
import { ScrollVideo } from "@/components/sections/ScrollVideo"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { Work } from "@/components/sections/Work"
import { Rules } from "@/components/sections/Rules"
import { CTASection } from "@/components/sections/CTASection"

export default function Home() {
  return (
    <main className="bg-[#080808]">
      <Navbar />
      <Hero />
      <ServicesTicker />
      <ScrollVideo />
      <About />
      <Services />
      <Process />
      <Work />
      <Rules />
      <CTASection />
      <Footer />
    </main>
  )
}
