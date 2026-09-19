'use client'

import { useState } from 'react'

export const inputClass =
  'w-full rounded-2xl border border-ink/15 bg-paper px-4 py-[11px] text-[14.5px] text-ink outline-none focus:border-ink/40 transition-colors'
export const labelClass = 'block text-[13.5px] font-medium text-ink mb-1.5'

export function ScaleField({
  name,
  label,
  lowLabel,
  highLabel,
  defaultValue = 3,
}: {
  name: string
  label: string
  lowLabel: string
  highLabel: string
  defaultValue?: number
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
              defaultChecked={n === defaultValue}
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

export function SegmentOption({
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

export function ChipCheckbox({
  name,
  label,
  defaultChecked,
}: {
  name: string
  label: string
  defaultChecked?: boolean
}) {
  return (
    <label>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <div className="rounded-full border border-ink/15 px-4 py-2 text-[13.5px] font-medium text-muted cursor-pointer transition-colors peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink hover:border-ink/40">
        {label}
      </div>
    </label>
  )
}


export function PasswordField({
  id,
  label,
  value,
  onChange,
  minLength,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  minLength?: number
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          required
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
export const PASSWORD_HINT =
  'At least 8 characters, with an uppercase letter, a lowercase letter, and a number.'