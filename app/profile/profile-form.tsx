"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateProfile, type ProfileResult } from "./actions";
import AvatarUpload from "../components/avatar-upload";
import {
  inputClass,
  labelClass,
  ScaleField,
  SegmentOption,
  ChipCheckbox,
} from "../components/form-fields";

const initialState: ProfileResult = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-ink px-6 py-[13px] text-[14.5px] font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-50"
    >
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

type Profile = {
  full_name: string | null;
  user_type: string | null;
  avatar_url: string | null;
  preferred_city: string | null;
  budget_min: number | null;
  budget_max: number | null;
  move_in_date: string | null;
  bio: string | null;
};

type Lifestyle = {
  cleanliness: number | null;
  noise_tolerance: number | null;
  social_level: number | null;
  sleep_schedule: string | null;
  smoking: boolean | null;
  has_pets: boolean | null;
  pet_type: string | null;
  guests_often: boolean | null;
  work_from_home: boolean | null;
} | null;

type Listing = {
  address: string | null;
  city: string | null;
  neighborhood: string | null;
  rent_amount: number | null;
  available_from: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  description: string | null;
} | null;

export default function ProfileForm({
  profile,
  lifestyle,
  listing,
}: {
  profile: Profile;
  lifestyle: Lifestyle;
  listing: Listing;
}) {
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [showSaved, setShowSaved] = useState(false);
  const [userType, setUserType] = useState<"has_place" | "needs_place">(
    profile.user_type === "has_place" ? "has_place" : "needs_place",
  );

  useEffect(() => {
    if (state?.success) {
      setShowSaved(true);
      const t = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="user_type" value={userType} />

      {/* Looking for a place, or have one */}
      <section className="space-y-3">
        <h2 className="font-display text-[19px] font-medium text-ink">
          I am...
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setUserType("needs_place")}
            className={`rounded-[20px] border p-5 text-left transition-colors ${
              userType === "needs_place"
                ? "border-ink bg-sand/40"
                : "border-ink/12 bg-paper hover:bg-sand/20"
            }`}
          >
            <p className="font-semibold text-ink">Looking for a place</p>
            <p className="text-[13.5px] text-muted mt-1">
              Looking to move in with a roommate
            </p>
          </button>
          <button
            type="button"
            onClick={() => setUserType("has_place")}
            className={`rounded-[20px] border p-5 text-left transition-colors ${
              userType === "has_place"
                ? "border-ink bg-sand/40"
                : "border-ink/12 bg-paper hover:bg-sand/20"
            }`}
          >
            <p className="font-semibold text-ink">Have a place</p>
            <p className="text-[13.5px] text-muted mt-1">
              Looking for a roommate to fill it
            </p>
          </button>
        </div>
        {profile.user_type !== userType && (
          <p className="text-[12.5px] text-muted">
            {userType === "needs_place"
              ? "Switching to this will remove your listing from browse — your listing details stay saved below unless you clear them."
              : "Add your place details below so roommates can find you."}
          </p>
        )}
      </section>

      {/* Basics */}
      <section className="space-y-5">
        <h2 className="font-display text-[19px] font-medium text-ink">
          Basics
        </h2>
        <AvatarUpload initialUrl={profile.avatar_url} />

        <div>
          <label className={labelClass}>Full name</label>
          <input
            name="full_name"
            type="text"
            defaultValue={profile.full_name ?? ""}
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Preferred city</label>
          <input
            name="preferred_city"
            type="text"
            defaultValue={profile.preferred_city ?? ""}
            placeholder="Agadir"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Budget min (MAD)</label>
            <input
              name="budget_min"
              type="number"
              defaultValue={profile.budget_min ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Budget max (MAD)</label>
            <input
              name="budget_max"
              type="number"
              defaultValue={profile.budget_max ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Move-in date</label>
          <input
            name="move_in_date"
            type="date"
            defaultValue={profile.move_in_date ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Short bio</label>
          <textarea
            name="bio"
            rows={3}
            defaultValue={profile.bio ?? ""}
            placeholder="A little about you..."
            className={inputClass}
          />
        </div>
      </section>

      {/* Lifestyle */}
      <section className="space-y-6">
        <h2 className="font-display text-[19px] font-medium text-ink">
          Your lifestyle
        </h2>

        <div className="rounded-[24px] border border-ink/10 bg-paper p-6 space-y-6">
          <ScaleField
            name="cleanliness"
            label="Cleanliness"
            lowLabel="Relaxed"
            highLabel="Spotless"
            defaultValue={lifestyle?.cleanliness ?? 3}
          />
          <ScaleField
            name="noise_tolerance"
            label="Noise tolerance"
            lowLabel="Need quiet"
            highLabel="Don't mind noise"
            defaultValue={lifestyle?.noise_tolerance ?? 3}
          />
          <ScaleField
            name="social_level"
            label="Social level"
            lowLabel="Introvert"
            highLabel="Extrovert"
            defaultValue={lifestyle?.social_level ?? 3}
          />

          <div>
            <p className={labelClass}>Sleep schedule</p>
            <div className="flex gap-2">
              <SegmentOption
                name="sleep_schedule"
                value="early_bird"
                label="Early bird"
                defaultChecked={lifestyle?.sleep_schedule === "early_bird"}
              />
              <SegmentOption
                name="sleep_schedule"
                value="flexible"
                label="Flexible"
                defaultChecked={
                  !lifestyle?.sleep_schedule ||
                  lifestyle?.sleep_schedule === "flexible"
                }
              />
              <SegmentOption
                name="sleep_schedule"
                value="night_owl"
                label="Night owl"
                defaultChecked={lifestyle?.sleep_schedule === "night_owl"}
              />
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-ink/10 bg-paper p-6 space-y-4">
          <p className={labelClass}>A bit more about you</p>
          <div className="flex flex-wrap gap-2">
            <ChipCheckbox
              name="smoking"
              label="Smokes"
              defaultChecked={!!lifestyle?.smoking}
            />
            <ChipCheckbox
              name="has_pets"
              label="Has pets"
              defaultChecked={!!lifestyle?.has_pets}
            />
            <ChipCheckbox
              name="guests_often"
              label="Has guests often"
              defaultChecked={!!lifestyle?.guests_often}
            />
            <ChipCheckbox
              name="work_from_home"
              label="Works from home"
              defaultChecked={!!lifestyle?.work_from_home}
            />
          </div>

          <div>
            <label className={labelClass}>Pet type (if any)</label>
            <input
              name="pet_type"
              type="text"
              defaultValue={lifestyle?.pet_type ?? ""}
              placeholder="Cat, dog, etc."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Listing, only for has_place users */}
      {userType  === "has_place" && (
        <section className="space-y-5">
          <h2 className="font-display text-[19px] font-medium text-ink">
            Your place
          </h2>

          <div>
            <label className={labelClass}>Address</label>
            <input
              name="address"
              type="text"
              defaultValue={listing?.address ?? ""}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>City</label>
              <input
                name="listing_city"
                type="text"
                defaultValue={listing?.city ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Neighborhood</label>
              <input
                name="neighborhood"
                type="text"
                defaultValue={listing?.neighborhood ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Rent (MAD/month)</label>
              <input
                name="rent_amount"
                type="number"
                defaultValue={listing?.rent_amount ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Available from</label>
              <input
                name="available_from"
                type="date"
                defaultValue={listing?.available_from ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input
                name="bedrooms"
                type="number"
                defaultValue={listing?.bedrooms ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input
                name="bathrooms"
                type="number"
                step="0.5"
                defaultValue={listing?.bathrooms ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="listing_description"
              rows={3}
              defaultValue={listing?.description ?? ""}
              className={inputClass}
            />
          </div>
        </section>
      )}

      {state?.error && (
        <p className="text-[13.5px] text-clay border border-clay/20 bg-clay/5 rounded-2xl p-3">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4 pt-1">
        <SubmitButton />
        {showSaved && (
          <span className="text-[13.5px] text-ink/60">Saved ✓</span>
        )}
      </div>
    </form>
  );
}
