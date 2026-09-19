import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./profile-form";
import AccountSettings from "./account-settings";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, user_type, avatar_url, preferred_city, budget_min, budget_max, move_in_date, bio",
    )
    .eq("id", user.id)
    .single();

  if (!profile?.user_type) {
    redirect("/onboarding");
  }

  const { data: lifestyle } = await supabase
    .from("lifestyle_preferences")
    .select(
      "cleanliness, noise_tolerance, social_level, sleep_schedule, smoking, has_pets, pet_type, guests_often, work_from_home",
    )
    .eq("profile_id", user.id)
    .single();

  const { data: listing } =
    profile.user_type === "has_place"
      ? await supabase
          .from("listings")
          .select(
            "address, city, neighborhood, rent_amount, available_from, bedrooms, bathrooms, description",
          )
          .eq("profile_id", user.id)
          .single()
      : { data: null };

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="font-display text-[27px] font-medium text-ink mb-9">
        Your profile
      </h1>
      <ProfileForm profile={profile} lifestyle={lifestyle} listing={listing} />
      <AccountSettings currentEmail={user.email ?? null} />
    </main>
  );
}
