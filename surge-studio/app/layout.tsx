import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-var",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
})

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-var",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Surge Studio — We Build Brands That Refuse to Stand Still",
  description:
    "Surge is a kinetic design and growth studio that embeds directly into your team to build, launch, and grow brands at startup speed.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="video" href="/assets/video.webm" />
      </head>
      <body className="min-h-full flex flex-col bg-[#080808]">{children}</body>
    </html>
  )
}
