"use client"


import useSWR from "swr"
import { use } from 'react';
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ProductGallery } from "@/components/site/product-gallery"
import { formatCurrencyINR } from "@/lib/utils"

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" })
@@ -22,13 +27,45 @@ export default function ProductDetailsPage({
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params);
  const { data, error, isLoading } = useSWR<{ product: any }>(
    id ? `/api/products/${id}` : null,
    fetcher,
    { revalidateOnFocus: false },
  )
  // Loading state
  if (isLoading) {
    return (
@@ -55,9 +92,6 @@ export default function ProductDetailsPage({
    )
  }

  const product = data.product
  const images = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <nav className="mb-6 text-sm">
@@ -68,26 +102,50 @@ export default function ProductDetailsPage({

      <section className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div>
          <ProductGallery images={images} name={product.name} />

        </div>

        <div>
          <h1 className="text-pretty text-3xl font-semibold md:text-4xl">{product.name}</h1>
          <p className="mt-2 text-lg font-medium text-primary">{formatCurrencyINR(product.price)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <dt className="text-muted-foreground">Category</dt>
                <dd>{product.category}</dd>
                <dt className="text-muted-foreground">Age</dt>
                <dd>{product.ageCategory || "—"}</dd>
                <dt className="text-muted-foreground">Product ID</dt>
                <dd>{product.id}</dd>
              </dl>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
