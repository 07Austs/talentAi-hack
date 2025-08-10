"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, FileText, MessageSquare, Shield, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { mockAIService } from "@/lib/mock-ai-service"

export function AIDemo() {
  const [activeDemo, setActiveDemo] = useState<string>("resume")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  // Resume Analysis Demo
  const [resumeText, setResumeText] = useState(`John Doe
Senior Machine Learning Engineer

Experience:
• 5+ years of experience in machine learning and data science
• Built production ML systems using Python, TensorFlow, and PyTorch
• Developed computer vision models for autonomous vehicles
• Implemented NLP solutions for customer service automation
• Experience with AWS, Docker, and Kubernetes for ML deployment

Skills: Python, TensorFlow, PyTorch, Computer Vision, NLP, AWS, Docker, Kubernetes, MLOps

Education:
• MS Computer Science, Stanford University
• BS Mathematics, UC Berkeley`)

  // Interview Questions Demo
  const [jobTitle, setJobTitle] = useState("Senior ML Engineer")
  const [skills, setSkills] = useState("Python,TensorFlow,Computer Vision")
  const [difficulty, setDifficulty] = useState<"junior" | "mid" | "senior">("senior")

  // Cheating Detection Demo
  const [interviewTranscript, setInterviewTranscript] =
    useState(`Interviewer: Can you explain how gradient descent works?

Candidate: Um, let me think about this... can you repeat the question? 

Interviewer: Sure, how does gradient descent optimize neural networks?

Candidate: Hold on, one moment... *long pause* ... technical difficulties here... 

Candidate: Okay, so gradient descent is... let me think... it's an optimization algorithm that... can you hear me okay?`)

  const handleResumeAnalysis = async () => {
    setLoading(true)
    setResults(null)
    try {
      const analysis = await mockAIService.analyzeResume(resumeText)
      setResults(analysis)
    } catch (error) {
      console.error("Resume analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuestionGeneration = async () => {
    setLoading(true)
    setResults(null)
    try {
      const skillsArray = skills.split(",").map((s) => s.trim())
      const questions = await mockAIService.generateInterviewQuestions(jobTitle, skillsArray, difficulty)
      setResults(questions)
    } catch (error) {
      console.error("Question generation failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheatingDetection = async () => {
    setLoading(true)
    setResults(null)
    try {
      const indicators = await mockAIService.detectCheatingIndicators({
        audioTranscript: interviewTranscript,
        screenRecording: true,
        mouseMovements: [
          { x: 100, y: 200, speed: 1200, timestamp: Date.now() },
          { x: 150, y: 250, speed: 1500, timestamp: Date.now() + 100 },
        ],
        keyboardPatterns: [{ key: "ctrl+c", timestamp: Date.now() }],
      })
      setResults(indicators)
    } catch (error) {
      console.error("Cheating detection failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (indicators: string[]) => {
    const riskLevel = indicators.length > 2 ? "high" : indicators.length > 0 ? "medium" : "low"
    switch (riskLevel) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "technical":
        return "bg-blue-100 text-blue-800"
      case "behavioral":
        return "bg-green-100 text-green-800"
      case "problem-solving":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Features Demo</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience TalentAI's powerful AI capabilities. Test resume analysis, interview question generation, and
          cheating detection in real-time.
        </p>
      </div>

      <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resume" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Resume Analysis
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Interview Questions
          </TabsTrigger>
          <TabsTrigger value="cheating" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Cheating Detection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Resume Analysis
              </CardTitle>
              <CardDescription>
                Our AI analyzes resumes to extract skills, experience, and generate summaries automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume Text</Label>
                <Textarea
                  id="resume"
                  placeholder="Paste a resume here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>
              <Button onClick={handleResumeAnalysis} disabled={loading || !resumeText.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>

              {results && activeDemo === "resume" && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Extracted Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {results.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Experience Level</h4>
                      <div className="text-2xl font-bold text-blue-600">{results.experience} years</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">AI-Generated Summary</h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{results.summary}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                AI Interview Question Generation
              </CardTitle>
              <CardDescription>
                Generate tailored interview questions based on job requirements and difficulty level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior ML Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Python, TensorFlow, Computer Vision"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={difficulty}
                    onValueChange={(value: "junior" | "mid" | "senior") => setDifficulty(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid-level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleQuestionGeneration} disabled={loading || !jobTitle.trim() || !skills.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Generate Questions
                  </>
                )}
              </Button>

              {results && activeDemo === "questions" && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <h4 className="font-semibold">Generated Interview Questions</h4>
                  <div className="space-y-4">
                    {results.map((question: any, index: number) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={getQuestionTypeColor(question.type)}>{question.type}</Badge>
                          </div>
                          <p className="text-gray-800 font-medium">{String(question.question)}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cheating" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                AI Cheating Detection
              </CardTitle>
              <CardDescription>
                Analyze interview recordings for potential cheating indicators while maintaining fairness.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transcript">Interview Transcript</Label>
                <Textarea
                  id="transcript"
                  placeholder="Paste interview transcript here..."
                  value={interviewTranscript}
                  onChange={(e) => setInterviewTranscript(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This demo simulates analysis of audio transcript, mouse movements, and keyboard
                  patterns. In production, this would analyze real interview data.
                </p>
              </div>
              <Button onClick={handleCheatingDetection} disabled={loading || !interviewTranscript.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Interview...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Detect Cheating
                  </>
                )}
              </Button>

              {results && activeDemo === "cheating" && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Analysis Results</h4>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${getRiskColor(results)}`} />
                      <span className={`font-medium ${getRiskColor(results)}`}>
                        {results.length > 2 ? "High Risk" : results.length > 0 ? "Medium Risk" : "Low Risk"}
                      </span>
                    </div>
                  </div>

                  {results.length > 0 ? (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-700">Detected Indicators:</h5>
                      {results.map((indicator: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-400"
                        >
                          <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                          <span className="text-gray-800">{String(indicator)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-l-green-400">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">No cheating indicators detected</span>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Recommendation:</strong>{" "}
                      {results.length > 2
                        ? "Manual review recommended. Multiple indicators suggest potential integrity issues."
                        : results.length > 0
                          ? "Proceed with caution. Some indicators detected but may be false positives."
                          : "Interview appears to have good integrity. Candidate performed naturally."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
