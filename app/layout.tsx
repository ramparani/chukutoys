import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { Suspense } from "react"
import OfferBanner from "@/components/site/offer-banner"

export const metadata: Metadata = {
  title: "ChuKuToys — Online Toy Shop",
  description: "ChuKuToys is a joyful online toy shop. Play. Learn. Smile.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} kids-bg`}>
        <Suspense fallback={<div>Loading...</div>}>
          <OfferBanner />
          <Header />
          {children}
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
