"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Building2, Briefcase, Users, DollarSign, Clock, MapPin } from "lucide-react"
import { companies } from "@/data/companies"
import { notFound } from "next/navigation"

export default function CompanyPage({ params }: { params: { id: string } }) {
  const company = companies.find((c) => String(c.id) === params.id)
  const [activeTab, setActiveTab] = useState("overview")

  if (!company) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Company Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="rounded-lg bg-primary/10 p-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">{company.name}</h1>
            <p className="text-muted-foreground mt-1">{company.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{company.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{company.industry}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="border-b mb-6 overflow-x-auto">
        <nav className="flex space-x-8 min-w-max">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`pb-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "jobs"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {/* Posted Jobs */}
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "applications"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {/* Applications */}
          </button>
        </nav>
      </div>

      {/* Dashboard Content */}
      {activeTab === "overview" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">{company.stats.activeJobs}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
                <p className="text-2xl font-bold">{company.stats.totalApplicants}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Salary</p>
                <p className="text-2xl font-bold">{company.stats.averageSalary}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold">Posted Jobs</h2>
            <Button className="w-full sm:w-auto" asChild>
              <a href="/post-job">Post New Job</a>
            </Button>
          </div>

          <div className="space-y-4">
            {company.jobs?.map((job) => (
              <div
                key={job.id}
                className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {job.status}
                    </span>
                    <Button variant="outline" size="sm" className="ml-auto sm:ml-2">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "applications" && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No applications to display.</p>
        </div>
      )}
    </div>
  )
} 