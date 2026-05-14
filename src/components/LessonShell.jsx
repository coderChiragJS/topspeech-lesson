import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProgressBar from './ProgressBar'
import FeedbackBar from './FeedbackBar'
import MirrorCueCard from './cards/MirrorCueCard'
import ListenRepeatCard from './cards/ListenRepeatCard'
import WordSelectCard from './cards/WordSelectCard'

const CARD_VARIANTS = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
}

export default function LessonShell({
  currentIndex,
  currentExercise,
  phase,
  totalCards,
  onCorrect,
  onRetry,
  onConfidence,
  onAdvance,
  onResetRetry,
  onAdvanceSilent,
  onExit,
}) {
  const [retryCount, setRetryCount] = useState(0)

  const handleAdvance = () => onAdvance()

  const handleRetry = () => {
    setRetryCount(c => c + 1)
    onResetRetry()
  }

  const renderCard = () => {
    switch (currentExercise.type) {
      case 'mirror_cue':
        return (
          <MirrorCueCard
            exercise={currentExercise}
            onContinue={onAdvanceSilent}
          />
        )
      case 'listen_repeat':
        return (
          <ListenRepeatCard
            exercise={currentExercise}
            onConfidence={onConfidence}
          />
        )
      case 'word_select':
        return (
          <WordSelectCard
            key={`${currentExercise.id}-${retryCount}`}
            exercise={currentExercise}
            onCorrect={onCorrect}
            onRetry={onRetry}
          />
        )
      default:
        return null
    }
  }

  const showFeedback = phase === 'correct' || phase === 'retry'

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-1">
        {onExit && (
          <button
            onClick={onExit}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[#9ca3af] active:bg-[#F0EDE8] transition-colors"
            aria-label="Exit lesson"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        <ProgressBar current={currentIndex} total={totalCards} />
      </div>

      {/* Card area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentExercise.id}
            custom={direction}
            variants={CARD_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col"
          >
            {renderCard()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback bar */}
      {showFeedback && (
        <FeedbackBar
          phase={phase}
          exercise={currentExercise}
          onContinue={handleAdvance}
          onRetry={handleRetry}
        />
      )}
    </div>
  )
}
