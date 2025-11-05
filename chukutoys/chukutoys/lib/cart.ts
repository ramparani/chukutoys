export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  ageCategory?: string
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("chukutoys-cart")
  return stored ? JSON.parse(stored) : []
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("chukutoys-cart", JSON.stringify(items))
  window.dispatchEvent(new Event("cart-updated"))
}

export function addToCart(product: { id: string; name: string; price: number; image: string; ageCategory?: string }) {
  const cart = getCart()
  const existing = cart.find((item) => item.id === product.id)

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      ageCategory: product.ageCategory,
    })
  }

  setCart(cart)
}

export function removeFromCart(productId: string) {
  const cart = getCart()
  const filtered = cart.filter((item) => item.id !== productId)
  setCart(filtered)
}

export function updateCartQuantity(productId: string, quantity: number) {
  const cart = getCart()
  const item = cart.find((item) => item.id === productId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
      setCart(cart)
    }
  }
}

export function clearCart() {
  setCart([])
}

export function getCartTotal(): { subtotal: number; tax: number; total: number } {
  const cart = getCart()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.00) // 5% tax
  const total = subtotal + tax

  return { subtotal, tax, total }
}
