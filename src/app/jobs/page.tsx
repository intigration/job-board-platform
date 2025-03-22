import { Suspense } from "react"
import JobsContent from "./components/JobsContent"

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  )
} 