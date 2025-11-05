import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { formatCurrencyINR } from "@/lib/utils"
import type { Product } from "@/lib/products"
// import { AddToCartBtn } from "@/components/site/add-to-cart-btn"

export function  ProductCard({ product }: { product: Product }) {
  const cover = (product.product_images && product.product_images[0] && product.product_images[0].url)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-pretty text-base md:text-lg">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.product_name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-3 aspect-square overflow-hidden rounded-md border border-border bg-muted">
          <Link href={`/products/${product.id}`} aria-label={`View details for ${product.product_name}`}>
            <Image
              src={`${cover}` || "/placeholder.svg"}
              alt={`${product.product_name} product image`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 250px, 100vw"
            />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.product_description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <span className="font-semibold">{formatCurrencyINR(product.product_price)}</span>
        {/* <AddToCartBtn product={product} /> */}
      </CardFooter>
    </Card>
  )
}
