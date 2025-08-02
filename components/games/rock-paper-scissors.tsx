"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Trophy } from "lucide-react"

type Choice = "rock" | "paper" | "scissors"
type Result = "win" | "lose" | "tie"

const choices: { value: Choice; emoji: string; name: string }[] = [
  { value: "rock", emoji: "🪨", name: "Rock" },
  { value: "paper", emoji: "📄", name: "Paper" },
  { value: "scissors", emoji: "✂️", name: "Scissors" },
]

export function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 })
  const [isAnimating, setIsAnimating] = useState(false)

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex].value
  }

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return "tie"
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "win"
    }
    return "lose"
  }

  const playGame = (playerChoice: Choice) => {
    setIsAnimating(true)
    setPlayerChoice(playerChoice)

    // Animate computer choice selection
    let animationCount = 0
    const animationInterval = setInterval(() => {
      setComputerChoice(getRandomChoice())
      animationCount++

      if (animationCount >= 10) {
        clearInterval(animationInterval)
        const finalComputerChoice = getRandomChoice()
        setComputerChoice(finalComputerChoice)

        const gameResult = determineWinner(playerChoice, finalComputerChoice)
        setResult(gameResult)

        setScore((prev) => ({
          ...prev,
          player: gameResult === "win" ? prev.player + 1 : prev.player,
          computer: gameResult === "lose" ? prev.computer + 1 : prev.computer,
          ties: gameResult === "tie" ? prev.ties + 1 : prev.ties,
        }))

        setIsAnimating(false)
      }
    }, 100)
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setScore({ player: 0, computer: 0, ties: 0 })
    setIsAnimating(false)
  }

  const getResultMessage = () => {
    if (!result) return "Choose your weapon!"
    switch (result) {
      case "win":
        return "🎉 You Win!"
      case "lose":
        return "😅 Computer Wins!"
      case "tie":
        return "🤝 It's a Tie!"
    }
  }

  const getResultColor = () => {
    switch (result) {
      case "win":
        return "text-green-600 dark:text-green-400"
      case "lose":
        return "text-red-600 dark:text-red-400"
      case "tie":
        return "text-yellow-600 dark:text-yellow-400"
      default:
        return "text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎮 Rock Paper Scissors
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardTitle>
        <div className="flex justify-between text-sm">
          <span>You: {score.player}</span>
          <span>Ties: {score.ties}</span>
          <span>Computer: {score.computer}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Game Area */}
          <div className="text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {playerChoice ? choices.find((c) => c.value === playerChoice)?.emoji : "❓"}
                </div>
                <div className="text-sm font-medium">You</div>
              </div>

              <div className="text-2xl font-bold">VS</div>

              <div className="text-center">
                <div className={`text-4xl mb-2 ${isAnimating ? "animate-bounce" : ""}`}>
                  {computerChoice ? choices.find((c) => c.value === computerChoice)?.emoji : "❓"}
                </div>
                <div className="text-sm font-medium">Computer</div>
              </div>
            </div>

            <div className={`text-lg font-bold ${getResultColor()}`}>{getResultMessage()}</div>
          </div>

          {/* Choice Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {choices.map((choice) => (
              <Button
                key={choice.value}
                onClick={() => playGame(choice.value)}
                disabled={isAnimating}
                variant="outline"
                className="h-20 flex flex-col gap-1 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">{choice.emoji}</span>
                <span className="text-xs">{choice.name}</span>
              </Button>
            ))}
          </div>

          {/* Reset Button */}
          <Button onClick={resetGame} size="sm" variant="outline" className="w-full bg-transparent">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset Score
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
