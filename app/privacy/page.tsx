export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-20">
      <h1 className="font-display text-[38px] font-medium text-[#211F1A]">Privacy Policy</h1>
      <p className="mt-5 text-[14px] leading-[1.6] text-[#5B5748]/80">
        Draft — pending legal review. Not yet in effect.
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">What we collect</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Your email address; profile details you provide (name, bio, photo, preferred city,
            budget, move-in date); lifestyle preferences (cleanliness, sleep schedule, and similar);
            listing details if you have a place to offer; and messages you exchange with other users
            through Zoufri.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">How we use it</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            To build your profile, calculate compatibility with other users, show you and other users
            relevant matches, enable messaging between matched users, and contact you about your
            account.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">Where it&apos;s stored</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Your data is stored with Supabase, our database and authentication provider, and the site
            is hosted on Vercel. Both process data on our behalf under their own security and data
            processing terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">Who sees it</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Your profile and listing information (if you have a place) are shown to other Zoufri users
            as part of browsing and matching. We don&apos;t sell your data to third parties or use it
            for advertising.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">Your rights</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            You can review and update your information anytime from your{" "}
            <a href="/profile" className="underline hover:text-[#211F1A]">Profile</a> page, including
            your email address. You can permanently delete your account and associated data from the
            same page. For any other request about your data, contact us below.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">How long we keep it</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            We keep your data while your account is active. Deleting your account removes it, subject
            to any copies retained briefly in backups or as required by law.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">Children&apos;s privacy</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Zoufri is not intended for anyone under 18, and we don&apos;t knowingly collect data from
            minors.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">Changes to this policy</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            We may update this policy from time to time; changes will appear on this page.
          </p>
        </div>
      </div>

      <p className="mt-10 text-[14px] leading-[1.6] text-[#5B5748]/80">
        Questions about your data? Contact us at{" "}
        <a href="mailto:hello@zoufri.com" className="underline hover:text-[#211F1A]">hello@zoufri.com</a>.
      </p>
    </div>
  );
}