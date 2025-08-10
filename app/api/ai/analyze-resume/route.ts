import { type NextRequest, NextResponse } from "next/server"
import { mockAIService } from "@/lib/mock-ai-service"

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    const analysis = await mockAIService.analyzeResume(resumeText)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Resume analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}
