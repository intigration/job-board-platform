"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Briefcase, DollarSign } from "lucide-react"

const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["full-time", "part-time", "contract", "internship"]),
  salary: z.string().min(1, "Salary range is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(50, "Requirements must be at least 50 characters"),
  benefits: z.string().min(50, "Benefits must be at least 50 characters"),
})

type JobFormValues = z.infer<typeof jobFormSchema>

export default function PostJob() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "full-time",
      salary: "",
      description: "",
      requirements: "",
      benefits: "",
    },
  })

  function onSubmit(data: JobFormValues) {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Post a New Job</h1>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...form.register("title")}
                  className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...form.register("company")}
                  className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
                  placeholder="e.g., Tech Corp"
                />
              </div>
              {form.formState.errors.company && (
                <p className="text-sm text-destructive">{form.formState.errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...form.register("location")}
                  className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
                  placeholder="e.g., Remote or San Francisco, CA"
                />
              </div>
              {form.formState.errors.location && (
                <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  {...form.register("type")}
                  className="w-full pl-10 pr-4 py-2 rounded-md border bg-background appearance-none"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              {form.formState.errors.type && (
                <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Salary Range</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...form.register("salary")}
                  className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
                  placeholder="e.g., $100k - $150k"
                />
              </div>
              {form.formState.errors.salary && (
                <p className="text-sm text-destructive">{form.formState.errors.salary.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Description</label>
            <textarea
              {...form.register("description")}
              className="w-full min-h-[150px] p-4 rounded-md border bg-background resize-y"
              placeholder="Describe the role and responsibilities..."
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Requirements</label>
            <textarea
              {...form.register("requirements")}
              className="w-full min-h-[150px] p-4 rounded-md border bg-background resize-y"
              placeholder="List the required skills and qualifications..."
            />
            {form.formState.errors.requirements && (
              <p className="text-sm text-destructive">{form.formState.errors.requirements.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Benefits</label>
            <textarea
              {...form.register("benefits")}
              className="w-full min-h-[150px] p-4 rounded-md border bg-background resize-y"
              placeholder="List the benefits and perks..."
            />
            {form.formState.errors.benefits && (
              <p className="text-sm text-destructive">{form.formState.errors.benefits.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full sm:w-auto px-8" size="lg">
            Post Job
          </Button>
        </form>
      </div>
    </div>
  )
} 