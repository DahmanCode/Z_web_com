import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MatchesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Every match is stored as two rows (one per direction). Pull all
  // 'matched' rows where I'm on either side, then dedupe by the OTHER
  // person's id so each match only shows up once.
  const { data: matchRows, error } = await supabase
    .from("matches")
    .select("user_id, target_id")
    .eq("status", "matched")
    .or(`user_id.eq.${user.id},target_id.eq.${user.id}`);

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        <p className="text-clay">Could not load matches: {error.message}</p>
      </div>
    );
  }

  const otherIds = Array.from(
    new Set(
      (matchRows ?? []).map((row) =>
        row.user_id === user.id ? row.target_id : row.user_id,
      ),
    ),
  );

  if (otherIds.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="font-display text-[30px] font-medium text-ink mb-7">
          Your matches
        </h1>
        <div className="rounded-[28px] border border-ink/10 bg-paper p-10 text-center text-muted text-[14.5px]">
          No matches yet — head to{" "}
          <Link href="/browse" className="underline text-ink font-medium">
            browse
          </Link>{" "}
          to find some.
        </div>
      </div>
    );
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      avatar_url,
      bio,
      preferred_city,
      user_type,
      phone_verified,
      listings (address, city, rent_amount)
    `,
    )
    .in("id", otherIds);

  if (profilesError) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        <p className="text-clay">
          Could not load match profiles: {profilesError.message}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="font-display text-[30px] font-medium text-ink mb-7">
        Your matches
      </h1>

      <div className="space-y-3">
        {(profiles ?? []).map((profile) => {
          const listing = Array.isArray(profile.listings)
            ? profile.listings[0]
            : profile.listings;

          return (
            <div
              key={profile.id}
              className="flex items-center gap-4 rounded-[24px] border border-ink/10 bg-paper p-4"
            >
              <div className="h-14 w-14 shrink-0 rounded-full bg-[linear-gradient(160deg,#3A7186,#1F4E5F_60%,#C08A3E)] flex items-center justify-center text-white/70 overflow-hidden">
                {profile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name ?? "Match"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[11px]">No photo</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink truncate">
                  {profile.full_name ?? "Anonymous"}
                  {profile.phone_verified && (
                    <span className="ml-2 align-middle rounded-full bg-cobalt/10 text-cobalt text-[11px] font-semibold px-[8px] py-[2px]">
                      ✓ Verified
                    </span>
                  )}
                </p>
                <p className="text-[13.5px] text-muted truncate">
                  {profile.user_type === "has_place" && listing
                    ? (listing.address ??
                      listing.city ??
                      profile.preferred_city)
                    : profile.preferred_city}
                </p>
                {profile.bio && (
                  <p className="text-[13px] text-muted/70 truncate mt-0.5">
                    {profile.bio}
                  </p>
                )}
              </div>

              <Link
                href={`/matches/${profile.id}`}
                className="shrink-0 rounded-full border border-ink/15 px-4 py-2 text-[13.5px] font-semibold text-ink hover:bg-sand/30 transition-colors"
              >
                Message
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
