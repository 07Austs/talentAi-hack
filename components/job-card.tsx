"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign } from "lucide-react"
import type { MockJob } from "@/lib/mock-data"

interface JobCardProps {
  job: MockJob
  matchScore?: number
  onApply?: () => void
  showMatchScore?: boolean
}

export function JobCard({ job, matchScore, onApply, showMatchScore = false }: JobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
                {job.remote_allowed && " • Remote OK"}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.experience_min}-{job.experience_max} years
              </span>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
            {showMatchScore && matchScore && (
              <Badge className="bg-blue-100 text-blue-800">{Math.round(matchScore)}% Match</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills_required?.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills_required && job.skills_required.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{job.skills_required.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {job.salary_min && job.salary_max && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />${(job.salary_min / 1000).toFixed(0)}K - $
                {(job.salary_max / 1000).toFixed(0)}K
              </span>
            )}
            <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
          </div>
          {onApply && (
            <Button size="sm" onClick={onApply}>
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
