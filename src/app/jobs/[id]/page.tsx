"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Briefcase, DollarSign, Clock, Lock } from "lucide-react"
import { ApplyJobModal } from "@/components/apply-job-modal"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { jobsData } from "@/data/jobs"
import { notFound } from "next/navigation"

export default function JobDetails({ params }: { params: { id: string } }) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const { data: session } = useSession()

  const jobData = jobsData[params.id]

  if (!jobData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="space-y-6 rounded-lg border bg-card p-6">
            {/* Company Header */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-4 flex-shrink-0">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{jobData.title}</h1>
                <p className="text-lg text-muted-foreground">{jobData.company}</p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{jobData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{jobData.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{jobData.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {jobData.postedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                <p className="text-muted-foreground">{jobData.description}</p>
              </div>

              {session ? (
                <>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {jobData.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {jobData.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-dashed p-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="h-5 w-5" />
                    <p>Sign in to view job requirements and benefits</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Apply for this position</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Ready to apply? Submit your application now and we'll get back to you soon.
              </p>
              {session ? (
                <Button className="w-full" size="lg" onClick={() => setIsApplyModalOpen(true)}>
                  Apply Now
                </Button>
              ) : (
                <Button className="w-full" size="lg" asChild>
                  <Link href="/auth/signin">
                    Sign up to Apply
                  </Link>
                </Button>
              )}
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">About {jobData.company}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {jobData.aboutCompany.description}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{jobData.aboutCompany.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{jobData.aboutCompany.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{jobData.aboutCompany.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={jobData.title}
        company={jobData.company}
        jobId={params.id}
      />
    </div>
  )
} 