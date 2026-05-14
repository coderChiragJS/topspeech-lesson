import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lesson } from '../data/lesson'

const CONFIDENCE_LABELS = ['', 'Needed work', 'Getting there', 'Nailed it!']
const CONFIDENCE_EMOJIS = ['', '😟', '🙂', '🎯']
const CONFIDENCE_COLORS = ['', '#FCA5A5', '#FCD34D', '#6EE7B7']
const CONFIDENCE_BG = ['', '#FEF2F2', '#FFFBEB', '#ECFDF5']

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return count
}

function Confetti() {
  const pieces = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#2B8A6E', '#F59E0B', '#A78BFA', '#FB7185', '#34D399'][i % 5],
    delay: Math.random() * 0.6,
    duration: 1.5 + Math.random() * 1,
    rotate: Math.random() * 720 - 360,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2.5 h-2.5 rounded-sm"
          style={{ left: `${p.x}%`, backgroundColor: p.color, top: -20 }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ delay: p.delay, duration: p.duration, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

export default function CompleteScreen({ xp, streak, confidenceScores, onRestart }) {
  const displayXp = useCountUp(xp, 1400)
  const [showJourney, setShowJourney] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  const repeatExercises = lesson.exercises.filter(e => e.type === 'listen_repeat')

  useEffect(() => {
    const t = setTimeout(() => setShowJourney(true), 900)
    const t2 = setTimeout(() => setShowConfetti(false), 2500)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  const avgConfidence = confidenceScores.length
    ? confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length
    : 0

  const overallLabel = avgConfidence >= 2.5 ? 'Strong session' : avgConfidence >= 1.5 ? 'Good effort' : 'Keep practicing'
  const overallEmoji = avgConfidence >= 2.5 ? '🌟' : avgConfidence >= 1.5 ? '💪' : '🔄'

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center px-5 pt-10 pb-10 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Trophy */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="w-24 h-24 bg-[#FEF3C7] rounded-full flex items-center justify-center shadow-lg border-4 border-[#FDE68A]"
        >
          <span className="text-5xl">{overallEmoji}</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-2xl font-black text-[#1a1a1a]">Lesson Complete!</h1>
          <p className="text-[#6b7280] text-sm mt-1">{overallLabel} — you showed up today. That matters.</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="w-full grid grid-cols-3 gap-3"
        >
          {/* XP */}
          <div className="bg-white rounded-2xl p-3.5 flex flex-col items-center gap-1 shadow-sm border border-[#F0EDE8]">
            <span className="text-2xl">⭐</span>
            <span className="text-2xl font-black text-[#F59E0B] count-up">{displayXp}</span>
            <span className="text-xs text-[#9ca3af] font-medium">XP earned</span>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-2xl p-3.5 flex flex-col items-center gap-1 shadow-sm border border-[#F0EDE8]">
            <span className="text-2xl pulse-glow">🔥</span>
            <span className="text-2xl font-black text-[#F97316]">{streak + 1}</span>
            <span className="text-xs text-[#9ca3af] font-medium">day streak</span>
          </div>

          {/* Cards done */}
          <div className="bg-white rounded-2xl p-3.5 flex flex-col items-center gap-1 shadow-sm border border-[#F0EDE8]">
            <span className="text-2xl">✅</span>
            <span className="text-2xl font-black text-[#2B8A6E]">6</span>
            <span className="text-xs text-[#9ca3af] font-medium">exercises</span>
          </div>
        </motion.div>

        {/* Confidence Journey */}
        <AnimatePresence>
          {showJourney && confidenceScores.length > 0 && (
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#F0EDE8]"
            >
              <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-4">Your Confidence Journey</p>
              <div className="flex flex-col gap-3">
                {confidenceScores.map((score, i) => {
                  const exercise = repeatExercises[i]
                  if (!exercise) return null
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xl w-7 text-center">{CONFIDENCE_EMOJIS[score]}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-[#374151]">{exercise.word}</span>
                          <span className="text-xs text-[#6b7280]">{CONFIDENCE_LABELS[score]}</span>
                        </div>
                        <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: CONFIDENCE_COLORS[score] }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / 3) * 100}%` }}
                            transition={{ duration: 0.6, delay: i * 0.1 + 0.2, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <p className="text-xs text-[#9ca3af] mt-4 leading-relaxed">
                Self-monitoring is a real therapy skill. You're building it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tomorrow teaser */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="w-full flex items-center gap-3 bg-[#F0FDF8] rounded-2xl p-4 border border-[#A7F3D0]"
        >
          <span className="text-2xl">📅</span>
          <div>
            <p className="text-sm font-bold text-[#065F46]">Day 2 unlocks tomorrow</p>
            <p className="text-xs text-[#6b7280]">Words with R in the middle position</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="w-full flex flex-col gap-3"
        >
          <button
            onClick={onRestart}
            className="w-full bg-[#2B8A6E] text-white font-bold text-base py-4 rounded-2xl shadow active:scale-[0.97] transition-transform"
          >
            Practice again
          </button>
          <button
            onClick={onRestart}
            className="w-full text-[#2B8A6E] font-semibold text-sm py-3 rounded-2xl border border-[#2B8A6E] active:scale-[0.97] transition-transform"
          >
            Back to home
          </button>
        </motion.div>
      </div>
    </div>
  )
}
