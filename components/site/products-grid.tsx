"use client"

import useSWR from "swr"
import type { Product } from "@/lib/products"
import { ProductCard } from "./product-card"

const fetcher = (url: string) =>
  fetch(url, {
    next: { revalidate: 3600 }, // cache for 1 hour
  }).then((r) => r.json());

export function ProductsGrid({
  limit,
  featuredOnly = false,
  age,
}: {
  limit?: number
  featuredOnly?: boolean
  age?: "0-2" | "3-5" | "6-8" | "9-12" | "all"
}) {
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
    items = items.filter((p) => p.featured)
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
