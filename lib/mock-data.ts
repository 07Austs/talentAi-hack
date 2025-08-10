export interface MockProfile {
  id: string
  role: "candidate" | "recruiter" | "admin"
  email: string
  full_name: string
  avatar_url: string | null
  github_username: string | null
  linkedin_url: string | null
  location: string | null
  bio: string | null
  skills: string[]
  experience_years: number
  availability: boolean
  created_at: string
  updated_at: string
}

export interface MockJob {
  id: string
  company_id: string
  recruiter_id: string
  title: string
  description: string
  requirements: string[]
  skills_required: string[]
  experience_min: number
  experience_max: number
  salary_min: number | null
  salary_max: number | null
  location: string | null
  remote_allowed: boolean
  status: "draft" | "active" | "paused" | "closed"
  ai_matching_score: number
  created_at: string
  updated_at: string
  company_name?: string
}

export interface MockApplication {
  id: string
  job_id: string
  candidate_id: string
  status: "pending" | "screening" | "interview" | "offer" | "rejected" | "hired"
  ai_match_score: number
  cover_letter: string | null
  resume_url: string | null
  applied_at: string
  updated_at: string
  job?: MockJob
  candidate?: MockProfile
}

export interface MockCompany {
  id: string
  name: string
  description: string
  website: string
  logo_url: string
  industry: string
  size_range: string
  location: string
  created_at: string
}

export interface MockProject {
  id: string
  candidate_id: string
  title: string
  description: string
  technologies: string[]
  github_url: string
  demo_url: string | null
  achievements: string[]
  impact_metrics: Record<string, any>
  created_at: string
}

// Mock Companies
export const mockCompanies: MockCompany[] = [
  {
    id: "comp-1",
    name: "TechCorp AI",
    description: "Leading AI research and development company",
    website: "https://techcorp.ai",
    logo_url: "/abstract-tech-logo.png",
    industry: "Artificial Intelligence",
    size_range: "500-1000",
    location: "San Francisco, CA",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "comp-2",
    name: "DataFlow Systems",
    description: "Enterprise data analytics and ML platform",
    website: "https://dataflow.com",
    logo_url: "/data-company-logo.png",
    industry: "Data Analytics",
    size_range: "100-500",
    location: "New York, NY",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "comp-3",
    name: "Neural Networks Inc",
    description: "Deep learning solutions for healthcare",
    website: "https://neuralnet.health",
    logo_url: "/neural-network-logo.png",
    industry: "Healthcare AI",
    size_range: "50-100",
    location: "Boston, MA",
    created_at: "2024-01-05T10:00:00Z",
  },
]

// Mock Profiles
export const mockProfiles: MockProfile[] = [
  // Admin
  {
    id: "admin-1",
    role: "admin",
    email: "admin@talentai.com",
    full_name: "Sarah Admin",
    avatar_url: "/professional-woman-diverse.png",
    github_username: null,
    linkedin_url: "https://linkedin.com/in/sarah-admin",
    location: "San Francisco, CA",
    bio: "Platform administrator with 10+ years in HR tech",
    skills: ["Platform Management", "HR Analytics", "System Administration"],
    experience_years: 10,
    availability: true,
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-01T10:00:00Z",
  },
  // Recruiters
  {
    id: "recruiter-1",
    role: "recruiter",
    email: "john.recruiter@techcorp.ai",
    full_name: "John Smith",
    avatar_url: "/professional-man.png",
    github_username: null,
    linkedin_url: "https://linkedin.com/in/john-smith-recruiter",
    location: "San Francisco, CA",
    bio: "Senior Technical Recruiter specializing in AI/ML talent acquisition",
    skills: ["Technical Recruiting", "AI/ML Hiring", "Talent Assessment"],
    experience_years: 8,
    availability: true,
    created_at: "2024-01-02T10:00:00Z",
    updated_at: "2024-01-02T10:00:00Z",
  },
  {
    id: "recruiter-2",
    role: "recruiter",
    email: "lisa.talent@dataflow.com",
    full_name: "Lisa Johnson",
    avatar_url: "/professional-woman-recruiter.png",
    github_username: null,
    linkedin_url: "https://linkedin.com/in/lisa-johnson-talent",
    location: "New York, NY",
    bio: "Data Science recruiter with expertise in ML engineering roles",
    skills: ["Data Science Recruiting", "ML Engineering", "Technical Interviews"],
    experience_years: 6,
    availability: true,
    created_at: "2024-01-03T10:00:00Z",
    updated_at: "2024-01-03T10:00:00Z",
  },
  // Candidates
  {
    id: "candidate-1",
    role: "candidate",
    email: "alex.chen@email.com",
    full_name: "Alex Chen",
    avatar_url: "/asian-software-engineer.png",
    github_username: "alexchen",
    linkedin_url: "https://linkedin.com/in/alex-chen-ml",
    location: "Seattle, WA",
    bio: "Senior ML Engineer with 7+ years building production ML systems. Passionate about computer vision and NLP.",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Computer Vision", "NLP", "AWS", "Docker", "Kubernetes"],
    experience_years: 7,
    availability: true,
    created_at: "2024-01-04T10:00:00Z",
    updated_at: "2024-01-04T10:00:00Z",
  },
  {
    id: "candidate-2",
    role: "candidate",
    email: "maria.rodriguez@email.com",
    full_name: "Maria Rodriguez",
    avatar_url: "/data-scientist-woman.png",
    github_username: "mariarodriguez",
    linkedin_url: "https://linkedin.com/in/maria-rodriguez-ds",
    location: "Austin, TX",
    bio: "Data Scientist specializing in deep learning and statistical modeling. PhD in Statistics from Stanford.",
    skills: ["Python", "R", "Deep Learning", "Statistics", "PyTorch", "Scikit-learn", "SQL", "Tableau", "A/B Testing"],
    experience_years: 5,
    availability: true,
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
  },
  {
    id: "candidate-3",
    role: "candidate",
    email: "david.kim@email.com",
    full_name: "David Kim",
    avatar_url: "/placeholder-fo7w6.png",
    github_username: "davidkim",
    linkedin_url: "https://linkedin.com/in/david-kim-ai",
    location: "Boston, MA",
    bio: "AI Research Scientist with focus on reinforcement learning and robotics. Former Google Brain researcher.",
    skills: ["Python", "C++", "Reinforcement Learning", "Robotics", "TensorFlow", "JAX", "Research", "Publications"],
    experience_years: 9,
    availability: false,
    created_at: "2024-01-06T10:00:00Z",
    updated_at: "2024-01-06T10:00:00Z",
  },
  {
    id: "candidate-4",
    role: "candidate",
    email: "sarah.wilson@email.com",
    full_name: "Sarah Wilson",
    avatar_url: "/ml-engineer-woman.png",
    github_username: "sarahwilson",
    linkedin_url: "https://linkedin.com/in/sarah-wilson-ml",
    location: "San Francisco, CA",
    bio: "MLOps Engineer building scalable ML infrastructure. Expert in cloud platforms and model deployment.",
    skills: ["Python", "MLOps", "Kubernetes", "AWS", "GCP", "Terraform", "CI/CD", "Model Deployment", "Monitoring"],
    experience_years: 4,
    availability: true,
    created_at: "2024-01-07T10:00:00Z",
    updated_at: "2024-01-07T10:00:00Z",
  },
  {
    id: "candidate-5",
    role: "candidate",
    email: "james.brown@email.com",
    full_name: "James Brown",
    avatar_url: "/software-engineer-man.png",
    github_username: "jamesbrown",
    linkedin_url: "https://linkedin.com/in/james-brown-ai",
    location: "Chicago, IL",
    bio: "Full-stack AI Engineer with expertise in LLMs and conversational AI. Building the next generation of AI applications.",
    skills: ["Python", "JavaScript", "LLMs", "OpenAI", "LangChain", "React", "Node.js", "Vector Databases", "RAG"],
    experience_years: 3,
    availability: true,
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z",
  },
]

// Mock Jobs
export const mockJobs: MockJob[] = [
  {
    id: "job-1",
    company_id: "comp-1",
    recruiter_id: "recruiter-1",
    title: "Senior Machine Learning Engineer",
    description:
      "We're looking for a Senior ML Engineer to join our AI research team. You'll be responsible for designing and implementing large-scale ML systems, working with cutting-edge technologies like transformers and diffusion models. The ideal candidate has experience with production ML systems and can work independently on complex problems.",
    requirements: [
      "5+ years of ML engineering experience",
      "Strong Python programming skills",
      "Experience with TensorFlow or PyTorch",
      "Production ML system experience",
      "PhD or MS in Computer Science, Statistics, or related field preferred",
    ],
    skills_required: ["Python", "TensorFlow", "PyTorch", "MLOps", "Deep Learning", "Computer Vision"],
    experience_min: 5,
    experience_max: 10,
    salary_min: 180000,
    salary_max: 250000,
    location: "San Francisco, CA",
    remote_allowed: true,
    status: "active",
    ai_matching_score: 0,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
    company_name: "TechCorp AI",
  },
  {
    id: "job-2",
    company_id: "comp-2",
    recruiter_id: "recruiter-2",
    title: "Data Scientist - NLP",
    description:
      "Join our data science team to build state-of-the-art NLP models for enterprise customers. You'll work on text classification, sentiment analysis, and information extraction at scale. We're looking for someone passionate about language models and their real-world applications.",
    requirements: [
      "3+ years of data science experience",
      "Strong background in NLP and text processing",
      "Experience with transformer models",
      "Proficiency in Python and SQL",
      "Experience with cloud platforms (AWS/GCP/Azure)",
    ],
    skills_required: ["Python", "NLP", "Transformers", "BERT", "SQL", "AWS", "Statistics"],
    experience_min: 3,
    experience_max: 7,
    salary_min: 140000,
    salary_max: 190000,
    location: "New York, NY",
    remote_allowed: true,
    status: "active",
    ai_matching_score: 0,
    created_at: "2024-01-12T10:00:00Z",
    updated_at: "2024-01-12T10:00:00Z",
    company_name: "DataFlow Systems",
  },
  {
    id: "job-3",
    company_id: "comp-3",
    recruiter_id: "recruiter-1",
    title: "AI Research Scientist",
    description:
      "We're seeking a Research Scientist to advance the state-of-the-art in medical AI. You'll publish papers, develop novel algorithms, and collaborate with medical professionals to solve real healthcare challenges. This role offers the opportunity to make a significant impact on patient outcomes.",
    requirements: [
      "PhD in Computer Science, AI, or related field",
      "5+ years of research experience",
      "Strong publication record in top-tier venues",
      "Experience with medical imaging or healthcare data",
      "Proficiency in deep learning frameworks",
    ],
    skills_required: ["Research", "Deep Learning", "Medical AI", "Computer Vision", "Publications", "PyTorch"],
    experience_min: 5,
    experience_max: 15,
    salary_min: 200000,
    salary_max: 300000,
    location: "Boston, MA",
    remote_allowed: false,
    status: "active",
    ai_matching_score: 0,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    company_name: "Neural Networks Inc",
  },
  {
    id: "job-4",
    company_id: "comp-1",
    recruiter_id: "recruiter-1",
    title: "MLOps Engineer",
    description:
      "Build and maintain the infrastructure that powers our ML models in production. You'll work on model deployment, monitoring, and scaling systems that serve millions of users. We're looking for someone who can bridge the gap between research and production.",
    requirements: [
      "3+ years of MLOps or DevOps experience",
      "Strong knowledge of Kubernetes and Docker",
      "Experience with cloud platforms (AWS/GCP)",
      "Familiarity with ML model deployment",
      "Programming skills in Python and/or Go",
    ],
    skills_required: ["MLOps", "Kubernetes", "Docker", "AWS", "Python", "CI/CD", "Monitoring"],
    experience_min: 3,
    experience_max: 8,
    salary_min: 160000,
    salary_max: 220000,
    location: "San Francisco, CA",
    remote_allowed: true,
    status: "active",
    ai_matching_score: 0,
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z",
    company_name: "TechCorp AI",
  },
  {
    id: "job-5",
    company_id: "comp-2",
    recruiter_id: "recruiter-2",
    title: "Junior AI Engineer",
    description:
      "Perfect opportunity for a recent graduate or career changer to join our AI team. You'll work on exciting projects involving LLMs, computer vision, and recommendation systems. We provide mentorship and growth opportunities in a supportive environment.",
    requirements: [
      "BS/MS in Computer Science or related field",
      "1-2 years of programming experience",
      "Basic knowledge of machine learning concepts",
      "Strong problem-solving skills",
      "Eagerness to learn and grow",
    ],
    skills_required: ["Python", "Machine Learning", "TensorFlow", "Git", "SQL"],
    experience_min: 1,
    experience_max: 3,
    salary_min: 100000,
    salary_max: 140000,
    location: "New York, NY",
    remote_allowed: true,
    status: "active",
    ai_matching_score: 0,
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
    company_name: "DataFlow Systems",
  },
]

// Mock Applications
export const mockApplications: MockApplication[] = [
  {
    id: "app-1",
    job_id: "job-1",
    candidate_id: "candidate-1",
    status: "interview",
    ai_match_score: 92,
    cover_letter:
      "I'm excited to apply for the Senior ML Engineer position. My 7 years of experience building production ML systems at scale aligns perfectly with your requirements. I've led teams in implementing computer vision models that process millions of images daily.",
    resume_url: "/placeholder.pdf",
    applied_at: "2024-01-15T14:30:00Z",
    updated_at: "2024-01-18T10:00:00Z",
  },
  {
    id: "app-2",
    job_id: "job-2",
    candidate_id: "candidate-2",
    status: "pending",
    ai_match_score: 88,
    cover_letter:
      "As a Data Scientist with deep expertise in NLP and statistical modeling, I'm thrilled about the opportunity to work on enterprise NLP solutions. My PhD in Statistics and hands-on experience with transformer models make me a strong fit.",
    resume_url: "/placeholder.pdf",
    applied_at: "2024-01-16T09:15:00Z",
    updated_at: "2024-01-16T09:15:00Z",
  },
  {
    id: "app-3",
    job_id: "job-3",
    candidate_id: "candidate-3",
    status: "offer",
    ai_match_score: 95,
    cover_letter:
      "With my background as a former Google Brain researcher and focus on reinforcement learning, I'm passionate about applying AI to healthcare challenges. My publication record and research experience align well with your team's goals.",
    resume_url: "/placeholder.pdf",
    applied_at: "2024-01-17T11:45:00Z",
    updated_at: "2024-01-22T16:30:00Z",
  },
  {
    id: "app-4",
    job_id: "job-4",
    candidate_id: "candidate-4",
    status: "screening",
    ai_match_score: 90,
    cover_letter:
      "I'm excited about the MLOps Engineer role. My 4 years of experience building scalable ML infrastructure and expertise in Kubernetes and cloud platforms would be valuable to your team's mission of serving ML models at scale.",
    resume_url: "/placeholder.pdf",
    applied_at: "2024-01-19T13:20:00Z",
    updated_at: "2024-01-20T08:45:00Z",
  },
  {
    id: "app-5",
    job_id: "job-5",
    candidate_id: "candidate-5",
    status: "hired",
    ai_match_score: 78,
    cover_letter:
      "As a Full-stack AI Engineer with 3 years of experience in LLMs and conversational AI, I'm eager to contribute to your junior AI engineer role. I'm passionate about learning and growing in a supportive environment.",
    resume_url: "/placeholder.pdf",
    applied_at: "2024-01-21T10:00:00Z",
    updated_at: "2024-01-25T14:15:00Z",
  },
]

// Mock Projects
export const mockProjects: MockProject[] = [
  {
    id: "proj-1",
    candidate_id: "candidate-1",
    title: "Real-time Object Detection System",
    description:
      "Built a real-time object detection system using YOLOv8 that processes video streams at 60 FPS. Deployed on edge devices for autonomous vehicle applications.",
    technologies: ["Python", "PyTorch", "OpenCV", "CUDA", "Docker", "Kubernetes"],
    github_url: "https://github.com/alexchen/realtime-detection",
    demo_url: "https://demo.alexchen.dev/detection",
    achievements: [
      "Achieved 95% mAP on COCO dataset",
      "Reduced inference time by 40%",
      "Deployed to 100+ edge devices",
    ],
    impact_metrics: {
      performance_improvement: "40%",
      accuracy: "95%",
      deployment_scale: "100+ devices",
    },
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "proj-2",
    candidate_id: "candidate-2",
    title: "Customer Sentiment Analysis Platform",
    description:
      "Developed an end-to-end sentiment analysis platform that processes customer reviews and social media data to provide business insights.",
    technologies: ["Python", "Transformers", "BERT", "FastAPI", "PostgreSQL", "React"],
    github_url: "https://github.com/mariarodriguez/sentiment-platform",
    demo_url: null,
    achievements: [
      "Processed 1M+ reviews daily",
      "Achieved 94% accuracy on sentiment classification",
      "Reduced manual review time by 80%",
    ],
    impact_metrics: {
      daily_processing: "1M+ reviews",
      accuracy: "94%",
      time_savings: "80%",
    },
    created_at: "2024-01-08T10:00:00Z",
  },
]

// Mock service to simulate API calls
export class MockDataService {
  private currentUser: MockProfile | null = null

  // Simulate login
  async signIn(email: string, password: string): Promise<{ user: MockProfile | null; error: string | null }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockProfiles.find((p) => p.email === email)
    if (user && password === "password123") {
      this.currentUser = user
      return { user, error: null }
    }
    return { user: null, error: "Invalid credentials" }
  }

  // Simulate signup
  async signUp(
    email: string,
    password: string,
    fullName: string,
    role: "candidate" | "recruiter",
  ): Promise<{ user: MockProfile | null; error: string | null }> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockProfiles.find((p) => p.email === email)) {
      return { user: null, error: "User already exists" }
    }

    const newUser: MockProfile = {
      id: `user-${Date.now()}`,
      role,
      email,
      full_name: fullName,
      avatar_url: `/placeholder.svg?height=100&width=100&query=${role}+professional`,
      github_username: null,
      linkedin_url: null,
      location: null,
      bio: null,
      skills: [],
      experience_years: 0,
      availability: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockProfiles.push(newUser)
    this.currentUser = newUser
    return { user: newUser, error: null }
  }

  // Get current user
  getCurrentUser(): MockProfile | null {
    return this.currentUser
  }

  // Sign out
  signOut(): void {
    this.currentUser = null
  }

  // Get jobs
  async getJobs(filters?: { recruiter_id?: string; status?: string }): Promise<MockJob[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    let jobs = [...mockJobs]

    if (filters?.recruiter_id) {
      jobs = jobs.filter((job) => job.recruiter_id === filters.recruiter_id)
    }

    if (filters?.status) {
      jobs = jobs.filter((job) => job.status === filters.status)
    }

    return jobs
  }

  // Get applications
  async getApplications(filters?: { candidate_id?: string; job_id?: string; recruiter_id?: string }): Promise<
    MockApplication[]
  > {
    await new Promise((resolve) => setTimeout(resolve, 500))

    let applications = mockApplications.map((app) => ({
      ...app,
      job: mockJobs.find((job) => job.id === app.job_id),
      candidate: mockProfiles.find((profile) => profile.id === app.candidate_id),
    }))

    if (filters?.candidate_id) {
      applications = applications.filter((app) => app.candidate_id === filters.candidate_id)
    }

    if (filters?.job_id) {
      applications = applications.filter((app) => app.job_id === filters.job_id)
    }

    if (filters?.recruiter_id) {
      const recruiterJobs = mockJobs.filter((job) => job.recruiter_id === filters.recruiter_id)
      const jobIds = recruiterJobs.map((job) => job.id)
      applications = applications.filter((app) => jobIds.includes(app.job_id))
    }

    return applications
  }

  // Get candidates
  async getCandidates(): Promise<MockProfile[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockProfiles.filter((profile) => profile.role === "candidate")
  }

  // Get projects
  async getProjects(candidateId: string): Promise<MockProject[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockProjects.filter((project) => project.candidate_id === candidateId)
  }

  // Calculate match score (mock AI functionality)
  calculateMatchScore(candidate: MockProfile, job: MockJob): number {
    const candidateSkills = candidate.skills.map((s) => s.toLowerCase())
    const jobSkills = job.skills_required.map((s) => s.toLowerCase())

    const matchingSkills = candidateSkills.filter((skill) =>
      jobSkills.some((jobSkill) => jobSkill.includes(skill) || skill.includes(jobSkill)),
    )

    const skillMatch = matchingSkills.length / jobSkills.length
    const experienceMatch =
      candidate.experience_years >= job.experience_min && candidate.experience_years <= job.experience_max ? 1 : 0.5

    return Math.round((skillMatch * 0.7 + experienceMatch * 0.3) * 100)
  }

  // Get recommended jobs for candidate
  async getRecommendedJobs(candidateId: string): Promise<(MockJob & { matchScore: number })[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const candidate = mockProfiles.find((p) => p.id === candidateId)
    if (!candidate) return []

    const activeJobs = mockJobs.filter((job) => job.status === "active")

    return activeJobs
      .map((job) => ({
        ...job,
        matchScore: this.calculateMatchScore(candidate, job),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
  }
}

export const mockDataService = new MockDataService()
