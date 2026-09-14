'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Candidate = {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  preferred_city: string | null
  budget_min: number | null
  budget_max: number | null
  move_in_date: string | null
  listing: {
    address: string | null
    city: string | null
    rent_amount: number | null
    bedrooms: number | null
    bathrooms: number | null
    description: string | null
  } | null
  compatibility_score: number
}

export default function SwipeDeck({ candidates }: { candidates: Candidate[] }) {
  const [index, setIndex] = useState(0)
  const [pending, setPending] = useState(false)
  const [matchBanner, setMatchBanner] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const current = candidates[index]

  async function handleSwipe(action: 'like' | 'pass') {
    if (!current || pending) return
    setPending(true)
    setErrorMsg(null)

    const supabase = createClient()
    const status = action === 'like' ? 'pending' : 'rejected'

    const { data, error } = await supabase.rpc('record_swipe', {
      target_id_param: current.id,
      new_status: status,
    })

    setPending(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    const matched = Boolean((data as { matched?: boolean })?.matched)

    if (matched) {
      setMatchBanner(true)
      setTimeout(() => setMatchBanner(false), 2500)
    }

    setIndex((i) => i + 1)
  }

  // NOTE: the match banner must render regardless of whether there are
  // more candidates left, since the swipe that triggers a match might
  // also be the last candidate in the deck (exhausting the list).
  const banner = matchBanner && (
    <div className="rounded-full bg-ink text-paper text-center py-3 font-sans font-semibold text-[14.5px] mb-4">
      🎉 It&apos;s a match!
    </div>
  )

  if (!current) {
    return (
      <div>
        {banner}
        <div className="rounded-[28px] border border-ink/10 bg-paper p-10 text-center text-muted text-[14.5px]">
          No more profiles right now — check back later.
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {banner}

      <div className="rounded-[28px] border border-ink/10 bg-paper overflow-hidden">
        <div className="h-56 bg-[linear-gradient(160deg,#3A7186,#1F4E5F_60%,#C08A3E)] flex items-center justify-center text-white/70">
          {current.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current.avatar_url} alt={current.full_name ?? 'Profile'} className="h-full w-full object-cover" />
          ) : (
            <span className="text-[13.5px]">No photo</span>
          )}
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[21px] font-medium text-ink">{current.full_name ?? 'Anonymous'}</h2>
            <span className="rounded-full bg-ink text-paper text-[12.5px] font-semibold px-3 py-[6px]">
              {current.compatibility_score}% match
            </span>
          </div>

          {current.bio && <p className="text-muted text-[14px] leading-[1.5]">{current.bio}</p>}

          <div className="flex flex-wrap gap-2 text-[12px] text-muted">
            {current.preferred_city && <span className="rounded-full bg-sand/50 px-[10px] py-[5px]">{current.preferred_city}</span>}
            {current.budget_min && current.budget_max && (
              <span className="rounded-full bg-sand/50 px-[10px] py-[5px]">
                {current.budget_min}–{current.budget_max} MAD
              </span>
            )}
            {current.move_in_date && (
              <span className="rounded-full bg-sand/50 px-[10px] py-[5px]">Move in {current.move_in_date}</span>
            )}
          </div>

          {current.listing && (
            <div className="rounded-2xl bg-sand/40 p-4 text-[14px]">
              <p className="font-semibold text-ink">{current.listing.address ?? current.listing.city}</p>
              {current.listing.description && <p className="text-muted mt-1">{current.listing.description}</p>}
              <p className="text-muted mt-1">
                {current.listing.bedrooms ?? '–'} bed · {current.listing.bathrooms ?? '–'} bath ·{' '}
                {current.listing.rent_amount ? `${current.listing.rent_amount} MAD/mo` : ''}
              </p>
            </div>
          )}
        </div>
      </div>

      {errorMsg && (
        <p className="mt-3 text-[13.5px] text-clay border border-clay/20 bg-clay/5 rounded-2xl p-3">
          {errorMsg}
        </p>
      )}

      <div className="mt-5 flex justify-center gap-4">
        <button
          onClick={() => handleSwipe('pass')}
          disabled={pending}
          className="rounded-full border border-ink/15 px-7 py-3 font-sans font-semibold text-[14.5px] text-ink disabled:opacity-50 hover:bg-sand/30 transition-colors"
        >
          Pass
        </button>
        <button
          onClick={() => handleSwipe('like')}
          disabled={pending}
          className="rounded-full bg-ink text-paper px-7 py-3 font-sans font-semibold text-[14.5px] disabled:opacity-50 hover:bg-ink/90 transition-colors"
        >
          Like
        </button>
      </div>

      <p className="mt-3 text-center text-[12.5px] text-muted/70">
        {index + 1} of {candidates.length}
      </p>
    </div>
  )
}