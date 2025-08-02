"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Trophy, Clock } from "lucide-react"

const EMOJIS = ["🚀", "💻", "🎮", "🎯", "⚡", "🔥", "💎", "🌟"]

interface CardType {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(shuffledEmojis)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameWon(false)
    setTime(0)
    setIsPlaying(true)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, gameWon])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find((card) => card.id === first)
      const secondCard = cards.find((card) => card.id === second)

      if (firstCard?.emoji === secondCard?.emoji) {
        setCards((prev) =>
          prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
        )
        setMatches((prev) => prev + 1)
        setFlippedCards([])
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (matches === EMOJIS.length) {
      setGameWon(true)
      setIsPlaying(false)
    }
  }, [matches])

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (cards.find((card) => card.id === cardId)?.isFlipped) return
    if (cards.find((card) => card.id === cardId)?.isMatched) return

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))
    setFlippedCards((prev) => [...prev, cardId])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🧠 Memory Game
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardTitle>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTime(time)}
          </span>
          <span>Moves: {moves}</span>
          <span>
            Matches: {matches}/{EMOJIS.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg border-2 text-2xl font-bold transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 transform rotate-0"
                    : "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 transform hover:scale-105"
                } ${card.isMatched ? "animate-pulse bg-green-100 dark:bg-green-900" : ""}`}
                disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
              >
                {card.isFlipped || card.isMatched ? card.emoji : "?"}
              </button>
            ))}
          </div>

          {gameWon && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                <h3 className="text-lg font-bold mb-2">🎉 Congratulations!</h3>
                <p className="text-sm mb-2">Time: {formatTime(time)}</p>
                <p className="text-sm mb-4">Moves: {moves}</p>
                <Button onClick={initializeGame} size="sm">
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button onClick={initializeGame} size="sm" variant="outline" className="w-full bg-transparent">
          <RotateCcw className="h-4 w-4 mr-1" />
          New Game
        </Button>
      </CardContent>
    </Card>
  )
}
