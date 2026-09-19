"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PasswordField, PASSWORD_PATTERN, PASSWORD_HINT } from "../components/form-fields";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!PASSWORD_PATTERN.test(password)) {
      setStatus({
        type: "error",
        text: "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: "error", text: "Passwords don't match." });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setStatus({ type: "success", text: "Password updated. Taking you to your dashboard…" });
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    }
  }

  return (
    <div className="mx-auto max-w-sm w-full px-6 py-20 flex-1 flex flex-col justify-center">
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-[19px] font-semibold text-ink mb-10"
      >
        <span className="w-[24px] h-[24px] rounded-full border-[3px] border-accent block" />
        Zoufri
      </Link>

      <h1 className="font-display text-[27px] font-medium text-ink">Set a new password</h1>
      <p className="mt-1.5 text-[14.5px] text-muted">Choose a new password for your account.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
                <PasswordField id="password" label="New password" value={password} onChange={setPassword} minLength={8} />
        <p className="-mt-2 text-[12.5px] text-muted">{PASSWORD_HINT}</p>

        <PasswordField
          id="confirmPassword"
          label="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          minLength={8}
        />

        <button
          type="submit"
          disabled={loading || status?.type === "success"}
          className="mt-2 rounded-full bg-ink px-4 py-[13px] text-[14.5px] font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Update password"}
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-[13.5px] rounded-xl p-3 ${
            status.type === "error"
              ? "text-clay bg-clay/5 border border-clay/15"
              : "text-ink bg-sand/40"
          }`}
        >
          {status.text}
        </p>
      )}
    </div>
  );
}
