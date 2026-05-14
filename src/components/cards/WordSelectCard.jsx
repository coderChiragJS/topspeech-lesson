import { useState } from 'react'
import { motion } from 'framer-motion'

export default function WordSelectCard({ exercise, onCorrect, onRetry }) {
  const [selected, setSelected] = useState(null)
  const [shake, setShake] = useState(false)

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)

    if (index === exercise.correct) {
      setTimeout(() => onCorrect(), 500)
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        onRetry()
      }, 600)
    }
  }

  const getOptionStyle = (index) => {
    if (selected === null) {
      return 'border-[#E8E4DE] bg-white text-[#1a1a1a] active:scale-[0.97] active:bg-[#F5F1EC]'
    }
    if (index === exercise.correct) {
      return 'border-[#5B4FCF] bg-[#EEF2FF] text-[#2D1B8E]'
    }
    if (index === selected && index !== exercise.correct) {
      return 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
    }
    return 'border-[#E8E4DE] bg-white text-[#9ca3af] opacity-50'
  }

  const getIcon = (index) => {
    if (selected === null) return null
    if (index === exercise.correct) {
      return (
        <div className="w-6 h-6 rounded-full bg-[#5B4FCF] flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L5 9.5l5-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    }
    if (index === selected) {
      return (
        <div className="w-6 h-6 rounded-full bg-[#EF4444] flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      )
    }
    return null
  }

  return (
    <div className={`flex flex-col flex-1 px-5 py-6 gap-6 ${shake ? 'shake' : ''}`}>
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-[#5B4FCF] uppercase tracking-widest mb-1">Word Recognition</p>
        <h2 className="text-xl font-bold text-[#1a1a1a] leading-snug">{exercise.prompt}</h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 flex-1">
        {exercise.options.map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => handleSelect(index)}
            className={`w-full px-4 py-4 rounded-2xl border-2 font-semibold text-base text-left flex items-center justify-between transition-all ${getOptionStyle(index)}`}
          >
            <span>{option}</span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: selected !== null && (index === exercise.correct || index === selected) ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {getIcon(index)}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Tap hint */}
      {selected === null && (
        <p className="text-center text-xs text-[#9ca3af]">Tap the correct answer</p>
      )}
    </div>
  )
}
