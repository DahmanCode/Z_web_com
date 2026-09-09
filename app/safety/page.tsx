export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-20">
      <h1 className="font-display text-[38px] font-medium text-[#211F1A]">
        Staying safe on Zoufri
      </h1>
      <p className="mt-5 text-[16px] leading-[1.7] text-[#5B5748]">
        Zoufri helps you find a roommate — but we don&apos;t vet listings, verify identities,
        or guarantee any match. Use the same judgment you would meeting anyone new. A few
        habits go a long way:
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">
            Before you meet
          </h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Video call before agreeing to anything. It&apos;s the fastest way to confirm someone
            is who their profile says they are, and to get a real feel for how you&apos;d get along.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">
            Meeting in person
          </h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Meet in a public place first — a café, not the apartment — especially for the
            first meeting. If you do visit the place, let a friend or family member know
            where you&apos;ll be and when you expect to be done.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">
            Money
          </h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Never send a deposit, rent, or any payment before you&apos;ve seen the place in
            person and signed something in writing. If someone pressures you to pay quickly
            or won&apos;t let you view the place first, treat that as a red flag and walk away.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">
            Trust your instincts
          </h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            If something feels off — vague answers, urgency, requests that don&apos;t make sense —
            it&apos;s okay to stop the conversation and move on. There&apos;s no obligation to
            continue with anyone who makes you uncomfortable.
          </p>
        </div>
      </div>

      <p className="mt-10 text-[14px] leading-[1.6] text-[#5B5748]/80">
        Something feel wrong with a listing or a person on Zoufri? Contact us at{" "}
        <a href="mailto:hello@zoufri.com" className="underline hover:text-[#211F1A]">
          hello@zoufri.com
        </a>.
      </p>
    </div>
  );
}