"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building2 } from "lucide-react"

interface WorkExperienceCardProps {
  experience: {
    company: string
    position: string
    duration: string
    location: string
    logo: string
    companyImage: string
    achievements: Array<{
      category: string
      items: string[]
    }>
    technologies: string[]
    teamSize?: string
    projectsCompleted?: number
    impact?: string[]
  }
  onClick: () => void
  delay?: number
}

export function WorkExperienceCard({ experience, onClick, delay = 0 }: WorkExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group border-l-4 border-l-blue-400 backdrop-blur-md bg-white/10 border-white/20"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Flashing Company Name Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-950/90 to-purple-950/90 backdrop-blur-sm flex items-center justify-center transition-all duration-700 ${isHovered ? "opacity-95 scale-100" : "opacity-0 scale-110"
          }`}
      >
        <div className="text-center text-white">
          <Building2 className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold mb-2 animate-bounce">{experience.company}</h3>
          <p className="text-lg opacity-90">Click to explore</p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/20 backdrop-blur-sm p-2 shadow-md flex-shrink-0 border border-white/30">
            <img
              src={experience.logo || "/placeholder.svg"}
              alt={`${experience.company} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{experience.position}</h3>
            <p className="text-lg font-medium text-blue-400 mb-2">{experience.company}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {experience.duration}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {experience.location}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-white mb-2">Key Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {experience.technologies.slice(0, 6).map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  {tech}
                </Badge>
              ))}
              {experience.technologies.length > 6 && (
                <Badge variant="outline" className="text-xs bg-white/10 border-white/30 text-white/80">
                  +{experience.technologies.length - 6} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">Focus Areas</h4>
            <div className="space-y-1">
              {experience.achievements.slice(0, 2).map((achievement, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>{achievement.category}</span>
                </div>
              ))}
              {experience.achievements.length > 2 && (
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <span>+{experience.achievements.length - 2} more areas</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-blue-400/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Building2 className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
