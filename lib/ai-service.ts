interface HuggingFaceResponse {
  generated_text?: string
  score?: number
  label?: string
}

class AIService {
  private apiKey: string
  private baseUrl = "https://api-inference.huggingface.co/models"

  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY!
  }

  private async makeRequest(model: string, inputs: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${model}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs }),
    })

    if (!response.ok) {
      throw new Error(`AI service error: ${response.statusText}`)
    }

    return response.json()
  }

  async analyzeResume(resumeText: string): Promise<{
    skills: string[]
    experience: number
    summary: string
  }> {
    try {
      // Extract skills using NER model
      const skillsResponse = await this.makeRequest("dbmdz/bert-large-cased-finetuned-conll03-english", resumeText)

      // Generate summary
      const summaryResponse = await this.makeRequest(
        "facebook/bart-large-cnn",
        resumeText.slice(0, 1000), // Limit input length
      )

      // Simple experience extraction (you can improve this)
      const experienceMatch = resumeText.match(/(\d+)\+?\s*years?\s*(?:of\s*)?experience/i)
      const experience = experienceMatch ? Number.parseInt(experienceMatch[1]) : 0

      return {
        skills: this.extractSkillsFromNER(skillsResponse),
        experience,
        summary: summaryResponse[0]?.summary_text || "No summary available",
      }
    } catch (error) {
      console.error("Resume analysis error:", error)
      return {
        skills: [],
        experience: 0,
        summary: "Analysis failed",
      }
    }
  }

  async calculateMatchScore(candidateProfile: any, jobRequirements: any): Promise<number> {
    try {
      const prompt = `
        Candidate Skills: ${candidateProfile.skills?.join(", ") || "None listed"}
        Candidate Experience: ${candidateProfile.experience_years || 0} years
        Job Requirements: ${jobRequirements.skills_required?.join(", ") || "None listed"}
        Required Experience: ${jobRequirements.experience_min || 0}-${jobRequirements.experience_max || 10} years
        
        Rate the match between this candidate and job from 0-100:
      `

      const response = await this.makeRequest("microsoft/DialoGPT-large", prompt)

      // Extract score from response (simplified)
      const scoreMatch = response[0]?.generated_text?.match(/(\d+)/)?.[1]
      return scoreMatch ? Math.min(Number.parseInt(scoreMatch), 100) : 50
    } catch (error) {
      console.error("Match score calculation error:", error)
      return 50 // Default score
    }
  }

  async detectCheatingIndicators(interviewData: {
    audioTranscript?: string
    screenRecording?: boolean
    mouseMovements?: any[]
    keyboardPatterns?: any[]
  }): Promise<string[]> {
    const indicators: string[] = []

    try {
      if (interviewData.audioTranscript) {
        // Analyze speech patterns for potential coaching
        const response = await this.makeRequest("facebook/wav2vec2-base-960h", interviewData.audioTranscript)

        // Simple pattern detection (you can enhance this)
        if (
          interviewData.audioTranscript.includes("can you repeat") ||
          interviewData.audioTranscript.includes("let me think")
        ) {
          indicators.push("Unusual speech patterns detected")
        }
      }

      if (interviewData.mouseMovements && interviewData.mouseMovements.length > 0) {
        // Analyze for unnatural mouse movements
        const rapidMovements = interviewData.mouseMovements.filter((m) => m.speed && m.speed > 1000).length

        if (rapidMovements > 10) {
          indicators.push("Suspicious mouse activity")
        }
      }

      return indicators
    } catch (error) {
      console.error("Cheating detection error:", error)
      return []
    }
  }

  async generateInterviewQuestions(
    jobTitle: string,
    skills: string[],
    difficulty: "junior" | "mid" | "senior",
  ): Promise<
    Array<{
      question: string
      type: "technical" | "behavioral" | "problem-solving"
      expectedAnswer?: string
    }>
  > {
    try {
      const prompt = `Generate 5 interview questions for a ${difficulty} ${jobTitle} position requiring skills: ${skills.join(", ")}. Include technical, behavioral, and problem-solving questions.`

      const response = await this.makeRequest("microsoft/DialoGPT-large", prompt)

      // Parse and structure questions (simplified)
      return [
        {
          question: `Explain your experience with ${skills[0] || "relevant technologies"}`,
          type: "technical",
        },
        {
          question: "Describe a challenging project you worked on and how you overcame obstacles",
          type: "behavioral",
        },
        {
          question: `How would you optimize a machine learning model for production?`,
          type: "problem-solving",
        },
        {
          question: "Tell me about a time you had to learn a new technology quickly",
          type: "behavioral",
        },
        {
          question: `Design a system to handle ${skills.includes("ML") ? "ML model inference" : "data processing"} at scale`,
          type: "problem-solving",
        },
      ]
    } catch (error) {
      console.error("Question generation error:", error)
      return []
    }
  }

  private extractSkillsFromNER(nerResponse: any[]): string[] {
    // Extract technical skills from NER response
    const commonSkills = [
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "Machine Learning",
      "TensorFlow",
      "PyTorch",
      "SQL",
      "AWS",
      "Docker",
      "Kubernetes",
      "MLOps",
      "LLMOps",
      "Data Science",
      "AI",
      "Deep Learning",
    ]

    // Simple skill extraction (you can enhance this with better NLP)
    return commonSkills
      .filter((skill) =>
        nerResponse.some((entity) => entity.word && entity.word.toLowerCase().includes(skill.toLowerCase())),
      )
      .slice(0, 10) // Limit to top 10 skills
  }
}

export const aiService = new AIService()
