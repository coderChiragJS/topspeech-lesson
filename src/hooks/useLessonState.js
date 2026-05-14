import { useState, useCallback } from 'react'
import { lesson } from '../data/lesson'

export function useLessonState() {
  const [screen, setScreen] = useState('start') // 'start' | 'lesson' | 'complete'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState('answering') // 'answering' | 'correct' | 'retry' | 'confidence'
  const [confidenceScores, setConfidenceScores] = useState([]) // 1=needed work, 2=getting there, 3=nailed it
  const [xp, setXp] = useState(0)
  const [streak] = useState(4) // mocked streak

  const currentExercise = lesson.exercises[currentIndex]
  const totalCards = lesson.exercises.length

  const startLesson = useCallback(() => {
    setScreen('lesson')
    setCurrentIndex(0)
    setPhase('answering')
    setConfidenceScores([])
    setXp(0)
  }, [])

  const handleCorrect = useCallback(() => {
    setXp(prev => prev + lesson.xpPerCard)
    setPhase('correct')
  }, [])

  const handleRetry = useCallback(() => {
    setPhase('retry')
  }, [])

  const handleConfidence = useCallback((score) => {
    setConfidenceScores(prev => [...prev, score])
    setXp(prev => prev + lesson.xpPerCard)
    setPhase('correct')
  }, [])

  const advance = useCallback(() => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= totalCards) {
      setScreen('complete')
    } else {
      setCurrentIndex(nextIndex)
      setPhase('answering')
    }
  }, [currentIndex, totalCards])

  const resetRetry = useCallback(() => {
    setPhase('answering')
  }, [])

  const restartLesson = useCallback(() => {
    setScreen('start')
    setCurrentIndex(0)
    setPhase('answering')
    setConfidenceScores([])
    setXp(0)
  }, [])

  return {
    screen,
    currentIndex,
    currentExercise,
    phase,
    confidenceScores,
    xp,
    streak,
    totalCards,
    startLesson,
    handleCorrect,
    handleRetry,
    handleConfidence,
    advance,
    resetRetry,
    restartLesson,
  }
}
