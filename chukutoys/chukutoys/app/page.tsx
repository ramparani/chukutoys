import { Hero } from "@/components/site/hero_new"
import FeatureHighlights from "@/components/site/highlight"
import { FeaturedCarousel } from "@/components/site/featured-carousel"
import { VideosCarousel } from "@/components/site/videos-carousel"
import { Suspense } from "react"
// import { ScrollFadeSection } from "@/components/site/scroll-fade-section"
import { AnimatedScrollSection } from "@/components/site/animated-scroll-section"
import { CategoryFilter } from "@/components/site/category-filter"
import { CTASection } from "@/components/site/cta-section"
import { StatusFilter } from "@/components/site/status-filter"

export default function HomePage() {
  return (
        <main>
      <Hero />
      <section className="relative z-10 mt-8 md:mt-12">
        <StatusFilter />
      </section>
      <CategoryFilter />
      <AnimatedScrollSection className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <section aria-labelledby="featured-heading" data-scroll-item>
          <h2 id="featured-heading" className="text-pretty text-2xl font-semibold mb-4 md:text-3xl">
            Featured toys
          </h2>
          <div data-scroll-item>
            <FeaturedCarousel />
          </div>
        </section>
      </AnimatedScrollSection>
      <CTASection />
      {/* <Suspense fallback={<div className="text-center py-8">Loading videos...</div>}>
        <AnimatedScrollSection className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <section aria-labelledby="videos-heading" data-scroll-item>
            <h2 id="videos-heading" className="text-pretty text-2xl font-semibold mb-8 md:text-3xl">
              Product videos
            </h2>
            <div data-scroll-item>
              <VideosCarousel />
            </div>
          </section>
        </AnimatedScrollSection>
      </Suspense> */}
      <FeatureHighlights />
    </main>
  )
}
