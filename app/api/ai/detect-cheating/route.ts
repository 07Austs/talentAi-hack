import { type NextRequest, NextResponse } from "next/server"
import { mockAIService } from "@/lib/mock-ai-service"

export async function POST(request: NextRequest) {
  try {
    const { interviewId, interviewData } = await request.json()

    if (!interviewId || !interviewData) {
      return NextResponse.json({ error: "Interview ID and data are required" }, { status: 400 })
    }

    const indicators = await mockAIService.detectCheatingIndicators(interviewData)

    // In mock mode, we'll just return the results without updating a database
    return NextResponse.json({
      indicators,
      riskLevel: indicators.length > 2 ? "high" : indicators.length > 0 ? "medium" : "low",
    })
  } catch (error) {
    console.error("Cheating detection error:", error)
    return NextResponse.json({ error: "Failed to detect cheating" }, { status: 500 })
  }
}
