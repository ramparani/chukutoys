"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    id: 1,
    title: "World of Imagination",
    description: "Discover toys that spark creativity and endless joy in every child's heart.",
    image: "/images/home-hero-illustration.jpg",
    color: "bg-blue-50",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Safe & Sustainable",
    description: "High-quality, eco-friendly toys crafted with care for a better future.",
    image: "/cute-toy-robot.jpg",
    color: "bg-pink-50",
    cta: "Explore Collection",
  },
  {
    id: 3,
    title: "Learn While Playing",
    description: "Educational toys that make learning an adventure for curious minds.",
    image: "/kids-science-kit.jpg",
    color: "bg-yellow-50",
    cta: "View Educational",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-[500px] w-full overflow-hidden md:h-[600px]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={{
            enter: (direction: number) => ({
              x: direction > 0 ? "100%" : "-100%",
              opacity: 0,
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
            },
            exit: (direction: number) => ({
              zIndex: 0,
              x: direction < 0 ? "100%" : "-100%",
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={`absolute inset-0 flex items-center justify-center ${slides[currentSlide].color}`}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-8">
            <div className="order-2 space-y-6 md:order-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-black tracking-tight text-primary md:text-6xl"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-lg text-lg text-muted-foreground md:text-xl"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button asChild size="lg" className="rounded-full px-8 text-lg font-bold">
                  <Link href="/products">{slides[currentSlide].cta}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-lg font-bold bg-transparent"
                >
                  <Link href="#featured-heading">Learn More</Link>
                </Button>
              </motion.div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-[2rem] shadow-2xl md:max-w-none"
              >
                <Image
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 md:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-primary" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 md:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-primary" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1)
              setCurrentSlide(index)
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-primary" : "w-3 bg-primary/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
