"use client"

import useSWR from "swr"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/products"
import { ProductCard } from "./product-card"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json())

export function FeaturedCarousel() {
  const params = new URLSearchParams()
  const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`

  const { data, error, isLoading } = useSWR<{ products: Product[] }>(url, fetcher)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 w-64 flex-shrink-0 rounded-md border border-border bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (error || !data) {
    return <p className="text-destructive">Failed to load featured products.</p>
  }

  const featured = data.products.filter((p) => p.product_isFeatured)

  if (featured.length <= 4) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    )
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {featured.map((p) => (
          <div key={p.id} className="flex-shrink-0 w-64 snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-background"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-background"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
