"use client"

import { useSearchParams } from "next/navigation"

export default function SearchParamsWrapper({ 
  children 
}: { 
  children: (params: { 
    q: string; 
    location: string; 
    type: string; 
  }) => React.ReactNode 
}) {
  const searchParams = useSearchParams()
  
  const params = {
    q: searchParams?.get("q") || "",
    location: searchParams?.get("location") || "",
    type: searchParams?.get("type") || ""
  }

  return <>{children(params)}</>
} 