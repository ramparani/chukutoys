import { callStrapiAPI } from "@/server/utils/backend";


export type Product = {
  id: string
  product_name: string
  product_price: number
  image: Image[]
  product_images?: Image[]
  product_description: string
  category: string
  product_isFeatured?: boolean // new flag
  product_isAvailable?: boolean
  product_ageCategory?: "All" | "Age 0-2 Years" | "Age 3-5 Years" | "Age 6-8 Years" | "Age 9-12 Years" | "Adults"
}

export type Image = {
  url: string
}


const products: Product[] = [
  {
    id: "robot-01",
    name: "RoboBuddy",
    price: 2999,
    image: [{url: "/cute-toy-robot.jpg"}],
    images: ["/cute-toy-robot.jpg", "/cute-toy-robot-close-up.jpg", "/cute-toy-robot-in-playroom.jpg"],
    description: "Friendly robot toy with light-up eyes and movable arms.",
    category: "Robots",
    featured: true, // mark featured
    ageCategory: "Age 6-8 Years",
  },
  {
    id: "blocks-01",
    name: "Bright Blocks Set",
    price: 2450,
    image: "/colorful-toy-blocks.jpg",
    images: [
      "/colorful-toy-blocks.jpg",
      "/colorful-building-blocks-top-view.jpg",
      "/blocks-building-tower-kids-table.jpg",
    ],
    description: "Colorful building blocks to spark creativity and coordination.",
    category: "Blocks",
    featured: true,
    ageCategory: "Age 3-5 Years",
  },
  {
    id: "plush-01",
    name: "Cuddle Bear",
    price: 1800,
    image: "/cute-plush-bear.jpg",
    images: ["/cute-plush-bear.jpg", "/soft-plush-teddy-bear-close-up.jpg", "/plush-bear-on-kids-bed.jpg"],
    description: "Ultra-soft plush bear for nap time and adventures.",
    category: "Plush",
    featured: false, // explicit
    ageCategory: "Age 0-2 Years",
  },
  {
    id: "puzzle-01",
    name: "Jungle Puzzle 48pc",
    price: 1499,
    image: "/jungle-animal-puzzle.jpg",
    images: [
      "/jungle-animal-puzzle.jpg",
      "/jungle-puzzle-pieces-spread.jpg",
      "/kid-friendly-jungle-puzzle-close-up.jpg",
    ],
    description: "A vibrant jungle-themed puzzle that builds problem-solving skills.",
    category: "Puzzles",
    featured: false,
    ageCategory: "Age 6-8 Years",
  },
  {
    id: "car-01",
    name: "Turbo Racer",
    price: 1275,
    image: "/toy-race-car.jpg",
    images: ["/toy-race-car.jpg", "/toy-race-car-side-view.jpg", "/toy-car-on-wooden-floor.jpg"],
    description: "Speedy pull-back car with durable wheels and bright paint.",
    category: "Vehicles",
    featured: false,
    ageCategory: "Age 3-5 Years",
  },
  {
    id: "doll-01",
    name: "Star Doll",
    price: 2200,
    image: "/cute-doll.jpg",
    images: ["/cute-doll.jpg", "/cute-doll-portrait.jpg", "/doll-with-outfit-accessories.jpg"],
    description: "Adorable doll with removable outfit and friendly smile.",
    category: "Dolls",
    featured: false,
    ageCategory: "Age 6-8 Years",
  },
  {
    id: "train-01",
    name: "Wooden Train Set",
    price: 3400,
    image: "/wooden-train-set.jpg",
    images: ["/wooden-train-set.jpg", "/wooden-train-on-track.jpg", "/classic-wooden-train-set-close-up.jpg"],
    description: "Classic wooden train set with magnetic cars and tracks.",
    category: "Vehicles",
    featured: false,
    ageCategory: "Age 3-5 Years",
  },
  {
    id: "kit-01",
    name: "Mini Science Lab",
    price: 2750,
    image: "/kids-science-kit.jpg",
    images: ["/kids-science-kit.jpg", "/kids-science-kit-beakers.jpg", "/kids-science-set.jpg"],
    description: "Safe experiments that spark curiosity and learning.",
    category: "STEM",
    featured: false,
    ageCategory: "Age 9-12 Years",
  },
]

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function addProduct(input: {
  name: string
  price: number
  image?: string
  images?: string[]
  description: string
  category: string
  featured?: boolean
  ageCategory?: "All" | "Age 0-2 Years" | "Age 3-5 Years" | "Age 6-8 Years" | "Age 9-12 Years" | "Adults"

}) {
  const baseId = slugify(input.name || "toy")
  const id = `${baseId}-${Date.now()}`

  const product: Product = {
    id,
    name: input.name,
    price: input.price,
    image: input.image || (input.images && input.images[0]) || "/kid-toy.jpg",
    images: input.images && input.images.length ? input.images : undefined,
    description: input.description,
    category: input.category,
    featured: Boolean(input.featured),
    ageCategory: input.ageCategory || "Age 3-5 Years",
  }
  ;(products as Product[]).unshift(product)
  return product
}

export async function getProducts() {  
  const productResponse = await callStrapiAPI(
    `/products?populate=product_images`,
    "Error fetching page",
    "GET"
  );
  
  const productList = productResponse as Product;
  return productList
}

export async function getProductById(id: string) {
  const productResponse = await callStrapiAPI(
    `/products?filters[id][$eq]=${id}&populate=product_images`,
    "Error fetching page",
    "GET"
  );
  const productDetails = productResponse as Product;
  return productDetails || null
}

export function removeProduct(id: string) {
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return false
  products.splice(idx, 1)
  return true
}
