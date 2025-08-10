import { type NextRequest, NextResponse } from "next/server"
import { mockProfiles, mockJobs } from "@/lib/mock-data"
import { mockAIService } from "@/lib/mock-ai-service"

export async function POST(request: NextRequest) {
  try {
    const { jobId } = await request.json()

    // Get job details
    const job = mockJobs.find((j) => j.id === jobId)
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Get all available candidates
    const candidates = mockProfiles.filter((profile) => profile.role === "candidate" && profile.availability)

    // Calculate match scores for each candidate
    const matchedCandidates = await Promise.all(
      candidates.map(async (candidate) => {
        const matchScore = await mockAIService.calculateMatchScore(candidate, job)
        return {
          ...candidate,
          matchScore,
        }
      }),
    )

    // Sort by match score and return top candidates
    const topCandidates = matchedCandidates.sort((a, b) => b.matchScore - a.matchScore).slice(0, 20)

    return NextResponse.json({ candidates: topCandidates })
  } catch (error) {
    console.error("Match candidates error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
