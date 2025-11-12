import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import "@/styles/glitter.css"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { Suspense } from "react"
import OfferBanner from "@/components/site/offer-banner"

export const metadata: Metadata = {
  title: "ChuKuToys — Play. Learn. Smile.",
  description: "ChuKuToys is a joyful online toy shop where imagination leads the way. Discover safe, colorful toys crafted to help kids grow through play. Free shipping on all orders!",
  keywords: "ChukuToys, Toys, Trending Toys, Chennai, Tamilnadu, Kids Toys, Toy shop, online toy shop, kids toys, educational toys, plush toys, safe toys, imaginative play",
  generator: "GENY",
  authors: [{ name: "ChuKuToys", url: "https://chukutoys.vercel.app/" }],
  creator: "ChuKuToys",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ChuKuToys — Play. Learn. Smile.",
    description:
      "Explore a magical world of toys at ChuKuToys. Shop safe, colorful, and imaginative toys for kids of all ages.",
    url: "https://chukutoys.vercel.app/",
    siteName: "ChuKuToys",
    images: [
      {
        url: "https://chukutoys.vercel.app/images/home-hero-illustration.jpg",
        width: 1200,
        height: 630,
        alt: "Colorful ChuKuToys illustration with toys and rainbow"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ChuKuToys — Play. Learn. Smile.",
    description:
      "Discover joyful toys that spark imagination and growth. Free shipping on all orders!",
    images: [
      "https://chukutoys.vercel.app/images/home-hero-illustration.jpg"
    ]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  metadataBase: new URL("https://chukutoys.vercel.app")
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
        <SpeedInsights />
      </body>
    </html>
  )
}
