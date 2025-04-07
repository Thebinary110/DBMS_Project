import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">IIITN Backlog Management</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/students" className="transition-colors hover:text-foreground/80">
                Students
              </Link>
              <Link href="/subjects" className="transition-colors hover:text-foreground/80">
                Subjects
              </Link>
              <Link href="/backlogs" className="transition-colors hover:text-foreground/80">
                Backlogs
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  IIITN Backlog Management System
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Efficiently manage academic backlogs across all branches and batches
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button>Get Started</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Manage subjects, students, and view reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Add subjects for specific batches, manage student records, and generate comprehensive backlog reports.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Branch Management</CardTitle>
                <CardDescription>Support for all 6 branches</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Manage backlogs across CSE Core, CS AI/ML, CS Data Science, CS-HCIGT, ECE Core, and ECE-IoT branches.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Portal</CardTitle>
                <CardDescription>Easy access to backlog information</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Students can view their backlog status, exam schedules, and track their academic progress.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 IIITN Backlog Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

