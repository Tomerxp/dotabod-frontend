import { Card } from '@/ui/card'
import { Snippet } from '@geist-ui/core'
import { useSession } from 'next-auth/react'

export default function ChatBot() {
  const user = useSession()?.data?.user

  return (
    <Card>
      <Card.Header>
        <Card.Title>1. Twitch bot</Card.Title>
        <Card.Description>
          Allows the Dotabod chat bot to type in your chat in case you have
          followers mode or subscribers mode ever turned on.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-2">
          <div>
            Add @dotabod as a moderator to your channel. Type the following in
            your stream.
          </div>

          <Snippet symbol="" text="/mod dotabod" width="750px" />
        </div>
      </Card.Content>
    </Card>
  )
}
