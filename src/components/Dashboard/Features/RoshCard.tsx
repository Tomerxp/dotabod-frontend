import { DBSettings } from '@/lib/DBSettings'
import { useUpdateSetting } from '@/lib/useUpdateSetting'
import { Card } from '@/ui/card'
import { Display } from '@geist-ui/core'
import { Switch } from '@mantine/core'
import Image from 'next/image'

export default function RoshCard() {
  const {
    isEnabled: hasAegis,
    loading: lA,
    updateSetting: uA,
  } = useUpdateSetting(DBSettings.aegis)

  const {
    isEnabled: hasRosh,
    loading: lR,
    updateSetting: uR,
  } = useUpdateSetting(DBSettings.rosh)

  return (
    <Card>
      <div className="title">
        <h3>Roshan timers</h3>
        <div className="flex space-x-4">
          {lA && <Switch disabled size="lg" color="blue" />}
          {!lA && (
            <Switch
              size="lg"
              onLabel="Aegis"
              offLabel="Aegis"
              onChange={(e) => uA(!!e?.currentTarget?.checked)}
              color="blue"
              defaultChecked={hasAegis}
            />
          )}
          {lR && <Switch disabled size="lg" color="blue" />}
          {!lR && (
            <Switch
              size="lg"
              onLabel="Rosh"
              offLabel="Rosh"
              onChange={(e) => uR(!!e?.currentTarget?.checked)}
              color="blue"
              defaultChecked={hasRosh}
            />
          )}
        </div>
      </div>
      <div className="subtitle">
        Dotabod can detect when roshan is killed or aegis is picked up.
      </div>
      <div>
        Sadly the data does not tell us when someone dies with aegis, so{' '}
        <b>the aegis icon will remain for the full 5 minutes</b>. The rosh timer
        starts red for 8 minutes (min rosh spawn), then turns yellow for 3
        minutes (max rosh spawn).
      </div>
      <Display shadow>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            alt="aegis timer"
            width={219}
            height={107}
            src="/images/just-aegis-timer.png"
            className="inline"
          />

          <Image
            alt="rosh timer"
            width={293}
            height={533}
            src="/images/rosh-timer.png"
            className="inline"
          />
        </div>
      </Display>
    </Card>
  )
}
