"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AvatarUpload({
  initialUrl,
}: {
  initialUrl?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Photo must be under 5MB.");
      return;
    }

    setError(null);
    setUploading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to upload a photo.");
      setUploading(false);
      return;
    }

    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, cacheControl: "3600" });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);

    // cache-bust so a replaced photo shows immediately
    const url = `${publicUrlData.publicUrl}?t=${Date.now()}`;
    setPreview(url);
    setUploading(false);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-[linear-gradient(160deg,#3A7186,#1F4E5F_60%,#C08A3E)] flex items-center justify-center text-white/70 shrink-0">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Your photo" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[11px]">No photo</span>
        )}
      </div>

      <div>
        <label className="cursor-pointer inline-block rounded-full border border-ink/15 px-4 py-[9px] text-[13.5px] font-semibold text-ink hover:bg-sand/30 transition-colors">
          {uploading ? "Uploading…" : preview ? "Change photo" : "Add a photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {error && <p className="mt-1.5 text-[12.5px] text-clay">{error}</p>}
      </div>

      {/* carries the uploaded URL into the onboarding form submission */}
      <input type="hidden" name="avatar_url" value={preview ?? ""} />
    </div>
  );
}