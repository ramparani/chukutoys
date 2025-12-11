import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const authorized = cookies().get("admin_auth")?.value === "ok"
  return NextResponse.json({ authorized }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59" } })
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    const expectedUser = process.env.ADMIN_USER || "saisara"
    const expectedPass = process.env.ADMIN_PASSWORD || process.env.ADD_TOY_PASSWORD || "India@2020"

    const valid = username === expectedUser && password === expectedPass
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    const isHttps = (req.headers.get("x-forwarded-proto") || "").includes("https")
    res.cookies.set("admin_auth", "ok", {
      httpOnly: true,
      sameSite: "lax",
      secure: isHttps,
      path: "/",
      maxAge: 60 * 60, // 1 hour
    })
    return res
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}
