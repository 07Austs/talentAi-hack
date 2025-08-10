"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Zap, Target, Shield, Rocket } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TalentAI</span>
            </div>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 AI-Powered Hiring Revolution
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Top AI Talent
            <span className="text-blue-600"> Faster Than Ever</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionary AI-powered platform that matches the best AI engineers, ML researchers, and data scientists
            with cutting-edge companies. Scale your hiring from 100K+ profiles in record time.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth">
              <Button size="lg" className="px-8">
                Start Hiring
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Find Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why TalentAI Changes Everything</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built for the future of AI hiring with intelligent matching, bias-aware validation, and engaging experiences
            for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-blue-600 mb-4" />
              <CardTitle>Lightning-Fast Matching</CardTitle>
              <CardDescription>
                AI-powered algorithms process 100K+ profiles and match candidates to roles faster than traditional
                recruiters can refresh LinkedIn.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-green-600 mb-4" />
              <CardTitle>Smart Skill Validation</CardTitle>
              <CardDescription>
                Engaging challenges and assessments that feel like games, not chores. Validate both technical skills and
                soft skills with bias-aware AI.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-purple-600 mb-4" />
              <CardTitle>Interview Integrity</CardTitle>
              <CardDescription>
                Advanced AI detection systems monitor interviews for cheating indicators while maintaining fairness and
                candidate privacy.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-orange-600 mb-4" />
              <CardTitle>Global Talent Pool</CardTitle>
              <CardDescription>
                Access AI engineers, ML researchers, and data scientists from around the world with region-aware
                matching and availability tracking.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-pink-600 mb-4" />
              <CardTitle>AI-First Experience</CardTitle>
              <CardDescription>
                Every interaction is enhanced by AI - from profile optimization to interview preparation to career
                guidance.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Rocket className="h-10 w-10 text-indigo-600 mb-4" />
              <CardTitle>Scale Without Limits</CardTitle>
              <CardDescription>
                Handle massive candidate pools efficiently without compromising on quality or missing the perfect match.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
              <div className="text-gray-600">AI Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Faster Hiring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">92%</div>
              <div className="text-gray-600">Match Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the AI hiring revolution. Whether you&apos;re looking for top talent or seeking your next opportunity,
            TalentAI is your gateway to success.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="px-8">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-6 w-6" />
              <span className="text-xl font-bold">TalentAI</span>
            </div>
            <p className="text-gray-400">AI-Powered Marketplace for Top AI Talent</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
