"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { inputClass, labelClass } from "../components/form-fields";

type Status = { type: "error" | "success"; text: string } | null;

export default function AccountSettings({ currentEmail }: { currentEmail: string | null }) {
  const router = useRouter();
  const supabase = createClient();

  // Change email
  const [newEmail, setNewEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<Status>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault();
    setEmailStatus(null);
    setEmailLoading(true);

    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      setEmailStatus({ type: "error", text: error.message });
    } else {
      setEmailStatus({
        type: "success",
        text: "Confirmation link sent. Check your inbox (and your old email, if required) to finish the change.",
      });
      setNewEmail("");
    }
    setEmailLoading(false);
  }

  // Delete account
  const [confirmText, setConfirmText] = useState("");
  const [deleteStatus, setDeleteStatus] = useState<Status>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setDeleteStatus(null);

    if (confirmText !== "DELETE") {
      setDeleteStatus({ type: "error", text: 'Type "DELETE" to confirm.' });
      return;
    }

    setDeleteLoading(true);
    const res = await fetch("/api/delete-account", { method: "POST" });
    const body = await res.json();

    if (!res.ok) {
      setDeleteStatus({ type: "error", text: body.error ?? "Could not delete your account." });
      setDeleteLoading(false);
      return;
    }

    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-10 mt-12 pt-10 border-t border-ink/10">
      {/* Change email */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-[19px] font-medium text-ink">Email</h2>
          <p className="text-[13.5px] text-muted mt-1">Current: {currentEmail}</p>
        </div>
        <form onSubmit={handleEmailChange} className="flex flex-col gap-3 max-w-sm">
          <div>
            <label className={labelClass}>New email</label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={emailLoading}
            className="self-start rounded-full border border-ink/15 px-5 py-[10px] text-[13.5px] font-semibold text-ink hover:bg-sand/40 transition-colors disabled:opacity-50"
          >
            {emailLoading ? "Sending…" : "Send confirmation"}
          </button>
        </form>
        {emailStatus && (
          <p
            className={`text-[13.5px] rounded-xl p-3 max-w-sm ${
              emailStatus.type === "error"
                ? "text-clay bg-clay/5 border border-clay/15"
                : "text-ink bg-sand/40"
            }`}
          >
            {emailStatus.text}
          </p>
        )}
      </section>

      {/* Delete account */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-[19px] font-medium text-clay">Delete account</h2>
          <p className="text-[13.5px] text-muted mt-1">
            This permanently deletes your account and all your data. This can&apos;t be undone.
          </p>
        </div>
        <form onSubmit={handleDelete} className="flex flex-col gap-3 max-w-sm">
          <div>
            <label className={labelClass}>Type DELETE to confirm</label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={deleteLoading}
            className="self-start rounded-full bg-clay px-5 py-[10px] text-[13.5px] font-semibold text-paper hover:bg-clay/90 transition-colors disabled:opacity-50"
          >
            {deleteLoading ? "Deleting…" : "Delete my account"}
          </button>
        </form>
        {deleteStatus && (
          <p className="text-[13.5px] rounded-xl p-3 max-w-sm text-clay bg-clay/5 border border-clay/15">
            {deleteStatus.text}
          </p>
        )}
      </section>
    </div>
  );
}