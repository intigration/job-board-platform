"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Building2, Briefcase, Users, DollarSign, Lock } from "lucide-react"
import { companies } from "@/data/companies"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Companies() {
  const [activeTab, setActiveTab] = useState("overview")
  const { data: session } = useSession()

  return (
    <div className="container px-4 py-8">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Companies</h1>
        
        <div className="space-y-8">
          {companies.map((company, index) => (
            <div key={company.id}>
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="rounded-lg bg-blue-500/10 p-4">
                    <Building2 className="h-12 w-12 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {company.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {company.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
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
                    {session ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => window.open(company.website, '_blank')}
                      >
                        Visit Website
                      </Button>
                    ) : (
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        <Link href="/auth/signin" className="text-blue-500 hover:underline">
                          Sign in to view company website and more details
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {session ? (
                <>
                  <div className="border-b mb-6 border-border">
                    <nav className="flex space-x-8">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`pb-4 text-sm font-medium transition-colors hover:text-blue-500 ${
                          activeTab === "overview"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab("jobs")}
                        className={`pb-4 text-sm font-medium transition-colors hover:text-blue-500 ${
                          activeTab === "jobs"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {/* Posted Jobs */}
                      </button>
                      <button
                        onClick={() => setActiveTab("applications")}
                        className={`pb-4 text-sm font-medium transition-colors hover:text-blue-500 ${
                          activeTab === "applications"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {/* Applications */}
                      </button>
                    </nav>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-500/10 p-3">
                          <Briefcase className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Jobs</p>
                          <p className="text-2xl font-bold">{company.stats.activeJobs}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-500/10 p-3">
                          <Users className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Applicants</p>
                          <p className="text-2xl font-bold">{company.stats.totalApplicants}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-500/10 p-3">
                          <DollarSign className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Average Salary</p>
                          <p className="text-2xl font-bold">{company.stats.averageSalary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-dashed p-6 bg-card/50">
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <Lock className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Sign in to view detailed company statistics, job postings, and more
                      </p>
                      <Link href="/auth/signin">
                        <Button className="mt-4">
                          Sign in to view more
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {index < companies.length - 1 && (
                <div className="border-b border-border my-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 