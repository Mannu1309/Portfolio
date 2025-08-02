"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Brain, Zap, Trophy, Users } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { SnakeGame } from "./snake-game"
import { MemoryGame } from "./memory-game"
import { TypingTest } from "./typing-test"
import { RockPaperScissors } from "./rock-paper-scissors"

const gameStats = [
  { icon: Users, label: "Players", value: "1,234+" },
  { icon: Trophy, label: "High Scores", value: "567" },
  { icon: Zap, label: "Games Played", value: "8,901" },
  { icon: Brain, label: "Challenges", value: "4" },
]

export function GamesSection() {
  const [activeGame, setActiveGame] = useState("snake")

  return (
    <section id="games" className="mb-16 py-16">
      <FadeInSection>
        <div className="flex items-center gap-3 mb-8">
          <Gamepad2 className="h-6 w-6 text-pink-600" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Fun Games</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Take a break and challenge yourself with these fun mini-games! Test your skills and compete for high scores.
        </p>
      </FadeInSection>

      {/* Game Stats */}
      <FadeInSection delay={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {gameStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-pink-600" />
                <div className="font-bold text-xl">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeInSection>

      {/* Games Tabs */}
      <FadeInSection delay={400}>
        <Card className="border-l-4 border-l-pink-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-pink-600" />
              Choose Your Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeGame} onValueChange={setActiveGame} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="snake" className="flex items-center gap-1">
                  🐍 <span className="hidden sm:inline">Snake</span>
                </TabsTrigger>
                <TabsTrigger value="memory" className="flex items-center gap-1">
                  🧠 <span className="hidden sm:inline">Memory</span>
                </TabsTrigger>
                <TabsTrigger value="typing" className="flex items-center gap-1">
                  ⚡ <span className="hidden sm:inline">Typing</span>
                </TabsTrigger>
                <TabsTrigger value="rps" className="flex items-center gap-1">
                  🎮 <span className="hidden sm:inline">RPS</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="snake" className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-2">🐍 Classic Snake Game</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Control the snake to eat food and grow longer. Don't hit the walls or yourself!
                    </p>
                  </div>
                  <SnakeGame />
                </TabsContent>

                <TabsContent value="memory" className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-2">🧠 Memory Challenge</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Flip cards to find matching pairs. Test your memory and beat your best time!
                    </p>
                  </div>
                  <MemoryGame />
                </TabsContent>

                <TabsContent value="typing" className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-2">⚡ Typing Speed Test</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Test your typing speed and accuracy. How fast can you type?
                    </p>
                  </div>
                  <TypingTest />
                </TabsContent>

                <TabsContent value="rps" className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-2">🎮 Rock Paper Scissors</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Classic game against the computer. Can you outsmart the AI?
                    </p>
                  </div>
                  <RockPaperScissors />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* Game Tips */}
      <FadeInSection delay={600}>
        <Card className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Pro Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">🐍 Snake Game:</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>• Plan your moves ahead</li>
                  <li>• Use the edges strategically</li>
                  <li>• Don't rush, be patient</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🧠 Memory Game:</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>• Remember card positions</li>
                  <li>• Start from corners</li>
                  <li>• Focus on patterns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚡ Typing Test:</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>• Maintain proper posture</li>
                  <li>• Don't look at keyboard</li>
                  <li>• Accuracy over speed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎮 Rock Paper Scissors:</h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>• Look for patterns</li>
                  <li>• Mix up your choices</li>
                  <li>• Stay unpredictable</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>
    </section>
  )
}
