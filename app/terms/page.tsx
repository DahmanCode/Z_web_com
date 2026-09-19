export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-20">
      <h1 className="font-display text-[38px] font-medium text-[#211F1A]">Terms of Service</h1>
      <p className="mt-5 text-[14px] leading-[1.6] text-[#5B5748]/80">
        Draft — pending legal review. Not yet in effect.
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">1. Acceptance of these terms</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            By creating an account on Zoufri, you agree to these Terms of Service and our Privacy Policy.
            If you don&apos;t agree, please don&apos;t use Zoufri.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">2. Who can use Zoufri</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            You must be at least 18 years old and legally able to enter into a rental or roommate
            arrangement to use Zoufri. One account per person — accounts are not transferable.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">3. What Zoufri is — and isn&apos;t</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Zoufri helps people looking for a roommate find each other, based on profile information
            and lifestyle preferences you provide. Zoufri does not verify anyone&apos;s identity, vet any
            listing, guarantee compatibility, or act as a party, agent, or broker in any lease, rental
            agreement, or payment between users. Any agreement you reach with another user — about
            rent, a lease, a move-in date, or anything else — is strictly between you and them.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">4. Your account</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            You&apos;re responsible for the accuracy of the information on your profile and for keeping
            your login credentials secure. Let us know right away if you believe your account has
            been compromised.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">5. Acceptable use</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Don&apos;t use Zoufri to post false or misleading listings, harass or discriminate against
            other users, impersonate someone else, solicit payment outside the scope of a genuine
            roommate arrangement, or use the platform for anything other than finding a roommate or
            a room. We may suspend or remove accounts that violate this.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">6. Your content</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            You keep ownership of the profile information, photos, and messages you share on Zoufri.
            By posting them, you give us permission to display them to other users as part of the
            matching and browsing experience — and nothing more.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">7. No warranty</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            Zoufri is provided &quot;as is.&quot; We don&apos;t guarantee you&apos;ll find a match, that any match
            will work out, or that any other user is who they claim to be. Please review our{" "}
            <a href="/safety" className="underline hover:text-[#211F1A]">Safety</a> page before meeting anyone.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">8. Limitation of liability</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            To the fullest extent permitted by law, Zoufri is not liable for any dispute, loss, injury,
            or damage arising from a connection, meeting, or arrangement made through the platform.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">9. Ending your account</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            You can delete your account at any time from your Profile page. We may suspend or terminate
            accounts that violate these terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">10. Changes to these terms</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            We may update these terms from time to time. Continued use of Zoufri after a change means
            you accept the updated terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[20px] font-medium text-[#211F1A]">11. Governing law</h2>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5B5748]">
            These terms are governed by the laws of Morocco.
          </p>
        </div>
      </div>

      <p className="mt-10 text-[14px] leading-[1.6] text-[#5B5748]/80">
        Questions about these terms? Contact us at{" "}
        <a href="mailto:hello@zoufri.com" className="underline hover:text-[#211F1A]">hello@zoufri.com</a>.
      </p>
    </div>
  );
}