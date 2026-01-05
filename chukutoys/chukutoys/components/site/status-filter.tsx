"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const statuses = [
  {
    id: "trending",
    label: "Trending",
    description: "Hot right now",
    gradient: "from-orange-400 via-red-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="url(#trending-gradient)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="trending-gradient" x1="2" y1="2" x2="22" y2="21.02">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "top-selling",
    label: "Top Selling",
    description: "Customer favorites",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L9.5 8.5L3 9.5L7.5 14L6.5 21L12 17.5L17.5 21L16.5 14L21 9.5L14.5 8.5L12 2Z"
          fill="url(#top-selling-gradient)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10" r="2" fill="white" />
        <defs>
          <linearGradient id="top-selling-gradient" x1="3" y1="2" x2="21" y2="21">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "new",
    label: "New Arrivals",
    description: "Just landed",
    gradient: "from-blue-400 via-indigo-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
          fill="url(#new-gradient)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 5L8 8M19 5L16 8M5 19L8 16M19 19L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="new-gradient" x1="2" y1="2" x2="22" y2="22">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "deals",
    label: "Best Deals",
    description: "Save big today",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 7L5 3H19L21 7M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7M3 7H21"
          stroke="url(#deals-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 11L12 14L15 11"
          stroke="url(#deals-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="deals-gradient" x1="3" y1="3" x2="21" y2="21">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
]

export function StatusFilter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll(".status-card")

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      },
    )
  }, [])

  const handleMouseEnter = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredId(id)
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -8,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredId(null)
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shop by Collection</h2>
        <p className="text-gray-600 text-lg">Discover our curated toy selections</p>
      </div>
      <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {statuses.map((status) => (
          <Link key={status.id} href={`/products?filter=${status.id}`} className="block">
            <div
              className={`status-card group relative overflow-hidden rounded-2xl ${status.bgColor} p-6 shadow-lg transition-shadow hover:shadow-2xl cursor-pointer`}
              onMouseEnter={(e) => handleMouseEnter(status.id, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${status.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              <div className="relative mb-4 flex justify-center text-gray-700 transition-transform duration-300 group-hover:scale-110">
                {status.icon}
              </div>

              <div className="relative text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{status.label}</h3>
                <p className="text-sm text-gray-600">{status.description}</p>
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -translate-x-full transition-all duration-700 group-hover:translate-x-full group-hover:opacity-20`}
              />

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${status.gradient}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
