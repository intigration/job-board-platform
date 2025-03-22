import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// GET /api/jobs - Get all jobs
export async function GET() {
  try {
    const client = await clientPromise
    const jobsCollection = client.db("job-board").collection("jobs")
    
    const jobs = await jobsCollection.find({}).toArray()
    
    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    )
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const jobsCollection = client.db("job-board").collection("jobs")
    
    const job = await request.json()
    
    const result = await jobsCollection.insertOne({
      ...job,
      createdAt: new Date(),
      createdBy: session.user?.email,
    })
    
    return NextResponse.json({ 
      message: "Job created successfully",
      jobId: result.insertedId 
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    )
  }
}

// PATCH /api/jobs - Update a job
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id, ...updateData } = await request.json()
    
    const client = await clientPromise
    const jobsCollection = client.db("job-board").collection("jobs")
    
    const result = await jobsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: "Job updated successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    )
  }
}

// DELETE /api/jobs - Delete a job
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await request.json()
    
    const client = await clientPromise
    const jobsCollection = client.db("job-board").collection("jobs")
    
    const result = await jobsCollection.deleteOne({
      _id: new ObjectId(id)
    })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    )
  }
} 