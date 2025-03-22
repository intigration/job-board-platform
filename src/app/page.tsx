"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Briefcase, Building2, MapPin, Code, Palette, BarChart, Globe } from "lucide-react"
import { jobsData } from "@/data/jobs"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const featuredJobs = Object.values(jobsData).slice(0, 3)

  const categories = [
    {
      name: "Technology",
      icon: Code,
      keywords: "software engineer developer programming",
    },
    {
      name: "Design",
      icon: Palette,
      keywords: "ui ux product graphic designer",
    },
    {
      name: "Business",
      icon: BarChart,
      keywords: "manager analyst consultant marketing",
    },
    {
      name: "Remote",
      icon: Globe,
      keywords: "remote work from home",
    },
  ]

  const handleCategoryClick = (keywords: string) => {
    router.push(`/jobs?q=${encodeURIComponent(keywords)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent -z-10" />
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with top companies and opportunities that match your skills and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="text-base transition-all duration-300 hover:scale-105" 
                asChild
              >
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base transition-all duration-300 hover:scale-105" 
                asChild
              >
                <Link href="/post-a-job">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 -mt-8 mb-16">
        <div className="bg-card rounded-xl shadow-lg p-6 border animate-fade-in [animation-delay:200ms]">
          <h2 className="text-lg font-semibold mb-6 text-center">Explore Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.keywords)}
                  className="flex flex-col items-center p-6 rounded-lg border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              className="text-sm text-muted-foreground hover:text-primary"
              asChild
            >
              <Link href="/jobs">View All Categories →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="font-heading text-3xl font-bold mb-8">Featured Jobs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job, index) => (
            <div
              key={job.id}
              className="group bg-card hover:bg-card/50 rounded-xl border p-6 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-heading font-semibold text-lg">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">{job.salary}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground" 
                      asChild
                    >
                      <Link href={`/jobs/${job.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 