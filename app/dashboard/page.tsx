import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // This sends anyone with an incomplete profile straight to onboarding instead of the dashboard.
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type, full_name")
    .eq("id", user.id)
    .single();

  if (!profile?.user_type) {
    redirect("/onboarding");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-[32px] font-medium text-ink">
          Dashboard
        </h1>
        <span className="text-[13.5px] text-muted">
          {profile?.full_name ?? "Welcome"}
        </span>
      </div>

      <div className="bg-ink text-paper rounded-[28px] px-8 py-9 mb-6">
        <h2 className="font-display text-[22px] font-medium">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
        </h2>
        <p className="mt-2 text-[14.5px] text-white/70 max-w-[420px] leading-[1.6]">
          {profile?.user_type === "has_place"
            ? "Browse people looking for a place, or check your matches."
            : "Browse available places, or check your matches."}
        </p>
      </div>

      <nav className="flex gap-4">
        <Link
          href="/browse"
          className="flex-1 text-center bg-paper border border-ink/10 rounded-full px-6 py-[14px] font-sans text-[14.5px] font-semibold text-ink hover:bg-sand/40 transition-colors"
        >
          Browse
        </Link>
        <Link
          href="/matches"
          className="flex-1 text-center bg-paper border border-ink/10 rounded-full px-6 py-[14px] font-sans text-[14.5px] font-semibold text-ink hover:bg-sand/40 transition-colors"
        >
          Matches
        </Link>
      </nav>
    </main>
  );
}
