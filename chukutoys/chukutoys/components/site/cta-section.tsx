"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current.querySelector(".cta-content"),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    )

    gsap.fromTo(
      containerRef.current.querySelector(".cta-image"),
      { opacity: 0, x: 50, scale: 0.8 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-20" ref={containerRef}>
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary to-primary/90 p-8 md:p-16">
        <div className="relative z-10 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="cta-content space-y-6 text-white">
            <h2 className="text-pretty text-4xl font-black leading-tight md:text-6xl">
              Unlock a World of <span className="text-yellow-300">Imagination!</span>
            </h2>
            <p className="max-w-md text-xl opacity-90">
              Discover our latest collection of premium toys designed to inspire, educate, and delight children of all
              ages.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/products"
                className="rounded-full bg-white px-8 py-4 text-lg font-bold text-primary transition-transform hover:scale-105 active:scale-95"
              >
                Shop Now
              </Link>
              <Link
                href="/products?category=trending"
                className="rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white hover:text-primary"
              >
                View Trending
              </Link>
            </div>
          </div>
          <div className="cta-image relative flex justify-center md:justify-end">
            <div className="relative h-64 w-64 md:h-[400px] md:w-[400px]">
              <Image
                src="/cute-toy-robot.jpg"
                alt="Featured Toy"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />
      </div>
    </section>
  )
}
