"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  ExternalLink,
  Users,
  Trophy,
  Target,
  Zap,
  Shield,
  Cloud,
  Code,
  Database,
  Globe,
} from "lucide-react"

interface WorkExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  experience: {
    url: any
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
}

export function WorkExperienceModal({ isOpen, onClose, experience }: WorkExperienceModalProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "core product development":
        return <Code className="h-5 w-5" />
      case "infrastructure & devops":
        return <Cloud className="h-5 w-5" />
      case "security & monitoring":
        return <Shield className="h-5 w-5" />
      case "api integration & documentation":
        return <Globe className="h-5 w-5" />
      case "frontend architecture":
        return <Zap className="h-5 w-5" />
      case "banking & insurance applications":
        return <Database className="h-5 w-5" />
      case "performance & code quality":
        return <Target className="h-5 w-5" />
      case "team collaboration & ci/cd":
        return <Users className="h-5 w-5" />
      default:
        return <Trophy className="h-5 w-5" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-md bg-black/80 border-white/20 text-white">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm p-2 shadow-md border border-white/30">
              <img
                src={experience.logo || "/placeholder.svg"}
                alt={`${experience.company} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">{experience.position}</DialogTitle>
              <p className="text-lg font-medium text-blue-400">{experience.company}</p>
              <div className="flex items-center gap-4 text-sm text-white/80 mt-1">
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
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 hover:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 hover:text-white"
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="technologies"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 hover:text-white"
            >
              Tech Stack
            </TabsTrigger>
            <TabsTrigger
              value="impact"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 hover:text-white"
            >
              Impact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="relative h-48 rounded-lg overflow-hidden border border-white/20">
              <img
                src={experience.companyImage || "/placeholder.svg"}
                alt={`${experience.company} office`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{experience.company}</h3>
                <p className="text-sm opacity-90">{experience.location}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {experience.teamSize && (
                <Card className="backdrop-blur-md bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                    <p className="font-semibold text-white">{experience.teamSize}</p>
                    <p className="text-sm text-white/70">Team Size</p>
                  </CardContent>
                </Card>
              )}
              {experience.projectsCompleted && (
                <Card className="backdrop-blur-md bg-white/10 border-white/20">
                  <CardContent className="p-4 text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <p className="font-semibold text-white">{experience.projectsCompleted}+</p>
                    <p className="text-sm text-white/70">Projects</p>
                  </CardContent>
                </Card>
              )}
              <Card className="backdrop-blur-md bg-white/10 border-white/20">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <p className="font-semibold text-white">{experience.technologies.length}+</p>
                  <p className="text-sm text-white/70">Technologies</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {experience.achievements.map((achievement, index) => (
              <Card key={index} className="border-l-4 border-l-blue-400 backdrop-blur-md bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    {getCategoryIcon(achievement.category)}
                    {achievement.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {achievement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="technologies" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-md bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Code className="h-5 w-5 text-blue-400" />
                    Technologies Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30 hover:bg-blue-400/20 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Key Skills Developed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm text-white/80">Full-Stack Development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm text-white/80">Cloud Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm text-white/80">Team Leadership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm text-white/80">System Design</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="h-5 w-5 text-green-400" />
                  Business Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                {experience.impact && (
                  <ul className="space-y-3">
                    {experience.impact.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t border-white/20">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
          >
            Close
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-950 text-white gap-2">
            <ExternalLink className="h-4 w-4" />
            <a href={`${experience.url}`} target="_blank">View Company</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
