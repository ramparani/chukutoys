export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <p className="mb-2">
          <span className="font-semibold text-foreground">ChuKuToys</span> — Play. Learn. Smile.
        </p>
        <p>&copy; {new Date().getFullYear()} ChuKuToys. All rights reserved.</p>
      </div>
    </footer>
  )
}
