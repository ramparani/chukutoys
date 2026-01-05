"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"

export function VideosCarousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        const allProducts = data.products || []
        const withVideos = allProducts.filter((p: Product) => p.videos && p.videos.length > 0)
        setProducts(withVideos)
      } catch (e) {
        console.error("[v0] Error fetching videos:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  if (loading) return <div className="text-center py-8">Loading videos...</div>
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No product videos available yet. Check back soon!</p>
      </div>
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
  }

  const currentProduct = products[currentIndex]
  const currentVideoId = currentProduct.videos?.[0]

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-6">
        {/* Main video player */}
        <div className="w-full max-w-2xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
          {currentVideoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideoId}`}
              title={currentProduct.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>

        {/* Product info */}
        <div className="text-center max-w-2xl">
          <h3 className="text-xl font-semibold mb-2">{currentProduct.name}</h3>
          <p className="text-gray-600">{currentProduct.description}</p>
        </div>

        {/* Thumbnails carousel */}
        <div className="w-full flex items-center justify-center gap-4">
          <Button onClick={handlePrev} variant="outline" size="icon" className="hidden md:flex bg-transparent">
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-3 overflow-x-auto pb-2 max-w-4xl">
            {products.map((product, idx) => (
              <button
                key={product.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? "border-blue-500 scale-105" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.videos && product.videos.length > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <Button onClick={handleNext} variant="outline" size="icon" className="hidden md:flex bg-transparent">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
