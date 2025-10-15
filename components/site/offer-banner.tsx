"use client"

import { useState } from "react"

export default function OfferBanner() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm">
        <p className="text-pretty">Super Saver: Flat 20% off on learning toys this week. Free shipping over ₹999!</p>
        <button
          type="button"
          aria-label="Dismiss offers banner"
          className="underline decoration-1 underline-offset-2"
          onClick={() => setOpen(false)}
        >
          Hide
        </button>
      </div>
    </div>
  )
}
