import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONFIDENCE_OPTIONS = [
  { value: 1, emoji: '😟', label: 'Needed work', color: 'border-[#FCA5A5] bg-[#FEF2F2]', activeColor: 'border-[#EF4444] bg-[#FEE2E2]', textColor: 'text-[#991B1B]' },
  { value: 2, emoji: '🙂', label: 'Getting there', color: 'border-[#FCD34D] bg-[#FFFBEB]', activeColor: 'border-[#F59E0B] bg-[#FEF3C7]', textColor: 'text-[#92400E]' },
  { value: 3, emoji: '🎯', label: 'Nailed it!', color: 'border-[#6EE7B7] bg-[#ECFDF5]', activeColor: 'border-[#2B8A6E] bg-[#D1FAE5]', textColor: 'text-[#065F46]' },
]

export default function ListenRepeatCard({ exercise, onConfidence }) {
  const [didSayIt, setDidSayIt] = useState(false)
  const [selectedConfidence, setSelectedConfidence] = useState(null)
  const [isAnimatingWord, setIsAnimatingWord] = useState(false)

  const handleSayIt = () => {
    setIsAnimatingWord(true)
    setTimeout(() => setIsAnimatingWord(false), 600)
    setDidSayIt(true)
  }

  const handleConfidenceSelect = (value) => {
    if (selectedConfidence !== null) return
    setSelectedConfidence(value)
    setTimeout(() => onConfidence(value), 500)
  }

  // Render word with R highlighted
  const renderWord = (word) => {
    const parts = []
    let i = 0
    while (i < word.length) {
      if (word[i].toLowerCase() === 'r') {
        parts.push(<span key={i} className="text-[#2B8A6E] relative">
          {word[i]}
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2B8A6E] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        </span>)
      } else {
        parts.push(<span key={i}>{word[i]}</span>)
      }
      i++
    }
    return parts
  }

  return (
    <div className="flex flex-col flex-1 px-5 py-6 gap-5">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-[#2B8A6E] uppercase tracking-widest mb-1">Listen & Repeat</p>
        <p className="text-[#6b7280] text-sm leading-relaxed">{exercise.cue}</p>
      </div>

      {/* Word display */}
      <motion.div
        animate={isAnimatingWord ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-2 bg-white rounded-3xl py-10 px-6 shadow-sm border border-[#F0EDE8]"
      >
        <div className="text-5xl font-black tracking-wider text-[#1a1a1a] leading-none">
          {renderWord(exercise.word)}
        </div>
        <p className="text-[#9ca3af] text-base font-mono mt-1">{exercise.phonetic}</p>

        {/* Sound wave animation when saying */}
        <AnimatePresence>
          {isAnimatingWord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-end gap-1 h-8 mt-2"
            >
              {[3, 6, 9, 12, 9, 6, 3, 6, 9, 6, 3].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#2B8A6E] rounded-full"
                  animate={{ height: [h, h * 2.5, h] }}
                  transition={{ duration: 0.4, delay: i * 0.04, repeat: Infinity }}
                  style={{ height: h }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Say it button */}
      <AnimatePresence mode="wait">
        {!didSayIt ? (
          <motion.button
            key="say-it"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={handleSayIt}
            className="w-full py-4 rounded-2xl bg-[#2B8A6E] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow active:scale-[0.97] transition-transform"
          >
            <span className="text-xl">🎙️</span>
            Say it out loud
          </motion.button>
        ) : (
          <motion.div
            key="confidence"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <p className="text-sm font-semibold text-[#374151] text-center">How did that feel?</p>
            <div className="flex gap-2.5">
              {CONFIDENCE_OPTIONS.map((opt, i) => (
                <motion.button
                  key={opt.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
                  onClick={() => handleConfidenceSelect(opt.value)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all active:scale-[0.95] ${
                    selectedConfidence === opt.value
                      ? opt.activeColor
                      : selectedConfidence !== null
                      ? 'opacity-40 ' + opt.color
                      : opt.color
                  }`}
                >
                  <motion.span
                    animate={selectedConfidence === opt.value ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-2xl"
                  >
                    {opt.emoji}
                  </motion.span>
                  <span className={`text-xs font-semibold leading-tight text-center ${opt.textColor}`}>
                    {opt.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Try again hint */}
      {!didSayIt && (
        <p className="text-center text-xs text-[#9ca3af]">Tap after you've said the word aloud</p>
      )}
    </div>
  )
}
