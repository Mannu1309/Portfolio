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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white p-2 shadow-md">
              <img
                src={experience.logo || "/placeholder.svg"}
                alt={`${experience.company} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                {experience.position}
              </DialogTitle>
              <p className="text-lg font-medium text-blue-600">{experience.company}</p>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mt-1">
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="technologies">Tech Stack</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <img
                src={experience.companyImage || "/placeholder.svg"}
                alt={`${experience.company} office`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{experience.company}</h3>
                <p className="text-sm opacity-90">{experience.location}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {experience.teamSize && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold">{experience.teamSize}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Team Size</p>
                  </CardContent>
                </Card>
              )}
              {experience.projectsCompleted && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold">{experience.projectsCompleted}+</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Projects</p>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-semibold">{experience.technologies.length}+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Technologies</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {experience.achievements.map((achievement, index) => (
              <Card key={index} className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getCategoryIcon(achievement.category)}
                    {achievement.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {achievement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="technologies" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Technologies Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="hover:bg-blue-100 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Key Skills Developed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                      <span className="text-sm">Full-Stack Development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                      <span className="text-sm">Cloud Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                      <span className="text-sm">Team Leadership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                      <span className="text-sm">System Design</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-600" />
                  Business Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                {experience.impact && (
                  <ul className="space-y-3">
                    {experience.impact.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gap-2">
            <ExternalLink className="h-4 w-4" />
            <a href={`${experience.url}`} target='_blank'>View Company</a>

          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
