import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative">
      {/* Readability overlay using theme token */}

      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2 md:items-center md:gap-10 md:py-16">
        <div className="rounded-lg bg-card/80 p-4 md:p-6">
          <h1 className="text-balance text-4xl font-bold md:text-5xl">ChuKuToys</h1>
          <p className="text-pretty text-muted-foreground mt-3 md:text-lg">
            A joyful toy shop where imagination leads the way. Safe, colorful, and crafted to help kids grow through
            play.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
              <Link href="/products">Shop toys</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#featured-heading">See featured</Link>
            </Button>
          </div>
        </div>

        {/* Keep the secondary visual, but soften it to blend with background */}
        <div className="rounded-lg border border-border bg-card/80">
          <div className="aspect-square w-full overflow-hidden rounded-md">
            <Image
              src="/images/home-hero-illustration.jpg"
              alt="Colorful ChuKuToys illustration with toys and rainbow"
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
