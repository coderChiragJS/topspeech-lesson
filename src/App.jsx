import { AnimatePresence, motion } from 'framer-motion'
import { useLessonState } from './hooks/useLessonState'
import StartScreen from './components/StartScreen'
import LessonShell from './components/LessonShell'
import CompleteScreen from './components/CompleteScreen'

const SCREEN_VARIANTS = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function App() {
  const state = useLessonState()

  return (
    <div className="min-h-screen bg-[#FAF7F2] max-w-md mx-auto relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.screen}
          variants={SCREEN_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          {state.screen === 'start' && (
            <StartScreen onStart={state.startLesson} streak={state.streak} />
          )}
          {state.screen === 'lesson' && (
            <LessonShell
              currentIndex={state.currentIndex}
              currentExercise={state.currentExercise}
              phase={state.phase}
              totalCards={state.totalCards}
              onCorrect={state.handleCorrect}
              onRetry={state.handleRetry}
              onConfidence={state.handleConfidence}
              onAdvance={state.advance}
              onAdvanceSilent={state.advanceSilent}
              onResetRetry={state.resetRetry}
              onExit={state.restartLesson}
            />
          )}
          {state.screen === 'complete' && (
            <CompleteScreen
              xp={state.xp}
              streak={state.streak}
              confidenceScores={state.confidenceScores}
              onRestart={state.restartLesson}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
