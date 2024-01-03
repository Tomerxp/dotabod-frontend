import React from 'react'
import { Logomark } from 'src/components/Logo'
import { Settings } from '@/lib/defaultSettings'
import { useUpdateSetting } from '@/lib/hooks/useUpdateSetting'
import styled from 'styled-components'
import { WinChance } from '@/lib/hooks/useSocket'
import { secondsToDuration, motionProps } from '@/ui/utils'
import { motion } from 'framer-motion'
import { useTransformRes } from '@/lib/hooks/useTransformRes'
import { TextWithEmotes } from './TextWithEmotes'

const BAR_HEIGHT_SIZE = 5
const SEPARATOR_SIZE = 30
const ANIMATION = '2s ease-in-out'

const Bar = styled.div<any>`
  opacity: ${(props) => (props.visible ? '1' : '0')};
  position: relative;
  transition:
    top 0.2s ease-out,
    opacity 0.2s ease;
  height: 100%;
  border-radius: 5px;
`

const SeparatorImg = styled(Logomark)<any>`
  position: relative;
  bottom: ${SEPARATOR_SIZE / 2}px;
  background-color: rgba(0, 0, 0, 1);
  padding: 2px;
  border-radius: 100%;
  left: calc(${(props) => Math.min(props.pos, 98)}% - ${SEPARATOR_SIZE / 2}px);
  height: ${SEPARATOR_SIZE}px;
  width: ${SEPARATOR_SIZE}px;
  pointer-events: none;
  transition: left ${ANIMATION};
`

const BarFill = styled.div`
  display: flex;
  height: ${BAR_HEIGHT_SIZE}px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`

const AnimatedNumRadiant = styled.span<any>`
  display: block;
  margin-top: 15px;
  position: relative;
  font-size: 1rem;
  text-shadow: 2px 2px 2px #000;
  z-index: 5;

  @property --radiant {
    syntax: '<integer>';
    initial-value: 0;
    inherits: false;
  }
  transition: --radiant ${ANIMATION};
  counter-set: num var(--radiant);
  --radiant: ${(props) => props.value};

  &::before {
    text-shadow: 1px 1px 1px #000;
    content: counter(num);
  }
`

const AnimatedNumDire = styled.span<any>`
  display: block;
  margin-top: 15px;
  position: relative;
  font-size: 1rem;
  text-shadow: 2px 2px 2px #000;
  z-index: 5;

  @property --dire {
    syntax: '<integer>';
    initial-value: 0;
    inherits: false;
  }
  transition: --dire ${ANIMATION};
  counter-set: num var(--dire);
  --dire: ${(props) => props.value};

  &::before {
    text-shadow: 1px 1px 1px #000;
    content: counter(num);
  }
`

const FillRadiant = styled.div<any>`
  background: linear-gradient(
    90deg,
    rgba(0, 255, 0, 1) 80%,
    rgba(185, 238, 3, 1) 100%
  );
  width: ${(props) => props.width}%;
  transition: width ${ANIMATION};
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  color: #00ea00;
  text-align: right;
  padding-right: 3px;
`

const FillDire = styled.div<any>`
  background: linear-gradient(
    90deg,
    rgba(235, 75, 75, 1) 20%,
    rgba(255, 0, 0, 1) 100%
  );
  width: ${(props) => props.width}%;
  transition: width ${ANIMATION};
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  color: #eb4b4b;
`

const Text = styled.div<any>`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  left: ${(props) => Math.min(props.pos, 98)}%;
  white-space: nowrap;
  transform: translateX(-50%);
  bottom: 10px;
  text-shadow: 2px 2px 2px #000;
  color: #ececec;
  transition: left ${ANIMATION};
  font-size: 0.85rem;
`

export const WinProbability = ({
  radiantWinChance,
}: {
  radiantWinChance: WinChance
}) => {
  const { data: isEnabled } = useUpdateSetting(Settings.winProbabilityOverlay)
  const res = useTransformRes()

  if (!isEnabled || !radiantWinChance) {
    return null
  }

  // Make sure radiantWinChance.value is between 0 and 100
  radiantWinChance.value = Math.min(Math.max(radiantWinChance.value, 0), 100)

  return (
    <motion.div
      id="win-probability"
      key="poll-overlay-inner"
      className="h-100"
      {...motionProps}
    >
      <Bar visible={radiantWinChance.visible}>
        <Text pos={radiantWinChance.value}>
          <h1
            className="font-outline-2 text-center font-bold text-slate-50"
            style={{
              fontSize: res({ h: 20 }),
            }}
          >
            <TextWithEmotes emotes={[]} text="Win probability" />
          </h1>
        </Text>
        <BarFill className="space-x-3">
          <FillRadiant width={radiantWinChance.value}>
            <AnimatedNumRadiant value={radiantWinChance.value}>
              %
            </AnimatedNumRadiant>
          </FillRadiant>
          <FillDire width={100 - radiantWinChance.value}>
            <AnimatedNumDire value={100 - radiantWinChance.value}>
              %
            </AnimatedNumDire>
          </FillDire>
        </BarFill>
        <SeparatorImg alt="logo" pos={radiantWinChance.value} />
        <Text style={{ bottom: 0, top: 10 }} pos={radiantWinChance.value}>
          <span className="font-outline-2 text-slate-50">
            {secondsToDuration(radiantWinChance.time)} (2m delay)
          </span>
        </Text>
      </Bar>
    </motion.div>
  )
}
