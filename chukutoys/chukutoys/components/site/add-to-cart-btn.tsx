"use client"

import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/cart"
import { useState } from "react"
import type { Product } from "@/lib/products"

export function AddToCartBtn({ product }: { product: Product }) {   
  const images =
    product.product_images && product.product_images.length > 0
      ? product.product_images.map((img: { url: string }) => `${img.url}`)
      : [];

  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.product_name,
      price: product.product_price,
      image: images[0] || "/placeholder.svg",
      ageCategory: product.product_ageCategory,
    })

    setAdded(true)
    // setTimeout(() => setAdded(false), 2000)
  }
  
  return (
    <Button onClick={handleAddToCart} className="w-full bg-primary text-primary-foreground hover:opacity-90">
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </Button>
  )
}
