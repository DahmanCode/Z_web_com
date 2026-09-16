'use client'

import { Suspense, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { completeOnboarding, type OnboardingResult } from './actions'
import AvatarUpload from '../components/avatar-upload'

const initialState: OnboardingResult = {}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-ink px-6 py-[13px] text-[14.5px] font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-50"
    >
      {pending ? 'Saving…' : label}
    </button>
  )
}

function BackArrow({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="w-10 h-10 rounded-full bg-paper border border-ink/10 flex items-center justify-center text-ink hover:bg-sand/30 transition-colors"
    >
      ←
    </button>
  )
}

const inputClass =
  'w-full rounded-2xl border border-ink/15 bg-paper px-4 py-[11px] text-[14.5px] text-ink outline-none focus:border-ink/40 transition-colors'
const labelClass = 'block text-[13.5px] font-medium text-ink mb-1.5'

function ScaleField({
  name,
  label,
  lowLabel,
  highLabel,
}: {
  name: string
  label: string
  lowLabel: string
  highLabel: string
}) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="flex-1">
            <input
              type="radio"
              name={name}
              value={n}
              defaultChecked={n === 3}
              className="peer sr-only"
            />
            <div className="rounded-xl border border-ink/15 py-2 text-center text-[14px] font-medium text-muted cursor-pointer transition-colors peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink hover:border-ink/40">
              {n}
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-between text-[12px] text-muted/70 mt-1.5">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  )
}

function SegmentOption({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string
  value: string
  label: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex-1">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} className="peer sr-only" />
      <div className="rounded-full border border-ink/15 py-[9px] text-center text-[13.5px] font-medium text-muted cursor-pointer transition-colors peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink hover:border-ink/40">
        {label}
      </div>
    </label>
  )
}

function ChipCheckbox({ name, label }: { name: string; label: string }) {
  return (
    <label>
      <input type="checkbox" name={name} className="peer sr-only" />
      <div className="rounded-full border border-ink/15 px-4 py-2 text-[13.5px] font-medium text-muted cursor-pointer transition-colors peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink hover:border-ink/40">
        {label}
      </div>
    </label>
  )
}

function OnboardingForm() {
  const [state, formAction] = useFormState(completeOnboarding, initialState)
  const searchParams = useSearchParams()

  const typeParam = searchParams.get('type')
  const initialUserType: 'has_place' | 'needs_place' | '' =
    typeParam === 'need' ? 'needs_place' : typeParam === 'have' ? 'has_place' : ''

  const [step, setStep] = useState(initialUserType ? 2 : 1)
  const [userType, setUserType] = useState<'has_place' | 'needs_place' | ''>(initialUserType)

  const totalSteps = userType === 'has_place' ? 4 : 3

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <div className="flex items-center gap-4 mb-9">
        {step > 1 && <BackArrow onClick={() => setStep(step - 1)} />}
        <div className="flex-1 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < step ? 'bg-ink' : 'bg-sand'
              }`}
            />
          ))}
        </div>
        <span className="text-[13px] text-muted shrink-0">
          Step {step} of {totalSteps}
        </span>
      </div>

      <form action={formAction} className="space-y-8">
        {/* Hidden field carries user_type on final submit regardless of step */}
        <input type="hidden" name="user_type" value={userType} />

        {/* STEP 1: user type */}
        {step === 1 && (
          <div className="space-y-5">
            <h1 className="font-display text-[27px] font-medium text-ink leading-[1.25]">
              Are you looking for a place, or do you have one?
            </h1>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setUserType('needs_place')}
                className={`rounded-[20px] border p-5 text-left transition-colors ${
                  userType === 'needs_place' ? 'border-ink bg-sand/40' : 'border-ink/12 bg-paper hover:bg-sand/20'
                }`}
              >
                <p className="font-semibold text-ink">I need a place</p>
                <p className="text-[13.5px] text-muted mt-1">Looking to move in with a roommate</p>
              </button>
              <button
                type="button"
                onClick={() => setUserType('has_place')}
                className={`rounded-[20px] border p-5 text-left transition-colors ${
                  userType === 'has_place' ? 'border-ink bg-sand/40' : 'border-ink/12 bg-paper hover:bg-sand/20'
                }`}
              >
                <p className="font-semibold text-ink">I have a place</p>
                <p className="text-[13.5px] text-muted mt-1">Looking for a roommate to fill it</p>
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!userType}
                onClick={() => setStep(2)}
                className="rounded-full bg-ink px-6 py-[13px] text-[14.5px] font-semibold text-paper disabled:opacity-40 hover:bg-ink/90 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: basic profile info */}
        <div className={step === 2 ? 'space-y-5' : 'hidden'}>
          <h1 className="font-display text-[27px] font-medium text-ink">Tell us the basics</h1>

          <AvatarUpload />

          <div>
            <label className={labelClass}>Preferred city</label>
            <input name="preferred_city" type="text" placeholder="Agadir" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Budget min (MAD)</label>
              <input name="budget_min" type="number" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Budget max (MAD)</label>
              <input name="budget_max" type="number" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Move-in date</label>
            <input name="move_in_date" type="date" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Short bio</label>
            <textarea name="bio" rows={3} placeholder="A little about you..." className={inputClass} />
          </div>

          <div className="flex justify-between pt-1">
            <button type="button" onClick={() => setStep(1)} className="px-2 py-[13px] text-[14px] font-medium text-muted hover:text-ink transition-colors">
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-full bg-ink px-6 py-[13px] text-[14.5px] font-semibold text-paper hover:bg-ink/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>

                {/* STEP 3: lifestyle preferences */}
        <div className={step === 3 ? 'space-y-6' : 'hidden'}>
          <h1 className="font-display text-[27px] font-medium text-ink">Your lifestyle</h1>

          <div className="rounded-[24px] border border-ink/10 bg-paper p-6 space-y-6">
            <ScaleField name="cleanliness" label="Cleanliness" lowLabel="Relaxed" highLabel="Spotless" />
            <ScaleField name="noise_tolerance" label="Noise tolerance" lowLabel="Need quiet" highLabel="Don't mind noise" />
            <ScaleField name="social_level" label="Social level" lowLabel="Introvert" highLabel="Extrovert" />

            <div>
              <p className={labelClass}>Sleep schedule</p>
              <div className="flex gap-2">
                <SegmentOption name="sleep_schedule" value="early_bird" label="Early bird" />
                <SegmentOption name="sleep_schedule" value="flexible" label="Flexible" defaultChecked />
                <SegmentOption name="sleep_schedule" value="night_owl" label="Night owl" />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-ink/10 bg-paper p-6 space-y-4">
            <p className={labelClass}>A bit more about you</p>
            <div className="flex flex-wrap gap-2">
              <ChipCheckbox name="smoking" label="Smokes" />
              <ChipCheckbox name="has_pets" label="Has pets" />
              <ChipCheckbox name="guests_often" label="Has guests often" />
              <ChipCheckbox name="work_from_home" label="Works from home" />
            </div>

            <div>
              <label className={labelClass}>Pet type (if any)</label>
              <input name="pet_type" type="text" placeholder="Cat, dog, etc." className={inputClass} />
            </div>
          </div>

          <div className="flex justify-between pt-1">
            <button type="button" onClick={() => setStep(2)} className="px-2 py-[13px] text-[14px] font-medium text-muted hover:text-ink transition-colors">
              Back
            </button>
            {userType === 'has_place' ? (
              <button
                type="button"
                onClick={() => setStep(4)}
                className="rounded-full bg-ink px-6 py-[13px] text-[14.5px] font-semibold text-paper hover:bg-ink/90 transition-colors"
              >
                Continue
              </button>
            ) : (
              <SubmitButton label="Finish" />
            )}
          </div>
        </div>

        {/* STEP 4: listing details, only for has_place */}
        {userType === 'has_place' && (
          <div className={step === 4 ? 'space-y-5' : 'hidden'}>
            <h1 className="font-display text-[27px] font-medium text-ink">Your place</h1>

            <div>
              <label className={labelClass}>Address</label>
              <input name="address" type="text" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City</label>
                <input name="listing_city" type="text" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Neighborhood</label>
                <input name="neighborhood" type="text" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Rent (MAD/month)</label>
                <input name="rent_amount" type="number" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Available from</label>
                <input name="available_from" type="date" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input name="bedrooms" type="number" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input name="bathrooms" type="number" step="0.5" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea name="listing_description" rows={3} className={inputClass} />
            </div>

            <div className="flex justify-between pt-1">
              <button type="button" onClick={() => setStep(3)} className="px-2 py-[13px] text-[14px] font-medium text-muted hover:text-ink transition-colors">
                Back
              </button>
              <SubmitButton label="Finish" />
            </div>
          </div>
        )}

        {state?.error && (
          <p className="text-[13.5px] text-clay border border-clay/20 bg-clay/5 rounded-2xl p-3">
            {state.error}
          </p>
        )}
      </form>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-xl px-6 py-12 text-muted text-[14.5px]">Loading…</div>}>
      <OnboardingForm />
    </Suspense>
  )
}