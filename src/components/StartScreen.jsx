import { motion } from 'framer-motion'

export default function StartScreen({ onStart, streak }) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 pt-16 pb-10 bg-[#FAF7F2]">
      <div className="flex flex-col items-center gap-6 flex-1 justify-center w-full max-w-sm">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-20 h-20 rounded-3xl bg-[#5B4FCF] flex items-center justify-center shadow-lg"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" fill="white" opacity="0.2"/>
            <path d="M14 20c0-1.5.4-2.9 1.1-4.1" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M20 13c3.9 0 7 3.1 7 7s-3.1 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="20" cy="20" r="3" fill="white"/>
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center"
        >
          <p className="text-[#5B4FCF] font-semibold text-sm tracking-widest uppercase mb-2">TopSpeech Health</p>
          <h1 className="text-3xl font-bold text-[#1a1a1a] leading-tight mb-1">The R Sound</h1>
          <p className="text-[#6b7280] text-base">Day 1 · Rhotacism Program</p>
        </motion.div>

        {/* Lesson preview chips */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#F0EDE8]"
        >
          <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">Today's lesson</p>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: '🪞', label: 'Mouth position guide' },
              { icon: '🔤', label: '3 listen & repeat exercises' },
              { icon: '✅', label: '2 word recognition checks' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-[#374151] font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#F0EDE8] flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M8 5v3l2 2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs text-[#9ca3af]">About 4 minutes</span>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 bg-[#FFF7ED] border border-[#FED7AA] rounded-full px-4 py-2"
        >
          <span className="text-xl pulse-glow">🔥</span>
          <span className="text-sm font-semibold text-[#92400e]">{streak} day streak — keep it up!</span>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={onStart}
          className="w-full bg-[#5B4FCF] text-white font-bold text-lg py-4 rounded-2xl shadow-lg active:scale-[0.97] transition-transform"
        >
          Start Today's Lesson
        </button>
        <p className="text-center text-xs text-[#9ca3af] mt-3">No pressure — go at your own pace</p>
      </motion.div>
    </div>
  )
}
