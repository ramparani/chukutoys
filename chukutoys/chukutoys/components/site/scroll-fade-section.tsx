"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollFadeSectionProps {
  children: React.ReactNode
  className?: string
}

export function ScrollFadeSection({ children, className = "" }: ScrollFadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "top 45%",
          scrub: 0.8,
          markers: false,
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
