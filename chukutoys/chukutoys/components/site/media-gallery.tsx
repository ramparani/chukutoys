"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MediaItem {
  type: "image" | "video"
  src: string
}

interface MediaGalleryProps {
  images: string[]
  videos: string[]
  name: string
}

export function MediaGallery({ images, videos, name }: MediaGalleryProps) {
  // Combine images and videos into media items
  const mediaItems: MediaItem[] = [
    ...images.map((src) => ({ type: "image" as const, src })),
    ...videos.map((src) => ({ type: "video" as const, src })),
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const currentMedia = mediaItems[selectedIndex]

  if (mediaItems.length === 0) {
    return (
      <div className="aspect-square rounded-md border border-border bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No media available</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main media display */}
      <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
        {currentMedia.type === "image" ? (
          <Image
            src={currentMedia.src || "/placeholder.svg"}
            alt={`${name} photo ${selectedIndex + 1}`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 560px, 100vw"
            priority
          />
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentMedia.src}`}
            title={`${name} video ${selectedIndex + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>

      {/* Media thumbnails */}
      {mediaItems.length > 1 && (
        <div className="grid grid-cols-5 gap-2 md:grid-cols-6">
          {mediaItems.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded border",
                i === selectedIndex ? "ring-2 ring-primary border-primary" : "border-border hover:border-primary/50",
              )}
              aria-label={`Show ${item.type === "image" ? "photo" : "video"} ${i + 1}`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <img
                    src={`https://img.youtube.com/vi/${item.src}/mqdefault.jpg`}
                    alt={`Video ${i + 1} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <div
                        className="w-0 h-0 border-l-4 border-t-3 border-b-3 ml-1"
                        style={{
                          borderLeft: "5px solid white",
                          borderTop: "3px solid transparent",
                          borderBottom: "3px solid transparent",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
