"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const categories = [
  {
    name: "Dolls & Accessories",
    slug: "dolls",
    bgColor: "bg-[#FF77B8]",
    image: "/cute-doll.jpg",
  },
  {
    name: "Cars & Vehicle Playsets",
    slug: "vehicles",
    bgColor: "bg-[#FFB74D]",
    image: "/toy-race-car.jpg",
  },
  {
    name: "Board & Card Games",
    slug: "games",
    bgColor: "bg-[#4D94FF]",
    image: "/jungle-animal-puzzle.jpg",
  },
  {
    name: "Action Figures",
    slug: "action-figures",
    bgColor: "bg-[#FF5252]",
    image: "/cute-toy-robot.jpg",
  },
  {
    name: "Building & Construction",
    slug: "building",
    bgColor: "bg-[#9575CD]",
    image: "/colorful-toy-blocks.jpg",
  },
  {
    name: "Learning & Educational",
    slug: "educational",
    bgColor: "bg-[#4DD0E1]",
    image: "/kids-science-kit.jpg",
  },
  {
    name: "Soft Toys",
    slug: "soft-toys",
    bgColor: "bg-[#AED581]",
    image: "/cute-plush-bear.jpg",
  },
  {
    name: "Art & Craft Kits",
    slug: "crafts",
    bgColor: "bg-[#FF8A65]",
    image: "/wooden-train-set.jpg",
  },
]

export function CategoryFilter({
  standalone = false,
  onCategorySelect,
  activeCategory,
}: {
  standalone?: boolean
  onCategorySelect?: (slug: string) => void
  activeCategory?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (cards.length === 0) return

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.05,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className={`mx-auto max-w-7xl ${standalone ? "p-0" : "px-4 py-12 md:py-16"}`} ref={containerRef}>
      {!standalone && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#FF4D4D] tracking-tight">SHOP BY CATEGORY</h2>
          <Link
            href="/products"
            className="text-[#FF4D4D] font-bold underline decoration-4 underline-offset-8 hover:text-[#FF4D4D]/80 transition-all text-xl mt-4 md:mt-0"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      )}

      <div
        className={`grid grid-cols-2 ${standalone ? "md:grid-cols-4 lg:grid-cols-8" : "md:grid-cols-3 lg:grid-cols-4"} gap-4`}
      >
        {categories.map((category, index) => {
          const isSelected = activeCategory === category.slug

          const Content = (
            <div
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`group cursor-pointer transition-all duration-300 ${isSelected ? "scale-95 ring-4 ring-primary ring-offset-4 rounded-[2rem]" : ""}`}
              onClick={() => onCategorySelect?.(isSelected ? "all" : category.slug)}
            >
              <div
                className={`relative flex aspect-square flex-col items-center justify-between overflow-hidden rounded-[2rem] border-2 border-dashed border-white/50 ${category.bgColor} p-4 text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl`}
              >
                <h3
                  className={`relative z-10 ${standalone ? "text-xs" : "text-xl"} font-black leading-tight text-white drop-shadow-sm`}
                >
                  {category.name}
                </h3>
                <div className={`relative z-10 ${standalone ? "h-16" : "h-24"} w-full mt-auto`}>
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          )

          if (standalone) return <div key={category.slug}>{Content}</div>

          return (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className="block h-full">
              {Content}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
