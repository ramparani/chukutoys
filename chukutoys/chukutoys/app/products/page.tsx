"use client"

import { useState } from "react"
import { ProductsGrid } from "@/components/site/products-grid"

const AGES = ["all", "Age 0-2 Years", "Age 3-5 Years", "Age 6-8 Years", "Age 9-12 Years", "Adults"] as const

export default function ProductsPage() {
  const [age, setAge] = useState<(typeof AGES)[number]>("all")
  
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-6">
        <h1 className="text-pretty text-3xl font-semibold md:text-4xl">Shop all toys</h1>
        <p className="text-muted-foreground mt-2">Discover playful, safe, and educational toys for every age.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {AGES.map((a) => (
            <button
              key={a}
              onClick={() => setAge(a)}
              aria-pressed={age === a}
              className={`rounded-full px-3 py-1 text-sm border ${
                age === a ? "bg-primary text-primary-foreground" : "bg-card text-foreground border-border"
              }`}
            >
              {a === "all" ? "All ages" : `${a}`}
            </button>
          ))}
        </div>
      </header>
      <ProductsGrid age={age} />
    </main>
  )
}
