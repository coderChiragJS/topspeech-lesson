import { motion } from 'framer-motion'

export default function MirrorCueCard({ exercise, onContinue }) {
  return (
    <div className="flex flex-col flex-1 px-5 py-6 gap-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-[#5B4FCF] uppercase tracking-widest mb-1">Mouth Position</p>
        <h2 className="text-2xl font-bold text-[#1a1a1a] leading-tight">{exercise.title}</h2>
      </div>

      {/* SVG Mouth Diagram */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="flex justify-center"
      >
        <div className="w-64 h-64 bg-white rounded-3xl shadow-md border border-[#F0EDE8] flex items-center justify-center p-4">
          <MouthDiagram />
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-4 border border-[#F0EDE8] shadow-sm"
      >
        <p className="text-[#1a1a1a] font-medium text-base leading-relaxed">{exercise.instruction}</p>
        {exercise.detail && (
          <p className="text-[#6b7280] text-sm mt-2 leading-relaxed">{exercise.detail}</p>
        )}
      </motion.div>

      {/* Tip */}
      {exercise.tip && (
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-2.5 bg-[#F5F3FF] rounded-xl p-3.5 border border-[#C7D2FE]"
        >
          <span className="text-lg mt-0.5">💡</span>
          <p className="text-sm text-[#2D1B8E] font-medium">{exercise.tip}</p>
        </motion.div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA */}
      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onContinue}
        className="w-full bg-[#5B4FCF] text-white font-bold text-base py-4 rounded-2xl shadow active:scale-[0.97] transition-transform"
      >
        {exercise.ctaLabel || 'Got it, continue'}
      </motion.button>
    </div>
  )
}

function MouthDiagram() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer lips */}
      <ellipse cx="100" cy="105" rx="72" ry="48" fill="#FDDDD0" stroke="#E8A090" strokeWidth="2"/>

      {/* Upper lip */}
      <path d="M40 100 Q70 80 100 95 Q130 80 160 100" stroke="#C97860" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* Lower lip */}
      <path d="M40 110 Q70 135 100 128 Q130 135 160 110" stroke="#C97860" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* Mouth opening */}
      <ellipse cx="100" cy="111" rx="52" ry="18" fill="#7B2D2D" opacity="0.85"/>

      {/* Upper teeth */}
      <rect x="60" y="104" width="80" height="11" rx="3" fill="#F8F8F8"/>
      {[60, 76, 92, 108, 124].map((x) => (
        <line key={x} x1={x + 16} y1="104" x2={x + 16} y2="115" stroke="#E8E4DE" strokeWidth="1"/>
      ))}

      {/* Lower teeth */}
      <rect x="60" y="115" width="80" height="10" rx="3" fill="#F4F4F4"/>

      {/* Tongue - curled up (retroflex R position) */}
      <path
        d="M72 130 Q85 125 100 122 Q115 125 128 130 Q118 145 100 148 Q82 145 72 130z"
        fill="#E07070"
        stroke="#C95050"
        strokeWidth="1.5"
      />
      {/* Tongue tip curled up */}
      <path
        d="M92 122 Q100 112 108 122"
        fill="#E07070"
        stroke="#C95050"
        strokeWidth="1.5"
      />

      {/* Animated arrow showing tongue curl direction */}
      <motion.path
        d="M115 108 Q122 100 118 93"
        stroke="#5B4FCF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.path
        d="M118 93 L121 99 L114 97"
        stroke="#5B4FCF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />

      {/* Label */}
      <text x="128" y="91" fontSize="9" fill="#5B4FCF" fontFamily="Inter, sans-serif" fontWeight="600">curl up</text>

      {/* Palate ridge dot */}
      <circle cx="100" cy="90" r="3.5" fill="#5B4FCF" opacity="0.6"/>
      <text x="107" y="89" fontSize="8.5" fill="#5B4FCF" fontFamily="Inter, sans-serif" opacity="0.8">ridge</text>
    </svg>
  )
}
