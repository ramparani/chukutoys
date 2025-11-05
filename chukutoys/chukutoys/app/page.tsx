import { Hero } from "@/components/site/hero"
import { ProductsGrid } from "@/components/site/products-grid"
import FeatureHighlights from "@/components/site/highlight"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureHighlights />
      <section aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h2 id="featured-heading" className="text-pretty text-2xl font-semibold mb-4 md:text-3xl">
          Featured toys
        </h2>
        <ProductsGrid featuredOnly limit={4} />
      </section>
    </main>
  )
}
