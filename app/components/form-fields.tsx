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
