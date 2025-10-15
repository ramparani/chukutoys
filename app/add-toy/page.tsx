"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddToyPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [price, setPrice] = useState<string>("")
  const [image, setImage] = useState("")
  const [images, setImages] = useState("") // comma-separated
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [featured, setFeatured] = useState(false)
  const [ageCategory, setAgeCategory] = useState<"0-2" | "3-5" | "6-8" | "9-12">("3-5")

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          image: image || undefined,
          images,
          description,
          category,
          featured,
          ageCategory,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to create product")

      router.push(`/products/${data.product.id}`)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 bg-white my-4 rounded-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-pretty">Add a new toy</h1>

      <form onSubmit={onSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Price (INR)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="age">Age Category</Label>
          <Select value={ageCategory} onValueChange={(v) => setAgeCategory(v as typeof ageCategory)}>
            <SelectTrigger id="age" aria-label="Select age category">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0–2 years</SelectItem>
              <SelectItem value="3-5">3–5 years</SelectItem>
              <SelectItem value="6-8">6–8 years</SelectItem>
              <SelectItem value="9-12">9–12 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image">Primary image URL</Label>
          <Input
            id="image"
            placeholder="/images/your-image.jpg or https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="images">Gallery image URLs (comma-separated)</Label>
          <Textarea
            id="images"
            placeholder="/img1.jpg, /img2.jpg, https://example.com/img3.jpg"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="featured"
            type="checkbox"
            className="h-4 w-4"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <Label htmlFor="featured">Mark as Featured</Label>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={submitting} className="bg-primary text-primary-foreground">
            {submitting ? "Adding..." : "Add Toy"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Tip: You can upload images to public/ and reference them like {'"/images/my-toy.jpg"'}.
        </p>
      </form>
    </main>
  )
}
