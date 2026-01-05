"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedScrollSectionProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedScrollSection({ children, className = "" }: AnimatedScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const items = ref.current.querySelectorAll("[data-scroll-item]")

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      },
    )

    // Stagger children animations
    gsap.fromTo(
      items,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          end: "top 35%",
          scrub: 0.5,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
