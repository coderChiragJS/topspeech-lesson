import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const segments = Array.from({ length: total }, (_, i) => i)

  return (
    <div className="flex items-center gap-1.5 w-full px-5 pt-4 pb-2">
      {segments.map((i) => {
        const filled = i < current
        const active = i === current

        return (
          <motion.div
            key={i}
            className="flex-1 h-2.5 rounded-full overflow-hidden bg-[#E8E4DE]"
          >
            <motion.div
              className="h-full rounded-full bg-[#5B4FCF]"
              initial={false}
              animate={{ width: filled ? '100%' : active ? '40%' : '0%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
