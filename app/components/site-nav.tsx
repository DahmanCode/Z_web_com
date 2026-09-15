import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function SiteNav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="mx-auto flex max-w-[1240px] items-center justify-between px-6 pt-8 pb-4">
      <Link
  href="/"
  className="font-display text-[22px] font-semibold text-[#211F1A] flex items-center gap-2"
>
  <svg viewBox="0 0 100 100" className="w-[26px] h-[26px]">
    <circle cx="50" cy="50" r="38" fill="none" stroke="#C08A3E" strokeWidth="9" />
    <path
      d="M 34,62 L 34,40 L 50,26 L 66,40 L 66,62"
      fill="none"
      stroke="#C08A3E"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  Zoufri
</Link>

      <nav className="flex items-center gap-8 text-[15px] font-medium text-[#5B5748]">
        <Link href="/browse" className="hover:text-[#211F1A] transition-colors">
          Browse
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-[#211F1A] transition-colors">
              Dashboard
            </Link>
            <Link href="/matches" className="hover:text-[#211F1A] transition-colors">
              Matches
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/#how-it-works" className="hover:text-[#211F1A] transition-colors">
              How it works
            </Link>
            <Link href="/onboarding" className="hover:text-[#211F1A] transition-colors">
              List your place
            </Link>
            <Link
              href="/login"
              className="bg-[#211F1A] text-[#FFFDF8] px-[22px] py-[11px] rounded-full text-[14.5px] font-semibold inline-block"
            >
              Sign in
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}