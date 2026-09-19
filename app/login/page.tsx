"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  PasswordField,
  PASSWORD_PATTERN,
  PASSWORD_HINT,
} from "../components/form-fields";


export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [status, setStatus] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setStatus({ type: "error", text: error.message });
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const strongEnough = PASSWORD_PATTERN.test(password);
      if (!strongEnough) {
        setStatus({
          type: "error",
          text: "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.",
        });
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setStatus({ type: "error", text: "Passwords don't match." });
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setStatus({ type: "error", text: error.message });
      } else {
        if (data.session && data.user) {
          await supabase
            .from("profiles")
            .update({ full_name: fullName })
            .eq("id", data.user.id);
          router.push("/onboarding");
          router.refresh();
        } else {
          setStatus({
            type: "success",
            text: "Check your email to confirm your account.",
          });
        }
      }
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-[1240px] w-full px-6 grid md:grid-cols-2 gap-6 flex-1">
      {/* Branded panel */}
      <div className="hidden md:flex relative flex-col justify-between overflow-hidden bg-[#211F1A] text-[#FFFDF8] p-12 rounded-[28px] my-4">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #C08A3E 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 w-[320px] h-[320px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #1F4E5F 0%, transparent 70%)",
          }}
        />

        <Link
          href="/"
          className="relative flex items-center gap-3 font-display text-[20px] font-semibold"
        >
          <svg viewBox="0 0 100 100" className="w-9 h-9">
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#C08A3E"
              strokeWidth="7"
            />
            <path
              d="M 34,62 L 34,40 L 50,26 L 66,40 L 66,62"
              fill="none"
              stroke="#C08A3E"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Zoufri
        </Link>

        <div className="relative">
          <h2 className="font-display text-[34px] leading-[1.15] font-medium max-w-[360px]">
            Find the roommate who actually fits your life.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-white/65 max-w-[340px]">
            Matched on lifestyle, budget, and habits — not just a photo.
          </p>
        </div>

        <ul className="relative space-y-3 text-[14px] text-white/70">
          <li className="flex items-center gap-3">
            <span className="w-[6px] h-[6px] rounded-full bg-[#C08A3E]" />
            Roommates and rooms across Morocco
          </li>
          <li className="flex items-center gap-3">
            <span className="w-[6px] h-[6px] rounded-full bg-[#C08A3E]" />
            Compatibility scoring, not guesswork
          </li>
          <li className="flex items-center gap-3">
            <span className="w-[6px] h-[6px] rounded-full bg-[#C08A3E]" />
            Message once you're matched
          </li>
        </ul>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="md:hidden flex items-center gap-2 font-display text-[19px] font-semibold text-ink mb-10"
          >
            <span className="w-[24px] h-[24px] rounded-full border-[3px] border-accent block" />
            Zoufri
          </Link>

          <div className="flex rounded-full bg-sand/40 p-1 mb-8">
            <button
              type="button"
              onClick={() => {
                setMode("sign-in");
                setStatus(null);
              }}
              className={`flex-1 rounded-full py-2 text-[14px] font-semibold transition-colors ${
                mode === "sign-in" ? "bg-ink text-paper" : "text-muted"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("sign-up");
                setStatus(null);
              }}
              className={`flex-1 rounded-full py-2 text-[14px] font-semibold transition-colors ${
                mode === "sign-up" ? "bg-ink text-paper" : "text-muted"
              }`}
            >
              Sign up
            </button>
          </div>

          <h1 className="font-display text-[28px] font-medium text-ink">
            {mode === "sign-in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-[14.5px] text-muted">
            {mode === "sign-in"
              ? "Sign in to see your matches and messages."
              : "Takes about a minute — no photo required yet."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
            {mode === "sign-up" && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="text-[13.5px] font-medium text-ink"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-2xl border border-ink/15 bg-paper px-4 py-[11px] text-[14.5px] text-ink outline-none focus:border-ink/40 transition-colors"
                />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[13.5px] font-medium text-ink"
              >
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

            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              minLength={mode === "sign-up" ? 8 : 6}
            />
            {mode === "sign-up" && (
              <p className="-mt-2 text-[12.5px] text-muted">
                {PASSWORD_HINT}
              </p>
            )}

            {mode === "sign-up" && (
              <PasswordField
                id="confirmPassword"
                label="Confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                minLength={8}
              />
            )}

            {mode === "sign-up" && (
              <label className="flex items-start gap-2.5 text-[13px] text-muted">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-[3px] h-4 w-4 rounded border-ink/25 accent-[#211F1A]"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-ink underline underline-offset-2"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-ink underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            )}

            {mode === "sign-in" && (
              <Link
                href="/forgot-password"
                className="self-end -mt-2 text-[13px] font-medium text-muted hover:text-ink transition-colors"
              >
                Forgot password?
              </Link>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-ink px-4 py-[13px] text-[14.5px] font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
            >
              {loading
                ? "Please wait…"
                : mode === "sign-in"
                  ? "Sign in"
                  : "Create account"}
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
      </div>
    </div>
  );
}
