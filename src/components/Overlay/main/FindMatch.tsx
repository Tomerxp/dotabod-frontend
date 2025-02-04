import { useTransformRes } from '@/lib/hooks/useTransformRes'
import { motionProps } from '@/ui/utils'
import { motion } from 'framer-motion'

export const FindMatch = () => {
  const res = useTransformRes()

  return (
    <>
      <span
        id="find-match-main-menu-1"
        style={{
          fontSize: res({ w: 14 }),
          height: res({ h: 24 }),
          width: res({ w: 120 }),
          top: res({ h: 143 }),
          left: res({ w: 108 }),
        }}
        className="font-outline-2 absolute flex items-center rounded-sm bg-[#1b1c1f] font-semibold capitalize tracking-wide text-[#6a9461]"
      >
        Main menu
      </span>

      <span
        id="find-match-main-menu-2"
        style={{
          fontSize: res({ w: 14 }),
          height: res({ h: 24 }),
          width: res({ w: 131 }),
          top: res({ h: 224 }),
          left: res({ w: 411 }),
        }}
        className="font-outline-2 absolute flex items-center rounded-sm bg-black font-semibold uppercase tracking-wide text-[#77b26b]"
      >
        Main menu
      </span>

      <motion.div
        key="queue-blocker-class"
        {...motionProps}
        id="find-match-queue-blocker-main"
        style={{
          bottom: res({ h: 0 }), // correct is n
          right: res({ w: 0 }), // correct is 50
        }}
        className="absolute"
      >
        <div
          id="find-match-queue-blocker"
          style={{
            width: res({ w: 330 }),
            height: res({ h: 49 }),
            right: res({ w: 59 }),
            bottom: res({ h: 22 }),
          }}
          className="absolute flex items-center justify-center overflow-hidden"
        >
          <span
            style={{
              fontSize: res({ w: 26 }),
            }}
            className="font-outline-2 whitespace-nowrap font-bold uppercase tracking-[0.15em] text-white"
          >
            play dota
          </span>
        </div>

        <img
          id="find-match-queue-blocker-bg"
          width={res({ w: 850 })}
          height={res({ h: 355 })}
          src="/images/overlay/finding-match.png"
          alt="Finding Match"
          className="rounded-lg"
        />
      </motion.div>
    </>
  )
}
