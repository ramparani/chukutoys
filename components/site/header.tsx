import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="ChuKuToys home">
          <Image
            src="/images/chukutoys-logo.png"
            alt="ChuKuToys logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
            priority
          />
          <span className="font-semibold">ChuKuToys</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          {/* Removed the Shop navigation link per request */}
          {/* <Button asChild variant="ghost">
            <Link href="/products">Shop</Link>
          </Button> */}
          {/* Keep the CTA button */}
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
            <Link href="/products">Shop now</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
