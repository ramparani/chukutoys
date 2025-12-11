"use client"

import { useState } from "react"
import useSWR from "swr"
import { use } from 'react';
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
// import { ProductGallery } from "@/components/site/product-gallery"
import { MediaGallery } from "@/components/site/media-gallery";
import { formatCurrencyINR } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/cart"
// import { useRouter } from "next/navigation"

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    next: { revalidate: 300 }, // cache
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const message = err?.error || `Request failed: ${res.status}`
    throw new Error(message)
  }
  return res.json()
}

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params);
  // const router = useRouter()
  const [btnLabel, setBtnLabel] = useState("🛒 Add to Cart")
  const [isAdding, setIsAdding] = useState(false)
  const { data, error, isLoading } = useSWR<{ product: any }>(
    id ? `/api/products/${id}` : null,
    fetcher,
    { revalidateOnFocus: false },
  )

  const product = data ? data.product[0] : "";

  const images =
    product.product_images && product.product_images.length > 0
      ? product.product_images.map((img: { url: string }) => `${img.url}`)
      : [];
  
  const videos = [product.product_videos_YoutubeIDs];
      
  const handleAddToCart = () => {
    if (!product) return    
    setIsAdding(true)
    addToCart({
      id: product.id,
      name: product.product_name,
      price: product.product_price,
      image: images[0],
      ageCategory: product.product_ageCategory,
    })

    // Redirect to cart after adding
    setTimeout(() => {
      // router.push("/cart")
      setIsAdding(false)
      setBtnLabel("Added")
    }, 300)
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <p>Loading product…</p>
      </main>
    )
  }

  // Error / Not Found state
  if (error || !data?.product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <nav className="mb-6 text-sm">
          <Link href="/products" className="text-primary hover:underline">
            ← Back to products
          </Link>
        </nav>
        <h1 className="text-pretty text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't find that toy. It might have been removed or the link is incorrect.
        </p>
      </main>
    )
  }

  return (
    <main className="relative mx-auto max-w-5xl px-4 py-10 md:py-14 bg-gradient-to-bl from-blue-100 via-white to-pink-200">
      <img src="/bg-image2.png" className="absolute bottom-0 right-0 w-60 h-60 animate-spin-slow opacity-80 hidden lg:inline" />
      <nav className="mb-6 text-sm">
        <Link href="/products" className="text-primary hover:underline">
          ← Back to products
        </Link>
      </nav>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div>
          {/* <ProductGallery images={images} name={product.product_name} /> */}
          <MediaGallery images={images} videos={videos} name={product.name} />
        </div>

        <div>
          <h1 className="text-pretty text-3xl font-semibold md:text-4xl">{product.product_name}</h1>
          <p className="mt-2 text-lg font-medium text-primary">₹ {formatCurrencyINR(product.product_price)}</p>
          <p className="mt-4 text-black">{product.product_description}</p>

          <Card className="mt-6">
            <CardContent className="pt-2">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {/* <dt className="text-black font-bold">Youtube video</dt>
                <dd><a href={product.product_category} target="_blank">Link</a></dd> */}
                <dt className="text-black font-bold">Age</dt>
                <dd>{product.product_ageCategory || "—"}</dd>
                {/* <dt className="text-muted-foreground">Product ID</dt>
                <dd>{product.id}</dd> */}
                <dt className="text-black font-bold">Available</dt>
                <dd>{product.product_isAvailable ? "Yes" : "No"}</dd>
              </dl>
            </CardContent>
          </Card>

          {/* <Button
            onClick={handleAddToCart}
            disabled={isAdding || !product.product_isAvailable || btnLabel === "Added"}
            className="mt-6 w-full bg-primary text-primary-foreground hover:bg-green-500"
          >
            {isAdding ? "Adding..." : btnLabel}
          </Button> */}

          {product.product_isAvailable ? (
            <Button 
              onClick={handleAddToCart} 
              disabled={isAdding || btnLabel === "Added"} 
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-green-500">
              {isAdding ? "Adding..." : btnLabel}
            </Button>
          ) : (
            <Button disabled className="mt-6 w-full bg-red-900 text-white font-bold">
             Sold Out — Restocking Shortly!
            </Button>
          )}
        </div>
      </section>
    </main>
  )
}
