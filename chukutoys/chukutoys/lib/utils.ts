import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrencyINR(amount: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      // style: "currency",
      // currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    // Fallback
    return `₹${amount.toFixed(2)}`
  }
}
