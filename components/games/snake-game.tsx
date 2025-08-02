"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Trophy } from "lucide-react"

interface Position {
  x: number
  y: number
}

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = { x: 0, y: -1 }

export function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION)
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    return newFood
  }, [])

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setScore(0)
    setGameOver(false)
    setIsPlaying(false)
  }, [])

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10
          if (newScore > highScore) {
            setHighScore(newScore)
          }
          return newScore
        })
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, isPlaying, gameOver, highScore, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, isPlaying])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🐍 Snake Game
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardTitle>
        <div className="flex justify-between text-sm">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div
            className="grid border-2 border-slate-300 bg-slate-100 dark:bg-slate-800 dark:border-slate-600 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: "300px",
              height: "300px",
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE
              const y = Math.floor(index / GRID_SIZE)
              const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
              const isHead = snake[0]?.x === x && snake[0]?.y === y
              const isFood = food.x === x && food.y === y

              return (
                <div
                  key={index}
                  className={`border border-slate-200 dark:border-slate-700 ${
                    isSnake
                      ? isHead
                        ? "bg-green-600 animate-pulse"
                        : "bg-green-400"
                      : isFood
                        ? "bg-red-500 animate-bounce"
                        : ""
                  }`}
                />
              )
            })}
          </div>

          {gameOver && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                <h3 className="text-lg font-bold mb-2">Game Over!</h3>
                <p className="text-sm mb-4">Final Score: {score}</p>
                <Button onClick={resetGame} size="sm">
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={() => setIsPlaying(!isPlaying)} disabled={gameOver} size="sm" className="flex-1">
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetGame} size="sm" variant="outline">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 text-center">
          Use arrow keys to control the snake
        </p>
      </CardContent>
    </Card>
  )
}
