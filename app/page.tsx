'use client';

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Calendar,
  Code,
  Server,
  Cloud,
  Shield,
  Wrench,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Download,
  ExternalLink,
  User,
  Award,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { FadeInSection } from "@/components/fade-in-section"
import { TypingAnimation } from "@/components/typing-animation"
import { AnimatedCounter } from "@/components/animated-counter"
import { WorkExperienceCard } from "@/components/work-experience-card"
import { WorkExperienceModal } from "@/components/work-experience-modal"
import { StarryBackground } from "@/components/starry-background"

export default function Portfolio() {
  const [selectedExperience, setSelectedExperience] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const skills = {
    "Frontend Development": [
      "React.js",
      "Next.js",
      "TailwindCSS",
      "shadcn/ui",
      "Redux",
      "Context API",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "Figma",
    ],
    "Backend & API": [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Prisma ORM",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "JWT",
      "Apache Kafka",
    ],
    "Cloud & DevOps": [
      "Docker",
      "GitHub Actions",
      "AWS (Elastic Beanstalk, S3, SES, Secrets Manager)",
      "CI/CD",
      "CloudWatch",
    ],
    "Security & Testing": [
      "RBAC",
      "PII Redaction",
      "Prompt Injection Defense",
      "Secretlint",
      "Hadolint",
      "ESLint",
      "Jest",
      "Mocha",
      "Chai",
      "Postman",
    ],
    Tools: ["Git", "GitHub", "Webpack", "Babel", "NPM", "Prettier", "Chrome Extensions"],
  }

  const skillColor = {
    "Frontend Development": "text-blue-400",
    "Backend & API": "text-green-400",
    "Cloud & DevOps": "text-purple-400",
    "Security & Testing": "text-red-400",
    Tools: "text-yellow-400",
  }

  const workExperience = [
    {
      company: "AltrumAI (Aligne Consulting India Pvt. Ltd.)",
      url: 'https://altrum.ai',
      position: "Full Stack Engineer",
      duration: "Jan 2025 – July 2025",
      location: "Remote, London",
      logo: "/experience/altrumai-logo.png",
      companyImage: "/org/altrum.jpg",
      teamSize: "3 Engineers",
      projectsCompleted: 4,
      technologies: [
        "Next.js",
        "React.js",
        "PostgreSQL",
        "Prisma",
        "AWS",
        "Docker",
        "GitHub Actions",
        "TypeScript",
        "TailwindCSS",
        "shadcn/ui",
        "OpenAI API",
        "Anthropic",
        "Chrome Extensions",
        "CloudWatch",
        "S3",
        "SES",
        "Secrets Manager",
      ],
      impact: [
        "Built a scalable SaaS platform serving 1000+ AI requests per minute",
        "Reduced deployment time by 70% with automated CI/CD pipelines",
        "Implemented security measures protecting sensitive user data for 500+ requests",
        "Created comprehensive API documentation reducing developer onboarding time by 50%",
      ],
      achievements: [
        {
          category: "Core Product Development",
          items: [
            "Developed a scalable Next.js SaaS platform for AI proxy/gateway services supporting OpenAI, Anthropic, Gemini, Bedrock, and Azure",
            "Designed multi-tenant PostgreSQL schema with Prisma, supporting RBAC and policy versioning",
            "Built a unified API gateway with parameter mapping, cost tracking, and transformation utilities",
          ],
        },
        {
          category: "Infrastructure & DevOps",
          items: [
            "Created CI/CD pipelines using GitHub Actions for automated deployment to AWS Elastic Beanstalk",
            "Dockerized the application with multi-stage builds and optimized production setup",
            "Integrated AWS services like S3, SES, and Secrets Manager for storage, email, and secure config",
          ],
        },
        {
          category: "Security & Monitoring",
          items: [
            "Built advanced logging with PII redaction, securing sensitive user and auth data",
            "Created a Chrome extension to track LLM prompt/response usage for compliance and analytics",
            "Implemented guardrails including toxicity filtering, prompt injection detection, and data privacy",
          ],
        },
        {
          category: "API Integration & Documentation",
          items: [
            "Integrated and standardized APIs for multiple LLM providers under a single interface",
            "Developed reusable middleware for caching, logging (CloudWatch), and request auth",
            "Authored extensive API documentation and onboarding guides for developers",
          ],
        },
        {
          category: "Frontend Architecture",
          items: [
            "Built a responsive dashboard UI for project setup, policy configuration, and real-time analytics",
            "Implemented protected routing and state management using React Context Providers",
            "Created reusable UI components using Tailwind CSS and the shadcn/ui library",
          ],
        },
      ],
    },
    {
      company: "Tata Consultancy Services",
      url: 'https://www.tcs.com',
      position: "Frontend Developer",
      duration: "July 2021 – Nov 2024",
      location: "Pune, Maharashtra",
      logo: "/experience/tcs-logo.png",
      companyImage: "/org/tcs.jpg",
      teamSize: "15-20 Developers",
      projectsCompleted: 7,
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Bootstrap",
        "TailwindCSS",
        "Redux",
        "Context API",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Git",
        "GitHub",
        "JIRA",
        "Bamboo",
        "Postman",
        "ESLint",
        "Prettier",
      ],
      impact: [
        "Improved application performance by 40% through code optimization and refactoring",
        "Reduced bug reports by 60% through implementation of comprehensive testing strategies",
        "Enhanced user experience for 10,000+ banking customers through responsive UI improvements",
        "Streamlined development workflow reducing deployment time by 35%",
      ],
      achievements: [
        {
          category: "Banking & Insurance Applications",
          items: [
            "Developed responsive and accessible UI components using React JS, Bootstrap, and Tailwind CSS for enterprise-grade portals",
            "Built and consumed RESTful APIs using Node.js and Express.js to support real-time user actions like transactions and claims",
            "Implemented user login, session management, and authentication mechanisms backed by MongoDB",
            "Enhanced form handling with real-time validation, error display, and accessibility improvements",
            "Improved state management using Redux and Context API, leading to better scalability across modules",
          ],
        },
        {
          category: "Performance & Code Quality",
          items: [
            "Refactored legacy codebases to improve maintainability, modularity, and adherence to React best practices",
            "Introduced React hooks and reusable components to reduce duplication and improve testability",
            "Performed regular code reviews and implemented ESLint, Prettier, and Git hooks for consistent code quality",
          ],
        },
        {
          category: "Team Collaboration & CI/CD",
          items: [
            "Collaborated with cross-functional teams in agile sprints to deliver UI enhancements and bug fixes",
            "Used Git, GitHub, and JIRA for version control and task tracking",
            "Supported CI/CD pipeline setup and testing integration using Bamboo and Postman for API validation",
          ],
        },
      ],
    },
  ]

  const projects = [
    {
      name: "FileNest - Document Upload Application",
      techStack: ["React JS", "Firebase Authentication", "Firebase Storage", "HTML5/CSS3", "JavaScript"],
      image: "/projects/filenest.jpg",
      code: 'https://github.com/Mannu1309/FileNest',
      demoUrl: "https://file-nest-bay.vercel.app/",
      description: [
        "Built a Google Drive-like app with Firebase for real-time file uploads and secure access",
        "Integrated Firebase Authentication for login and session management",
      ],
    },
    {
      name: "LiveLogistics - Real-Time Food Delivery Tracking System",
      techStack: ["Apache Kafka", "Node.js", "JavaScript", "Git", "GitHub"],
      image: "/projects/livelogistic.jpg",
      code: 'https://github.com/Mannu1309/LiveLogistics',
      demoUrl: "",
      description: [
        "Developed Kafka producers/consumers to stream live updates of delivery rider locations",
        "Built backend logic for processing and displaying order-tracking information in real-time",
      ],
    },
  ]

  const LINKDIN_URL = "https://www.linkedin.com/in/manish-kumar-a44398191/";
  const GITHUB_URL = "https://github.com/Mannu1309";
  const RESUME_URL = "/Resume-ManishKumar.pdf";

  const getSkillIcon = (category: string) => {
    switch (category) {
      case "Frontend Development":
        return <Code className="h-5 w-5" />
      case "Backend & API":
        return <Server className="h-5 w-5" />
      case "Cloud & DevOps":
        return <Cloud className="h-5 w-5" />
      case "Security & Testing":
        return <Shield className="h-5 w-5" />
      case "Tools":
        return <Wrench className="h-5 w-5" />
      default:
        return <Code className="h-5 w-5" />
    }
  }

  const handleExperienceClick = (experience: any) => {
    setSelectedExperience(experience)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen relative">
      {/* Starry Background */}
      <StarryBackground />

      {/* Content Overlay */}
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section id="hero" className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <FadeInSection delay={100}>
              <div className="w-35 h-35 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                <img
                  src="/my-photo.jpg"
                  alt="Manishkumar Profile"
                  width={100}
                  height={100}
                  className="w-full h-full object-fill"
                />
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
                MANISH KUMAR
              </h1>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="text-xl sm:text-2xl text-white/90 mb-8 h-16 flex items-center justify-center drop-shadow-lg">
                <TypingAnimation
                  texts={[
                    "Full Stack Engineer",
                    "React.js Expert",
                    "Next.js Expert",
                    "Node.js Expert",
                  ]}
                />
              </div>
            </FadeInSection>

            {/* Stats */}
            <FadeInSection delay={600}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-white font-bold text-2xl">
                    <AnimatedCounter end={4} suffix="+" />
                  </div>
                  <p className="text-white/70 text-sm">Years Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-2xl">
                    <AnimatedCounter end={5} suffix="+" />
                  </div>
                  <p className="text-white/70 text-sm">Major Projects</p>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-2xl">
                    <AnimatedCounter end={20} suffix="+" />
                  </div>
                  <p className="text-white/70 text-sm">Technologies</p>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-2xl">
                    <AnimatedCounter end={8} suffix=".02" />
                  </div>
                  <p className="text-white/70 text-sm">CGPA</p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={800}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+91-9877532690</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>manish.prj710@gmail.com</span>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={1000}>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(LINKDIN_URL, "_blank")
                    }
                  }}

                  className="hover:scale-105 transition-transform bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(GITHUB_URL, "_blank")
                    }
                  }}

                  className="hover:scale-105 transition-transform bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button size="sm" className="hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700">
                  <a href={RESUME_URL} download="ManishKumar_Resume.pdf">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </div>
                  </a>
                </Button>
              </div>
            </FadeInSection>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Work Experience */}
          <section id="experience" className="mb-16 py-16">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-6 w-6 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">Work Experience</h2>
              </div>
              <p className="text-white/70 mb-8">
                Click on any card to explore detailed information about my role and achievements
              </p>
            </FadeInSection>

            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <FadeInSection key={index} delay={index * 200}>
                  <WorkExperienceCard experience={job} onClick={() => handleExperienceClick(job)} delay={index * 200} />
                </FadeInSection>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-16 py-16">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-8">
                <FolderOpen className="h-6 w-6 text-green-400" />
                <h2 className="text-3xl font-bold text-white">Projects</h2>
              </div>
            </FadeInSection>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <FadeInSection key={index} delay={index * 200} direction={index % 2 === 0 ? "left" : "right"}>
                  <Card className="border-l-4 hover:border-l-green-400 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden backdrop-blur-md bg-white/10 border-white/20">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg text-white group-hover:text-green-400 transition-colors">
                        {project.name}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs bg-white/20 text-white hover:bg-green-400/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {project.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start gap-2 text-white/80">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        {project.demoUrl && <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform bg-white/10 border-white/30 text-white hover:text-white hover:bg-green-800"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          <a href={`${project.demoUrl}`} target="_blank">Demo</a>
                        </Button>}
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform bg-white/10 border-white/30 text-white hover:text-white hover:bg-indigo-950"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          <a href={`${project.code}`} target="_blank">Code</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="mb-16 py-16">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-8">
                <Code className="h-6 w-6 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">Key Skills</h2>
              </div>
            </FadeInSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList], index) => {
                const borderColor =
                  {
                    "Frontend Development": "hover:border-l-blue-400",
                    "Backend & API": "hover:border-l-green-400",
                    "Cloud & DevOps": "hover:border-l-purple-400",
                    "Security & Testing": "hover:border-l-red-400",
                    Tools: "hover:border-l-yellow-500",
                  }[category] || "hover:border-l-white";

                const hoverTextColor =
                  {
                    "Frontend Development": "group-hover:text-blue-400",
                    "Backend & API": "group-hover:text-green-400",
                    "Cloud & DevOps": "group-hover:text-purple-400",
                    "Security & Testing": "group-hover:text-red-400",
                    Tools: "group-hover:text-yellow-500",
                  }[category] || "";

                const hoverTagColor =
                  {
                    "Frontend Development": "hover:bg-blue-800/50",
                    "Backend & API": "hover:bg-green-800/50",
                    "Cloud & DevOps": "hover:bg-purple-800/50",
                    "Security & Testing": "hover:bg-red-800/50",
                    Tools: "hover:bg-yellow-500/50",
                  }[category] || "";

                return (
                  <FadeInSection key={index} delay={index * 100}>
                    <Card
                      className={`border-l-4 ${borderColor} hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group backdrop-blur-md bg-white/10 border-white/20`}
                    >
                      <CardHeader>
                        <CardTitle
                          className={`flex items-center gap-2 text-lg text-white transition-colors ${hoverTextColor}`}
                        >
                          {getSkillIcon(category)}
                          {category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {skillList.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="outline"
                              className={`text-xs bg-white/10 border-white/30 text-white hover:bg-opacity-20 ${hoverTagColor} hover:border-opacity-50 transition-all duration-200 hover:scale-105`}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </FadeInSection>
                );
              })}
            </div>
          </section>


          {/* Education */}
          <section id="education" className="mb-16 py-16">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="h-6 w-6 text-orange-400" />
                <h2 className="text-3xl font-bold text-white">Education</h2>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <Card className="border-l-4 border-l-orange-400 hover:border-l-orange-400 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-md bg-white/10 border-white/20">
                <div className="relative h-32 bg-gradient-to-r from-orange-500/80 to-red-500/80">
                  <img
                    src="/education.png"
                    alt="Punjabi University"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/60 to-red-600/60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Award className="h-6 w-6 mb-1" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Bachelor of Technology in Computer Science & Engineering
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-orange-400">
                    Punjabi University Patiala
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-1 text-white/80">
                      <Calendar className="h-4 w-4" />
                      August 2017 – August 2021
                    </div>
                    <div className="text-white/80">
                      <strong>CGPA: 8.02</strong>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          </section>

          {/* References */}
          <section className="mb-16">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-white mb-8">References</h2>
            </FadeInSection>

            <div className="grid md:grid-cols-2 gap-6">
              <FadeInSection delay={200} direction="left">
                <Card className="hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-md bg-white/10 border-white/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">Bharat Mehan</CardTitle>
                        <CardDescription className="text-white/70">Manager/CTO, AltrumAI</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-white/80 hover:text-blue-400 transition-colors">
                      <Mail className="h-4 w-4" />
                      <span>bharat.mehan@altrum.ai</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>

              <FadeInSection delay={400} direction="right">
                <Card className="hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-md bg-white/10 border-white/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">Gurpreet Dhindsa</CardTitle>
                        <CardDescription className="text-white/70">CEO, AltrumAI</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-white/80 hover:text-green-400 transition-colors">
                      <Mail className="h-4 w-4" />
                      <span>gurpreet.dhindsa@altrum.ai</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </section>

          {/* Contact CTA */}
          <section id="contact" className="text-center py-16">
            <FadeInSection>
              <Card className="bg-gradient-to-r opacity-85 from-violet-950 to-purple-950 text-white border border-purple-900/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden relative backdrop-blur-md">                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/60 to-purple-800/60" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
                <CardContent className="py-12 relative z-10">
                  <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
                  <p className="text-xl mb-8 opacity-90">Ready to bring your next project to life? Get in touch!</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href="mailto:manish.prj710@gmail.com">
                        Send Email
                      </a>

                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent hover:scale-105 transition-all"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      <a href="tel:+919877532690">

                        Call Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          </section>
        </div>

        {/* Work Experience Modal */}
        {selectedExperience && (
          <WorkExperienceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            experience={selectedExperience}
          />
        )}
      </div>
    </div>
  )
}
