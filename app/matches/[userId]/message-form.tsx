'use client'

import { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { sendMessage, type SendMessageResult } from './actions'

const initialState: SendMessageResult = {}

function SendButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-ink text-paper px-5 py-[10px] text-[14px] font-semibold disabled:opacity-50 hover:bg-ink/90 transition-colors"
    >
      {pending ? 'Sending...' : 'Send'}
    </button>
  )
}

export default function MessageForm({ otherUserId }: { otherUserId: string }) {
  const sendMessageWithUser = sendMessage.bind(null, otherUserId)
  const [state, formAction] = useFormState(sendMessageWithUser, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="border-t border-ink/10 pt-4">
      {state?.error && (
        <p className="mb-2 text-[13.5px] text-clay">{state.error}</p>
      )}
      <form
        ref={formRef}
        action={async (formData) => {
          await formAction(formData)
          formRef.current?.reset()
        }}
        className="flex gap-2"
      >
        <input
          name="content"
          type="text"
          placeholder="Type a message..."
          autoComplete="off"
          required
          className="flex-1 rounded-full border border-ink/15 px-4 py-[10px] text-[14px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink/30"
        />
        <SendButton />
      </form>
    </div>
  )
}