import { use } from 'react';
import { NextResponse } from "next/server"
import { getProductById, removeProduct } from "@/lib/products"
import { cookies } from "next/headers"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = params?.id
  const product = id ? getProductById(id) : null
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json({ product })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const auth = cookies().get("admin_auth")?.value
  if (auth !== "ok") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  const ok = removeProduct(id)
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
