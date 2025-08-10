// Mock AI service that simulates AI functionality without external API calls
export class MockAIService {
  async analyzeResume(resumeText: string): Promise<{
    skills: string[]
    experience: number
    summary: string
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple skill extraction based on common keywords
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
      "Data Science",
      "AI",
      "Deep Learning",
      "NLP",
      "Computer Vision",
    ]

    const extractedSkills = commonSkills
      .filter((skill) => resumeText.toLowerCase().includes(skill.toLowerCase()))
      .slice(0, 8)

    // Simple experience extraction
    const experienceMatch = resumeText.match(/(\d+)\+?\s*years?\s*(?:of\s*)?experience/i)
    const experience = experienceMatch ? Number.parseInt(experienceMatch[1]) : Math.floor(Math.random() * 8) + 2

    const summary = `Experienced professional with ${experience} years in the field. Strong background in ${extractedSkills.slice(0, 3).join(", ")}. Demonstrated expertise in building scalable solutions and working with cross-functional teams.`

    return {
      skills: extractedSkills,
      experience,
      summary,
    }
  }

  async calculateMatchScore(candidateProfile: any, jobRequirements: any): Promise<number> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const candidateSkills = candidateProfile.skills?.map((s: string) => s.toLowerCase()) || []
    const jobSkills = jobRequirements.skills_required?.map((s: string) => s.toLowerCase()) || []

    // Calculate skill overlap
    const matchingSkills = candidateSkills.filter((skill: string) =>
      jobSkills.some((jobSkill: string) => jobSkill.includes(skill) || skill.includes(jobSkill)),
    )

    const skillMatch = jobSkills.length > 0 ? matchingSkills.length / jobSkills.length : 0

    // Calculate experience match
    const candidateExp = candidateProfile.experience_years || 0
    const minExp = jobRequirements.experience_min || 0
    const maxExp = jobRequirements.experience_max || 10

    let experienceMatch = 0
    if (candidateExp >= minExp && candidateExp <= maxExp) {
      experienceMatch = 1
    } else if (candidateExp < minExp) {
      experienceMatch = Math.max(0, candidateExp / minExp)
    } else {
      experienceMatch = Math.max(0.5, 1 - (candidateExp - maxExp) / maxExp)
    }

    // Location bonus
    const locationMatch =
      candidateProfile.location === jobRequirements.location || jobRequirements.remote_allowed ? 0.1 : 0

    const finalScore = (skillMatch * 0.6 + experienceMatch * 0.3 + locationMatch) * 100
    return Math.min(Math.round(finalScore), 100)
  }

  async detectCheatingIndicators(interviewData: {
    audioTranscript?: string
    screenRecording?: boolean
    mouseMovements?: any[]
    keyboardPatterns?: any[]
  }): Promise<string[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const indicators: string[] = []

    if (interviewData.audioTranscript) {
      const transcript = interviewData.audioTranscript.toLowerCase()

      // Check for suspicious phrases
      const suspiciousPhrases = [
        "can you repeat",
        "let me think",
        "hold on",
        "one moment",
        "can you hear me",
        "technical difficulties",
      ]

      const foundPhrases = suspiciousPhrases.filter((phrase) => transcript.includes(phrase))

      if (foundPhrases.length > 2) {
        indicators.push("Unusual speech patterns detected")
      }

      // Check for very long pauses (simulated)
      if (Math.random() > 0.7) {
        indicators.push("Extended silence periods detected")
      }
    }

    if (interviewData.mouseMovements && interviewData.mouseMovements.length > 0) {
      // Simulate mouse movement analysis
      const rapidMovements = interviewData.mouseMovements.filter((m: any) => m.speed && m.speed > 1000).length

      if (rapidMovements > 10) {
        indicators.push("Suspicious mouse activity")
      }
    }

    if (interviewData.keyboardPatterns && interviewData.keyboardPatterns.length > 0) {
      // Simulate keyboard pattern analysis
      if (Math.random() > 0.8) {
        indicators.push("Irregular typing patterns")
      }
    }

    // Random additional indicators for demo
    if (Math.random() > 0.9) {
      indicators.push("Multiple browser tabs detected")
    }

    if (Math.random() > 0.95) {
      indicators.push("Screen sharing anomalies")
    }

    return indicators
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
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const technicalQuestions = {
      junior: [
        "Explain the difference between supervised and unsupervised learning",
        "What is overfitting and how can you prevent it?",
        "Describe the basic workflow of a machine learning project",
        "What are the main types of neural network layers?",
      ],
      mid: [
        "How would you handle class imbalance in a dataset?",
        "Explain the bias-variance tradeoff in machine learning",
        "Describe different methods for feature selection",
        "How do you evaluate the performance of a regression model?",
      ],
      senior: [
        "Design a system for real-time fraud detection at scale",
        "How would you implement A/B testing for ML models in production?",
        "Explain different approaches to model interpretability",
        "Describe strategies for handling concept drift in production models",
      ],
    }

    const behavioralQuestions = [
      "Tell me about a challenging ML project you worked on",
      "Describe a time when you had to explain complex technical concepts to non-technical stakeholders",
      "How do you stay updated with the latest developments in AI/ML?",
      "Tell me about a time when your model didn't perform as expected",
    ]

    const problemSolvingQuestions = {
      junior: ["How would you approach building a recommendation system?", "Design a simple chatbot architecture"],
      mid: [
        "How would you build a system to detect duplicate content?",
        "Design an ML pipeline for processing streaming data",
      ],
      senior: [
        "Design a distributed training system for large language models",
        "How would you build a multi-modal AI system?",
      ],
    }

    const questions = [
      {
        question: technicalQuestions[difficulty][Math.floor(Math.random() * technicalQuestions[difficulty].length)],
        type: "technical" as const,
      },
      {
        question: behavioralQuestions[Math.floor(Math.random() * behavioralQuestions.length)],
        type: "behavioral" as const,
      },
      {
        question:
          problemSolvingQuestions[difficulty][Math.floor(Math.random() * problemSolvingQuestions[difficulty].length)],
        type: "problem-solving" as const,
      },
    ]

    // Add skill-specific questions
    if (skills.includes("Python")) {
      questions.push({
        question: "Explain the GIL in Python and its implications for multi-threading",
        type: "technical",
      })
    }

    if (skills.includes("TensorFlow") || skills.includes("PyTorch")) {
      questions.push({
        question: "Compare TensorFlow and PyTorch - when would you use each?",
        type: "technical",
      })
    }

    return questions.slice(0, 5) // Return top 5 questions
  }
}

export const mockAIService = new MockAIService()
