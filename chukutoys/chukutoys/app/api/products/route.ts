import { NextResponse } from "next/server"
import { getProducts } from "@/lib/products"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const params = new URLSearchParams(url.search)
  const age = params.get("age")
  console.log(age);
  
  let products = await getProducts()
  if (age) {
    products = products.filter((p) => p.product_ageCategory === age.replace("-", "–") )
  }
  return NextResponse.json({ products })
}

// export async function GET(req: Request) {
//   const url = new URL(req.url)
//   // Step 1: Parse the query string
//   const params = new URLSearchParams(url.search)
//   const age = params.get("age") // "Age 0-2 Years"

//   let products = getProducts();

//   console.log({products});
  
//   if (age) {
//     products = products.filter((p) => p.product_ageCategory === age)
//   }

//   return NextResponse.json({ products })
// }

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, price, image, images, description, category, featured, ageCategory } = body || {}

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    const parsedPrice = Number(price)
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: "Price must be a non-negative number" }, { status: 400 })
    }
    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 })
    }
    if (!category || typeof category !== "string") {
      return NextResponse.json({ error: "Category is required" }, { status: 400 })
    }

    const normalizedImages: string[] | undefined = Array.isArray(images)
      ? images
      : typeof images === "string" && images.trim().length > 0
        ? images.split(",").map((s: string) => s.trim())
        : undefined

    const { addProduct } = await import("@/lib/products")
    const created = addProduct({
      name,
      price: parsedPrice,
      image: typeof image === "string" ? image : undefined,
      images: normalizedImages,
      description,
      category,
      featured: typeof featured === "boolean" ? featured : false,
      ageCategory: typeof ageCategory === "string" ? ageCategory : undefined,
    })

    return NextResponse.json({ product: created }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 })
  }
}
