"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, User, Users, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DemoCredential {
  role: "candidate" | "recruiter" | "admin"
  email: string
  password: string
  name: string
  description: string
}

const demoCredentials: DemoCredential[] = [
  {
    role: "candidate",
    email: "alex.chen@email.com",
    password: "password123",
    name: "Alex Chen",
    description: "Senior ML Engineer with 7+ years experience",
  },
  {
    role: "candidate",
    email: "maria.rodriguez@email.com",
    password: "password123",
    name: "Maria Rodriguez",
    description: "Data Scientist specializing in deep learning",
  },
  {
    role: "recruiter",
    email: "john.recruiter@techcorp.ai",
    password: "password123",
    name: "John Smith",
    description: "Senior Technical Recruiter at TechCorp AI",
  },
  {
    role: "recruiter",
    email: "lisa.talent@dataflow.com",
    password: "password123",
    name: "Lisa Johnson",
    description: "Data Science recruiter at DataFlow Systems",
  },
  {
    role: "admin",
    email: "admin@talentai.com",
    password: "password123",
    name: "Sarah Admin",
    description: "Platform administrator",
  },
]

export function DemoCredentials() {
  const { toast } = useToast()

  const copyCredentials = (email: string, password: string) => {
    navigator.clipboard.writeText(`Email: ${email}\nPassword: ${password}`)
    toast({
      title: "Copied!",
      description: "Credentials copied to clipboard",
    })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "recruiter":
        return <Users className="h-4 w-4" />
      case "candidate":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
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

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🚀</span>
          Demo Credentials
        </CardTitle>
        <CardDescription>
          Use these credentials to test different user roles. All passwords are "password123"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {demoCredentials.map((cred, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getRoleIcon(cred.role)}
                  <Badge className={getRoleColor(cred.role)}>{cred.role}</Badge>
                </div>
                <div>
                  <div className="font-medium">{cred.name}</div>
                  <div className="text-sm text-gray-600">{cred.email}</div>
                  <div className="text-xs text-gray-500">{cred.description}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => copyCredentials(cred.email, cred.password)}>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Try different roles to see how the dashboard changes. Candidates see job
            recommendations, recruiters manage applications, and admins have full platform access.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
