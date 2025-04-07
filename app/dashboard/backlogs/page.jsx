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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Download } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

export default function BacklogsPage() {
  const [open, setOpen] = useState(false)
  const [backlogs, setBacklogs] = useState([
    {
      id: 1,
      student: "BT20CSE001",
      name: "Rahul Sharma",
      subject: "CS101",
      subjectName: "Introduction to Programming",
      branch: "CSE Core",
      semester: 1,
    },
    {
      id: 2,
      student: "BT20CSE045",
      name: "Priya Patel",
      subject: "CS201",
      subjectName: "Data Structures",
      branch: "CSE Core",
      semester: 3,
    },
    {
      id: 3,
      student: "BT21CSAI012",
      name: "Amit Kumar",
      subject: "AI101",
      subjectName: "Introduction to AI",
      branch: "CS AI/ML",
      semester: 3,
    },
    {
      id: 4,
      student: "BT21CSDS034",
      name: "Neha Singh",
      subject: "DS201",
      subjectName: "Data Mining",
      branch: "CS Data Science",
      semester: 4,
    },
    {
      id: 5,
      student: "BT20CSHCI018",
      name: "Vikram Reddy",
      subject: "HCI101",
      subjectName: "Human Computer Interaction",
      branch: "CS-HCIGT",
      semester: 3,
    },
    {
      id: 6,
      student: "BT20ECE023",
      name: "Ananya Gupta",
      subject: "EC101",
      subjectName: "Basic Electronics",
      branch: "ECE Core",
      semester: 1,
    },
    {
      id: 7,
      student: "BT21ECEIOT007",
      name: "Rajesh Verma",
      subject: "IOT201",
      subjectName: "IoT Fundamentals",
      branch: "ECE-IoT",
      semester: 3,
    },
  ])

  const handleAddBacklog = (e) => {
    e.preventDefault()
    // Add new backlog logic would go here
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
              <Button variant="ghost" className="w-full justify-start">
                Subjects
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                Backlogs
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Backlogs</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Backlog
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Backlog</DialogTitle>
                      <DialogDescription>
                        Record a new backlog for a student. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddBacklog}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="student" className="text-right">
                            Student ID
                          </Label>
                          <Input id="student" placeholder="BT20CSE001" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                            Subject
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cs101">CS101 - Introduction to Programming</SelectItem>
                              <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
                              <SelectItem value="cs301">CS301 - Database Management Systems</SelectItem>
                              <SelectItem value="ai101">AI101 - Introduction to AI</SelectItem>
                              <SelectItem value="ds201">DS201 - Data Mining</SelectItem>
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
                          <Label htmlFor="reason" className="text-right">
                            Reason
                          </Label>
                          <Input id="reason" placeholder="Reason for backlog" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Backlog</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search backlogs..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Backlogs</TabsTrigger>
                <TabsTrigger value="cse">CSE</TabsTrigger>
                <TabsTrigger value="ece">ECE</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Backlogs</CardTitle>
                    <CardDescription>View and manage all student backlogs across branches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Semester</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backlogs.map((backlog) => (
                          <TableRow key={backlog.id}>
                            <TableCell className="font-medium">{backlog.student}</TableCell>
                            <TableCell>{backlog.name}</TableCell>
                            <TableCell>
                              {backlog.subject} - {backlog.subjectName}
                            </TableCell>
                            <TableCell>{backlog.branch}</TableCell>
                            <TableCell>{backlog.semester}</TableCell>
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
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

