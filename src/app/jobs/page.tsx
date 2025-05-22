import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import ClientWrapper from "./components/ClientWrapper"

export const dynamic = 'force-dynamic'

export default function JobsPage() {
  return (
    <main>
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading jobs...</span>
          </div>
        }
      >
        <ClientWrapper />
      </Suspense>
    </main>
  )
} 