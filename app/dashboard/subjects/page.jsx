"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

export default function SubjectsPage() {
  const [open, setOpen] = useState(false)
  const [subjects, setSubjects] = useState([
    { id: 1, code: "CS101", name: "Introduction to Programming", branch: "CSE Core", semester: 1, credits: 4 },
    { id: 2, code: "CS201", name: "Data Structures", branch: "CSE Core", semester: 3, credits: 4 },
    { id: 3, code: "CS301", name: "Database Management Systems", branch: "CSE Core", semester: 5, credits: 4 },
    { id: 4, code: "AI101", name: "Introduction to AI", branch: "CS AI/ML", semester: 3, credits: 3 },
    { id: 5, code: "DS201", name: "Data Mining", branch: "CS Data Science", semester: 4, credits: 4 },
    { id: 6, code: "HCI101", name: "Human Computer Interaction", branch: "CS-HCIGT", semester: 3, credits: 3 },
    { id: 7, code: "EC101", name: "Basic Electronics", branch: "ECE Core", semester: 1, credits: 4 },
    { id: 8, code: "IOT201", name: "IoT Fundamentals", branch: "ECE-IoT", semester: 3, credits: 4 },
  ])

  const handleAddSubject = (e) => {
    e.preventDefault()
    // Add new subject logic would go here
    setOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Students
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                Subjects
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Backlogs
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Subjects</h2>
              <div className="flex items-center space-x-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Subject
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Subject</DialogTitle>
                      <DialogDescription>
                        Add a new subject to the system. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddSubject}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="code" className="text-right">
                            Code
                          </Label>
                          <Input id="code" placeholder="CS101" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" placeholder="Introduction to Programming" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="branch" className="text-right">
                            Branch
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cse-core">CSE Core</SelectItem>
                              <SelectItem value="cs-aiml">CS AI/ML</SelectItem>
                              <SelectItem value="cs-ds">CS Data Science</SelectItem>
                              <SelectItem value="cs-hcigt">CS-HCIGT</SelectItem>
                              <SelectItem value="ece-core">ECE Core</SelectItem>
                              <SelectItem value="ece-iot">ECE-IoT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="semester" className="text-right">
                            Semester
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <SelectItem key={sem} value={sem.toString()}>
                                  {sem}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="credits" className="text-right">
                            Credits
                          </Label>
                          <Input id="credits" type="number" min="1" max="5" placeholder="4" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Subject</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search subjects..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Subjects</CardTitle>
                <CardDescription>Manage subjects across all branches and semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell className="font-medium">{subject.code}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>{subject.branch}</TableCell>
                        <TableCell>{subject.semester}</TableCell>
                        <TableCell>{subject.credits}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

