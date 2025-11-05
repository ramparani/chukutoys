"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [index, setIndex] = useState(0)
  const current = images[index] || images[0]

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
        <Image
          src={current || "/placeholder.svg"}
          alt={`${name} photo ${index + 1}`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 560px, 100vw"
          priority
        />
      </div>

      <div className="grid grid-cols-5 gap-2 md:grid-cols-6">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded border",
              i === index ? "ring-2 ring-primary border-primary" : "border-border",
            )}
            aria-label={`Show ${name} photo ${i + 1}`}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`${name} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
