"use client"

import { Button } from "@/components/ui/button"
import { Building2, MapPin, Briefcase, DollarSign, Clock, Search } from "lucide-react"
import Link from "next/link"
import { jobsData } from "@/data/jobs"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

interface JobsContentProps {
  initialParams: {
    q: string
    location: string
    type: string
  }
}

export default function JobsContent({ initialParams }: JobsContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const [searchQuery, setSearchQuery] = useState(initialParams.q)
  const [locationFilter, setLocationFilter] = useState(initialParams.location)
  const [jobType, setJobType] = useState(initialParams.type)

  // Update URL with search params
  const updateSearchParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value)
      }
    })
    
    const queryString = newSearchParams.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

  // Handle search and filter changes
  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery)
    updateSearchParams({
      q: newQuery,
      location: locationFilter,
      type: jobType,
    })
  }

  const handleLocationChange = (newLocation: string) => {
    setLocationFilter(newLocation)
    updateSearchParams({
      q: searchQuery,
      location: newLocation,
      type: jobType,
    })
  }

  const handleTypeChange = (newType: string) => {
    setJobType(newType)
    updateSearchParams({
      q: searchQuery,
      location: locationFilter,
      type: newType,
    })
  }

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
    router.push(pathname)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters - Left Sidebar */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="e.g., Remote"
                    value={locationFilter}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Job Type</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={jobType}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background appearance-none"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Job Listings - Right Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
              />
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} jobs
          </p>

          {/* Jobs list */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="block rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                  <div className="flex-shrink-0">
                    <Button variant="secondary" asChild>
                      <Link href={`/jobs/${job.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 rounded-lg border bg-card">
                <p className="text-muted-foreground mb-4">No jobs found matching your criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 