"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import JobsContent from "./JobsContent"

export default function ClientWrapper() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [params, setParams] = useState({
    q: "",
    location: "",
    type: ""
  })

  useEffect(() => {
    setParams({
      q: searchParams?.get("q") || "",
      location: searchParams?.get("location") || "",
      type: searchParams?.get("type") || ""
    })
    setMounted(true)
  }, [searchParams])

  if (!mounted) {
    return null
  }

  return <JobsContent initialParams={params} />
} 