"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShoppingCart } from 'lucide-react';
import { CartBadge } from "./cartBadge";
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
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
          <span className="font-semibold hidden sm:inline">ChuKuToys</span>
        </Link>

        <nav aria-label="Primary" className="md:flex items-center gap-2 hidden sm:inline">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          {/* Removed the Shop navigation link per request */}
          {/* <Button asChild variant="ghost">
            <Link href="/products">Shop</Link>
          </Button> */}
          {/* Keep the CTA button */}
          
          <Button asChild variant="ghost">
            <Link href="/products">Shop now</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
            <Link href="/cart" className="text-white"><ShoppingCart/> Cart <CartBadge /></Link>
          </Button>
          <Button asChild variant="ghost">
            <a
              href="https://instagram.com/chukutoys"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ChuKuToys Instagram"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              // className="glitter-bg text-white p-2 rounded-lg"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a
              href="https://youtube.com/@chukutoys"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ChuKuToys YouTube"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {/* <Button asChild variant="ghost" size="sm">
            <Link href="/cart">
              🛒
              <CartBadge />
            </Link>
          </Button> */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav aria-label="Mobile primary" className="md:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/products" onClick={() => setIsOpen(false)}>
                Shop now
              </Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
              <Link href="/cart" className="text-white"><ShoppingCart/> Cart <CartBadge /></Link>
            </Button>
            <a
              href="https://youtube.com/@chukutoys"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>YouTube</span>
            </a>
            <a
              href="https://instagram.com/chukutoys"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
