"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RotateCcw, Keyboard, Clock, Zap } from "lucide-react"

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
  "React is a JavaScript library for building user interfaces. It makes it painless to create interactive UIs.",
  "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  "Next.js is a React framework that gives you building blocks to create web applications with server-side rendering.",
  "Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design.",
]

export function TypingTest() {
  const [currentText, setCurrentText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [currentIndex, setCurrentIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const initializeTest = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]
    setCurrentText(randomText)
    setUserInput("")
    setStartTime(null)
    setEndTime(null)
    setIsActive(false)
    setWpm(0)
    setAccuracy(100)
    setCurrentIndex(0)
    inputRef.current?.focus()
  }

  useEffect(() => {
    initializeTest()
  }, [])

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now())
      setIsActive(true)
    }

    if (userInput === currentText && currentText.length > 0) {
      setEndTime(Date.now())
      setIsActive(false)
    }

    // Calculate accuracy
    let correctChars = 0
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentText[i]) {
        correctChars++
      }
    }
    const accuracyPercent = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100
    setAccuracy(Math.round(accuracyPercent))

    // Calculate WPM
    if (startTime && userInput.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
      const wordsTyped = userInput.length / 5 // standard: 5 characters = 1 word
      const currentWpm = Math.round(wordsTyped / timeElapsed)
      setWpm(currentWpm)
    }

    setCurrentIndex(userInput.length)
  }, [userInput, currentText, startTime])

  const getCharacterClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === currentText[index]
        ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
        : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
    }
    if (index === currentIndex) {
      return "bg-blue-200 dark:bg-blue-800 animate-pulse"
    }
    return "text-slate-600 dark:text-slate-400"
  }

  const isCompleted = userInput === currentText && currentText.length > 0

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="h-5 w-5" />⚡ Typing Speed Test
        </CardTitle>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            {wpm} WPM
          </span>
          <span>Accuracy: {accuracy}%</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {startTime ? Math.round((Date.now() - startTime) / 1000) : 0}s
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 min-h-[120px]">
            <div className="text-lg leading-relaxed font-mono">
              {currentText.split("").map((char, index) => (
                <span key={index} className={`${getCharacterClass(index)} px-0.5 rounded`}>
                  {char}
                </span>
              ))}
            </div>
          </div>

          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Start typing here..."
            disabled={isCompleted}
            className="text-lg font-mono"
          />

          {isCompleted && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">🎉 Test Completed!</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-bold text-2xl text-green-600">{wpm}</div>
                  <div className="text-slate-600 dark:text-slate-400">WPM</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-blue-600">{accuracy}%</div>
                  <div className="text-slate-600 dark:text-slate-400">Accuracy</div>
                </div>
                <div>
                  <div className="font-bold text-2xl text-purple-600">
                    {endTime && startTime ? Math.round((endTime - startTime) / 1000) : 0}s
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Time</div>
                </div>
              </div>
            </div>
          )}

          <Button onClick={initializeTest} size="sm" variant="outline" className="w-full bg-transparent">
            <RotateCcw className="h-4 w-4 mr-1" />
            New Test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
