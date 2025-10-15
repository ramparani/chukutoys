"use client"

import type React from "react"

import useSWR from "swr"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Product = {
  id: string
  name: string
  price: number
  image: string
  ageCategory?: "0-2" | "3-5" | "6-8" | "9-12"
  category: string
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include", cache: "no-store" })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export default function RemoveProductPage() {
  const router = useRouter()
  const { data: authData, mutate: refreshAuth, isLoading: authLoading } = useSWR("/api/admin/login", fetcher)

  const authorized = !!authData?.authorized

  if (authLoading) {
    return <div className="container py-8">Checking access…</div>
  }

  return (
    <main className="container mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Remove Products</h1>
      {!authorized ? <AuthForm onSuccess={() => refreshAuth()} /> : <ProductsList onDeleted={() => router.refresh()} />}
    </main>
  )
}

function AuthForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Login failed")
      }
      onSuccess()
    } catch (err: any) {
      setError("Invalid username or password")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <h2 className="text-xl font-medium">Admin sign in</h2>
        <p className="text-sm text-muted-foreground">Enter your admin username and password to proceed.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function ProductsList({ onDeleted }: { onDeleted: () => void }) {
  const { data, mutate: refresh, isLoading, error } = useSWR<{ products: Product[] }>("/api/products", fetcher)

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Delete failed")
      }
      await refresh()
      onDeleted()
    } catch (e) {
      alert("Delete failed. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) return <p>Loading products…</p>
  if (error) return <p className="text-destructive">Failed to load products</p>

  return (
    <div className="space-y-4">
      <Separator />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.products?.map((p) => (
          <li key={p.id} className="border rounded-lg p-4 bg-card text-card-foreground">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-pretty">{p.name}</h3>
              <span className="text-xs px-2 py-1 rounded bg-muted">{p.ageCategory || "N/A"}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">ID: {p.id}</p>
            <Button variant="destructive" onClick={() => handleDelete(p.id)} disabled={deletingId === p.id}>
              {deletingId === p.id ? "Deleting…" : "Delete"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
