"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, Clock, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Application {
  id: string
  jobTitle: string
  company: string
  appliedDate: string
  status: "pending" | "accepted" | "rejected"
  resumeName: string
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated") {
      fetchApplications()
    }
  }, [status, router])

  const fetchApplications = async () => {
    try {
      // This would be your API endpoint to fetch applications
      const response = await fetch("/api/applications")
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "accepted":
        return <CheckCircle2 className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading your applications...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Applications</h1>
          <Button asChild>
            <a href="/jobs">Browse More Jobs</a>
          </Button>
        </div>

        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application.id}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{application.jobTitle}</h3>
                    <p className="text-sm text-muted-foreground">{application.company}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Resume: {application.resumeName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {getStatusIcon(application.status)}
                    <span className="capitalize">{application.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {applications.length === 0 && !isLoading && (
            <div className="text-center py-12 rounded-lg border bg-card">
              <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet.</p>
              <Button asChild>
                <a href="/jobs">Browse Jobs</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 