"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { formatCurrencyINR } from "@/lib/utils"
import { getCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal, type CartItem } from "@/lib/cart"

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  useEffect(() => {
    const cartItems = getCart()
    console.log("[v0] Cart items loaded:", cartItems)
    setItems(cartItems)
    if (cartItems.length > 0) {
      setShowInvoiceModal(true)
    }
    setLoading(false)
  }, [])

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
    setItems(getCart())
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity)
    setItems(getCart())
  }

  const handleClearCart = () => {
    clearCart()
    setItems([])
  }

  const { subtotal, tax, total } = getCartTotal()

  const generateInvoicePDF = () => {
    import("jspdf").then((module) => {
      const jsPDF = module.jsPDF
      const doc = new jsPDF()

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 10

      // Header
      doc.setFillColor(52, 152, 219)
      doc.rect(0, 0, pageWidth, 30, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.text("ChuKuToys Invoice", pageWidth / 2, 18, { align: "center" })

      // Invoice info
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, margin, 45)
      doc.text(`Invoice ID: INV-${Date.now()}`, margin, 52)

      // Table header
      let y = 65
      doc.setFillColor(52, 152, 219)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      doc.setFont(undefined, "bold")
      doc.text("Product Name", margin, y)
      doc.text("Qty", pageWidth - 80, y)
      doc.text("Unit Price", pageWidth - 55, y)
      doc.text("Total", pageWidth - margin - 15, y, { align: "right" })

      // Table rows
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, "normal")
      y += 8
      items.forEach((item) => {
        doc.text(item.name.substring(0, 25), margin, y)
        doc.text(item.quantity.toString(), pageWidth - 80, y)
        doc.text(formatCurrencyINR(item.price), pageWidth - 55, y)
        doc.text(formatCurrencyINR(item.price * item.quantity), pageWidth - margin - 15, y, { align: "right" })
        y += 7
      })

      // Summary
      y += 5
      doc.setFont(undefined, "bold")
      doc.text(`Subtotal: ${formatCurrencyINR(subtotal)}`, pageWidth - 50, y)
      y += 7
      doc.text(`Tax (0%): ${formatCurrencyINR(tax)}`, pageWidth - 50, y)
      y += 10
      doc.setFontSize(12)
      doc.text(`Total: ${formatCurrencyINR(total)}`, pageWidth - 50, y)

      // Footer
      doc.setFontSize(9)
      doc.setTextColor(128, 128, 128)
      doc.text("Thank you for your purchase!", pageWidth / 2, pageHeight - 15, { align: "center" })
      doc.text("© 2025 ChuKuToys. All rights reserved.", pageWidth / 2, pageHeight - 8, { align: "center" })

      doc.save(`ChuKuToys-Invoice-${Date.now()}.pdf`)
    })
  }

  if (loading) {
    return <div className="flex justify-center py-20">Loading cart...</div>
  }

  return (
    <>
      {showInvoiceModal && items.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="mx-4 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Payment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                Almost done! Just download your invoice and share it with us at below number. We'll handle the rest and get your order ready.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="font-semibold text-lg">+91-99445-30200</p>
              </div>
              <Button onClick={() => setShowInvoiceModal(false)} className="w-full">
                Got it, Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-4 text-3xl font-bold">Shopping Cart</h1>
        <h3 className="pb-8 text-[#1A1A2E]">Almost done! Just download your invoice and share it with us at <b>+91-84474-96162</b>. We'll handle the rest and get your order ready.</h3>
        {items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-lg text-muted-foreground">Your cart is empty</p>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex gap-4 py-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatCurrencyINR(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded hover:bg-muted"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded hover:bg-muted"
                        >
                          +
                        </button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                          className="ml-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-right font-semibold">{formatCurrencyINR(item.price * item.quantity)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrencyINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (0%):</span>
                    <span>{formatCurrencyINR(tax)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrencyINR(total)}</span>
                  </div>

                  <Button onClick={generateInvoicePDF} className="w-full bg-green-600 hover:bg-green-700">
                    📥 Download Invoice (PDF)
                  </Button>

                  <Button onClick={handleClearCart} variant="outline" className="w-full bg-transparent">
                    Clear Cart
                  </Button>

                  <Button asChild className="w-full">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
