import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// This would be replaced with your database queries
const mockApplications = [
  {
    id: "1",
    jobTitle: "Senior Software Engineer",
    company: "Tech Corp",
    appliedDate: "2024-03-20",
    status: "pending",
    resumeName: "john_doe_resume.pdf",
  },
  {
    id: "2",
    jobTitle: "Product Designer",
    company: "Design Studio",
    appliedDate: "2024-03-15",
    status: "accepted",
    resumeName: "john_doe_resume_v2.pdf",
  },
  {
    id: "3",
    jobTitle: "Full Stack Developer",
    company: "Global Solutions Inc",
    appliedDate: "2024-03-10",
    status: "rejected",
    resumeName: "john_doe_resume_v3.pdf",
  },
]

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // In a real application, you would fetch this from your database
    // const applications = await prisma.application.findMany({
    //   where: {
    //     userId: session.user.id
    //   }
    // })

    return NextResponse.json(mockApplications)
  } catch (error) {
    console.error("[APPLICATIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    const { jobId, jobTitle, company, resumeName } = body

    // In a real application, you would save this to your database
    // const application = await prisma.application.create({
    //   data: {
    //     jobId,
    //     jobTitle,
    //     company,
    //     resumeName,
    //     status: "pending",
    //     userId: session.user.id
    //   }
    // })

    // For now, return a mock response
    const newApplication = {
      id: Date.now().toString(),
      jobTitle,
      company,
      appliedDate: new Date().toISOString(),
      status: "pending",
      resumeName,
    }

    return NextResponse.json(newApplication)
  } catch (error) {
    console.error("[APPLICATION_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 