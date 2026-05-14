import { motion, AnimatePresence } from 'framer-motion'

export default function FeedbackBar({ phase, exercise, onContinue, onRetry }) {
  const isCorrect = phase === 'correct'
  const isRetry = phase === 'retry'

  return (
    <AnimatePresence>
      {(isCorrect || isRetry) && (
        <motion.div
          key={phase}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`w-full px-5 pt-5 pb-8 rounded-t-3xl ${
            isCorrect ? 'bg-[#ECFDF5]' : 'bg-[#FFFBEB]'
          }`}
        >
          <div className="max-w-sm mx-auto flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCorrect ? 'bg-[#2B8A6E]' : 'bg-[#D97706]'
              }`}>
                {isCorrect ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.5 9.5L7 13l7.5-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 5v5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                    <circle cx="9" cy="13" r="1.2" fill="white"/>
                  </svg>
                )}
              </div>
              <div>
                <p className={`font-bold text-base ${isCorrect ? 'text-[#065F46]' : 'text-[#92400E]'}`}>
                  {isCorrect ? 'Great work!' : 'Almost there!'}
                </p>
                {isRetry && exercise?.explanation && (
                  <p className="text-sm text-[#78716c] mt-0.5 leading-snug">{exercise.explanation}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {isRetry && (
                <button
                  onClick={onRetry}
                  className="flex-1 py-3.5 rounded-xl border-2 border-[#D97706] text-[#92400E] font-semibold text-sm active:scale-[0.97] transition-transform"
                >
                  Try again
                </button>
              )}
              <button
                onClick={onContinue}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-sm text-white active:scale-[0.97] transition-transform ${
                  isCorrect ? 'bg-[#2B8A6E]' : 'bg-[#D97706]'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
