"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Brain,
  Users,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Search,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react"
import { mockDataService, type MockJob, type MockApplication, type MockProfile } from "@/lib/mock-data"
import { AIDemo } from "@/components/ai-demo"

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()
  const [jobs, setJobs] = useState<MockJob[]>([])
  const [applications, setApplications] = useState<MockApplication[]>([])
  const [candidates, setCandidates] = useState<MockProfile[]>([])
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalCandidates: 0,
    matchRate: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (profile) {
      fetchDashboardData()
    }
  }, [profile])

  const fetchDashboardData = async () => {
    try {
      if (profile?.role === "recruiter") {
        // Fetch jobs for recruiters
        const jobsData = await mockDataService.getJobs({ recruiter_id: profile.id })
        setJobs(jobsData)

        // Fetch applications for recruiter's jobs
        const applicationsData = await mockDataService.getApplications({ recruiter_id: profile.id })
        setApplications(applicationsData)
      } else if (profile?.role === "candidate") {
        // Fetch applications for candidates
        const applicationsData = await mockDataService.getApplications({ candidate_id: profile.id })
        setApplications(applicationsData)

        // Fetch recommended jobs
        const recommendedJobs = await mockDataService.getRecommendedJobs(profile.id)
        setJobs(recommendedJobs)
      } else if (profile?.role === "admin") {
        // Fetch all data for admin
        const jobsData = await mockDataService.getJobs()
        const applicationsData = await mockDataService.getApplications()
        const candidatesData = await mockDataService.getCandidates()

        setJobs(jobsData)
        setApplications(applicationsData)
        setCandidates(candidatesData)
      }

      // Calculate stats
      setStats({
        totalJobs: jobs.length,
        totalApplications: applications.length,
        totalCandidates: candidates.length,
        matchRate: Math.round(Math.random() * 30 + 70), // Simulated
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "recruiter":
        return "bg-blue-100 text-blue-800"
      case "candidate":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "interview":
        return "bg-blue-100 text-blue-800"
      case "offer":
        return "bg-purple-100 text-purple-800"
      case "hired":
        return "bg-emerald-100 text-emerald-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TalentAI</span>
              <Badge className={`${getRoleColor(profile.role)} capitalize`}>{profile.role}</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={profile.avatar_url || ""} />
                <AvatarFallback>{profile.full_name?.charAt(0) || profile.email.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{profile.full_name || "User"}</span>
                <span className="text-xs text-gray-500">{profile.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile.full_name || "User"}!</h1>
          <p className="text-gray-600">
            {profile.role === "candidate" && "Discover amazing opportunities and advance your AI career."}
            {profile.role === "recruiter" && "Find top AI talent and manage your hiring pipeline."}
            {profile.role === "admin" && "Monitor platform performance and manage all users."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {profile.role === "recruiter"
                  ? "Active Jobs"
                  : profile.role === "candidate"
                    ? "Applications"
                    : "Total Jobs"}
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile.role === "candidate" ? applications.length : jobs.length}
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {profile.role === "recruiter"
                  ? "Applications"
                  : profile.role === "candidate"
                    ? "Profile Views"
                    : "Total Applications"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile.role === "candidate" ? Math.floor(Math.random() * 500 + 100) : applications.length}
              </div>
              <p className="text-xs text-muted-foreground">+8% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Match Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.matchRate}%</div>
              <p className="text-xs text-muted-foreground">AI-powered matching</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {profile.role === "candidate" ? "Skills Score" : "Success Rate"}
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 20 + 80)}%</div>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {profile.role === "recruiter" && <TabsTrigger value="jobs">My Jobs</TabsTrigger>}
            {profile.role === "candidate" && <TabsTrigger value="opportunities">Opportunities</TabsTrigger>}
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="ai-demo">AI Demo</TabsTrigger>
            {profile.role === "admin" && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest platform interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((app: MockApplication) => (
                      <div key={app.id} className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {profile.role === "candidate"
                              ? `Applied to ${app.job?.title || "Job"}`
                              : `New application for ${app.job?.title || "Job"}`}
                          </p>
                          <p className="text-sm text-gray-500">{new Date(app.applied_at).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                      </div>
                    ))}
                    {applications.length === 0 && <p className="text-gray-500 text-center py-4">No recent activity</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for your role</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.role === "candidate" && (
                    <>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Search className="mr-2 h-4 w-4" />
                        Browse Jobs
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Update Profile
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Award className="mr-2 h-4 w-4" />
                        Take Skill Assessment
                      </Button>
                    </>
                  )}
                  {profile.role === "recruiter" && (
                    <>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        Review Applications
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Interviews
                      </Button>
                    </>
                  )}
                  {profile.role === "admin" && (
                    <>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Users
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        View Analytics
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        System Settings
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {profile.role === "recruiter" && (
            <TabsContent value="jobs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Jobs</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </div>
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription>
                            {job.location} • {job.remote_allowed ? "Remote OK" : "On-site"}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills_required?.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills_required?.length > 3 && (
                          <Badge variant="secondary">+{job.skills_required.length - 3} more</Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Posted {new Date(job.created_at).toLocaleDateString()}
                        </div>
                        <Button variant="outline" size="sm">
                          View Applications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {jobs.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs yet</h3>
                      <p className="text-gray-500 mb-4">Get started by posting your first job</p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Post Job
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          )}

          {profile.role === "candidate" && (
            <TabsContent value="opportunities" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recommended Opportunities</h2>
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Advanced Search
                </Button>
              </div>
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription>
                            {job.location} • {job.remote_allowed ? "Remote OK" : "On-site"}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 mb-2">
                            {Math.floor(Math.random() * 30 + 70)}% Match
                          </Badge>
                          {job.salary_min && job.salary_max && (
                            <div className="text-sm text-gray-600">
                              ${(job.salary_min / 1000).toFixed(0)}K - ${(job.salary_max / 1000).toFixed(0)}K
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills_required?.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Posted {new Date(job.created_at).toLocaleDateString()}
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            Save
                          </Button>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {jobs.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
                      <p className="text-gray-500 mb-4">Update your profile to get better matches</p>
                      <Button>Update Profile</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          )}

          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-bold">
              {profile.role === "candidate" ? "My Applications" : "Recent Applications"}
            </h2>
            <div className="space-y-4">
              {applications.map((app: MockApplication) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {profile.role === "candidate"
                            ? app.job?.title || "Job Title"
                            : app.candidate?.full_name || "Candidate Name"}
                        </CardTitle>
                        <CardDescription>Applied {new Date(app.applied_at).toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        {app.ai_match_score > 0 && (
                          <div className="text-sm text-gray-600 mt-1">{Math.round(app.ai_match_score)}% Match</div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {app.cover_letter && (
                    <CardContent>
                      <p className="text-gray-600 line-clamp-2">{app.cover_letter}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
              {applications.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500 mb-4">
                      {profile.role === "candidate"
                        ? "Start applying to jobs that match your skills"
                        : "Applications will appear here as candidates apply to your jobs"}
                    </p>
                    {profile.role === "candidate" && (
                      <Button>
                        <Search className="mr-2 h-4 w-4" />
                        Browse Jobs
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ai-demo" className="space-y-6">
            <AIDemo />
          </TabsContent>

          {profile.role === "admin" && (
            <TabsContent value="admin" className="space-y-6">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Users</span>
                        <span className="font-semibold">{candidates.length + jobs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Jobs</span>
                        <span className="font-semibold">{jobs.filter((j) => j.status === "active").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Applications</span>
                        <span className="font-semibold">{applications.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate</span>
                        <span className="font-semibold">{stats.matchRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {candidates.slice(0, 5).map((candidate) => (
                        <div key={candidate.id} className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={candidate.avatar_url || ""} />
                            <AvatarFallback>
                              {candidate.full_name?.charAt(0) || candidate.email.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{candidate.full_name || "User"}</p>
                            <p className="text-xs text-gray-500">{candidate.email}</p>
                          </div>
                          <Badge className={getRoleColor(candidate.role)}>{candidate.role}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          <TabsContent value="profile" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar_url || ""} />
                    <AvatarFallback className="text-lg">
                      {profile.full_name?.charAt(0) || profile.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{profile.full_name || "User"}</h3>
                    <p className="text-gray-600">{profile.email}</p>
                    <Badge className={`${getRoleColor(profile.role)} mt-2`}>{profile.role}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-gray-600">{profile.location || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Experience</h4>
                    <p className="text-gray-600">{profile.experience_years} years</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">GitHub</h4>
                    <p className="text-gray-600">
                      {profile.github_username ? `@${profile.github_username}` : "Not connected"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Availability</h4>
                    <Badge className={profile.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {profile.availability ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>

                {profile.bio && (
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-gray-600">{profile.bio}</p>
                  </div>
                )}

                {profile.skills && profile.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
