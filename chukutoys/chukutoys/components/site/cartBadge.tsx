"use client"

import { useEffect, useState } from "react"

export function CartBadge() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      if (typeof window !== "undefined") {
        const cart = localStorage.getItem("chukutoys-cart")
        const items = cart ? JSON.parse(cart) : []
        const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCount(totalItems)
      }
    }

    updateCount()

    // Listen for storage changes to update count when cart is modified
    window.addEventListener("storage", updateCount)
    // Also listen for custom event from cart operations
    window.addEventListener("cart-updated", updateCount)

    return () => {
      window.removeEventListener("storage", updateCount)
      window.removeEventListener("cart-updated", updateCount)
    }
  }, [])

  return <span>{count > 0 ? ` (${count})` : ""}</span>
}
