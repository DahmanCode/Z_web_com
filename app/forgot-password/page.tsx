"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setStatus({ type: "error", text: error.message });
    } else {
      setStatus({
        type: "success",
        text: "If an account exists for that email, a reset link is on its way.",
      });
    }

    setLoading(false);
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

      <h1 className="font-display text-[27px] font-medium text-ink">Reset your password</h1>
      <p className="mt-1.5 text-[14.5px] text-muted">
        Enter your email and we&apos;ll send you a link to set a new password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[13.5px] font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border border-ink/15 bg-paper px-4 py-[11px] text-[14.5px] text-ink outline-none focus:border-ink/40 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading || status?.type === "success"}
          className="mt-2 rounded-full bg-ink px-4 py-[13px] text-[14.5px] font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send reset link"}
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

      <Link
        href="/login"
        className="mt-6 text-[13.5px] font-medium text-muted hover:text-ink transition-colors"
      >
        ← Back to sign in
      </Link>
    </div>
  );
}
