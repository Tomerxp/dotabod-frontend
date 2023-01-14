import { useBaseUrl } from '@/lib/hooks'
import { Card } from '@/ui/card'
import { Badge, Collapse, Display } from '@geist-ui/core'
import { Button, CopyButton } from '@mantine/core'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function OBSOverlay() {
  const user = useSession()?.data?.user
  const copyURL = useBaseUrl(`overlay/${user ? user.id : ''}`)

  const CopyInstructions = () => (
    <div className="flex items-center space-x-4">
      <CopyButton value={copyURL}>
        {({ copied, copy }) => (
          <Button
            variant="outline"
            color="green"
            className={clsx(
              copied && '!border-green-600 !bg-green-600',
              'border-blue-500 bg-blue-600 text-dark-200 transition-colors hover:bg-blue-500'
            )}
            onClick={copy}
          >
            {copied ? 'Copied to clipboard!' : 'Copy your personal URL'}
          </Button>
        )}
      </CopyButton>
      <div className="space-x-2 text-xs">
        <Badge type="error" className="!bg-red-800 !text-xs">
          Warning
        </Badge>
        <span>Do not share or show this URL on stream</span>
      </div>
    </div>
  )

  return (
    <Card>
      <Collapse
        shadow
        title="Step three. OBS Overlay"
        subtitle="Add a new Browser source to OBS."
      >
        <div>
          <Badge type="secondary">Note</Badge> OBS and Streamlabs have the same
          instructions
        </div>
        <div className="mt-4 space-y-4">
          <p>
            1. Let&apos;s see what our canvas resolution is set to. Open OBS
            Studio and go to File &gt; Settings
          </p>
          <Display shadow>
            <Image
              alt="dotabod browser source properties"
              width={331}
              unoptimized
              height={292}
              src="/images/setup/obs-step-1.png"
            />
          </Display>

          <p>
            2. Remember your &quot;Base (Canvas) Resolution&quot;. It&apos;s
            usually 1920x1080 but you could have a different one. Don&apos;t
            copy 1234x789, that&apos;s just there as an example.
          </p>
          <Display shadow>
            <Image
              alt="dotabod browser source properties"
              width={544}
              unoptimized
              height={310}
              src="/images/setup/obs-step-2.png"
            />
          </Display>

          <p>
            3. Close the settings window. Now let&apos;s add the browser source.
            Under Sources click Add &gt; Browser and press OK.
          </p>

          <Display shadow>
            <Image
              alt="dotabod browser source properties"
              width={572}
              unoptimized
              height={256}
              src="/images/setup/obs-step-3.png"
            />
          </Display>

          <p>
            4. Fill out the properties, entering your &quot;Base (Canvas)
            Resolution&quot; from Step 2 earlier. If you had 1920x1080, put 1920
            for width, and 1080 for height.
          </p>
          <div className="ml-4 space-y-4">
            <p>
              Copy and paste your personal URL into the URL field (1) for the
              browser source. Click OK to save.
            </p>

            <CopyInstructions />
          </div>

          <Display shadow>
            <Image
              alt="dotabod browser source properties"
              unoptimized
              width={635}
              height={519}
              src="/images/setup/obs-step-4.png"
            />
          </Display>
          <p>
            5. Right click the Dotabod browser source &gt; Transform &gt; Fit to
            screen.
          </p>
          <p>
            6. All done! Dotabod browser source should be full screen now. Test
            it by joining a bot match! Look at your OBS preview to confirm the
            overlay is showing. You should see the WL overlay, but badge may be
            missing until you fill out your MMR from the settings page.
          </p>
        </div>
      </Collapse>
    </Card>
  )
}
