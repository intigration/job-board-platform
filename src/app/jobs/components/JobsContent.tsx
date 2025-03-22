"use client"

import { Button } from "@/components/ui/button"
import { Building2, MapPin, Briefcase, DollarSign, Clock, Search } from "lucide-react"
import Link from "next/link"
import { jobsData } from "@/data/jobs"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function JobsContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "")
  const [jobType, setJobType] = useState("")

  // Filter jobs based on search criteria
  const filteredJobs = Object.values(jobsData).filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !locationFilter || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = !jobType || job.type === jobType
    return matchesSearch && matchesLocation && matchesType
  })

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("")
    setJobType("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and filter section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border pl-9 py-2 text-sm"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full rounded-md border pl-9 py-2 text-sm"
            />
          </div>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filteredJobs.length} jobs
      </p>

      {/* Jobs list */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="group block rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="rounded-lg bg-primary/10 p-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <p className="text-muted-foreground mt-1">{job.company}</p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{job.posted}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 