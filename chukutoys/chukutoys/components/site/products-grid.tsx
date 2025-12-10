"use client"

import useSWR from "swr"
import type { Product } from "@/lib/products"
import { ProductCard } from "./product-card"

// Cache for 60 minutes (3600 seconds)
const fetcher = (url: string) =>
  fetch(url, {
    next: { revalidate: 3600 }, // ISR-style caching
  }).then((r) => r.json());

export function ProductsGrid({
  limit,
  featuredOnly = false,
  age,
}: {
  limit?: number
  featuredOnly?: boolean
  age?: "all" | "Age 0-2 Years" | "Age 3-5 Years" | "Age 6-8 Years" | "Age 9-12 Years" | "Adults"
}) {  
  // console.log({age});
  
  const params = new URLSearchParams()
  if (age && age !== "all") params.set("age", age)
  const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`

  const { data, error, isLoading } = useSWR<{ products: Product[] }>(url, fetcher)

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 rounded-md border border-border bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (error || !data) {
    return <p className="text-destructive">Failed to load products. Please try again.</p>
  }

  let items = data.products
  if (featuredOnly) {
    items = items.filter((p) => p.product_isFeatured)
  }
  const products = limit ? items.slice(0, limit) : items

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
