import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Frame } from "lucide-react"

export default function DashboardNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Frame className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">IIITN Backlog Management</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
              Dashboard
            </Link>
            <Link href="/dashboard/students" className="transition-colors hover:text-foreground/80">
              Students
            </Link>
            <Link href="/dashboard/subjects" className="transition-colors hover:text-foreground/80">
              Subjects
            </Link>
            <Link href="/dashboard/backlogs" className="transition-colors hover:text-foreground/80">
              Backlogs
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="outline" size="sm">
            Admin
          </Button>
          <Button variant="ghost" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

