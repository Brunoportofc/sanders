import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Alternar tema">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = (resolvedTheme || theme) === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar tema"
      className="transition-colors"
    >
      <Sun className={`h-5 w-5 ${isDark ? "hidden" : ""}`} />
      <Moon className={`h-5 w-5 ${isDark ? "" : "hidden"}`} />
    </Button>
  )
}


