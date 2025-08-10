import { type NextRequest, NextResponse } from "next/server"
import { mockAIService } from "@/lib/mock-ai-service"

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, skills, difficulty } = await request.json()

    if (!jobTitle || !skills || !difficulty) {
      return NextResponse.json({ error: "Job title, skills, and difficulty are required" }, { status: 400 })
    }

    const questions = await mockAIService.generateInterviewQuestions(jobTitle, skills, difficulty)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("Question generation error:", error)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}
