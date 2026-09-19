"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { inputClass, labelClass } from "../components/form-fields";

type Status = { type: "error" | "success"; text: string } | null;

// Accepts 06 12 34 56 78, 0612345678, +212612345678 or 00212612345678
function toE164(raw: string): string | null {
  const s = raw.replace(/[\s.\-()]/g, "");
  if (/^\+212[67]\d{8}$/.test(s)) return s;
  if (/^00212[67]\d{8}$/.test(s)) return "+" + s.slice(2);
  if (/^0[67]\d{8}$/.test(s)) return "+212" + s.slice(1);
  return null;
}

export default function PhoneVerification({
  currentPhone,
  verified,
}: {
  currentPhone: string | null;
  verified: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [phoneInput, setPhoneInput] = useState("");
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [loading, setLoading] = useState(false);

  // Supabase stores phones without the leading "+"
  const shownPhone = currentPhone ? `+${currentPhone.replace(/^\+/, "")}` : null;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    const phone = toE164(phoneInput);
    if (!phone) {
      setStatus({
        type: "error",
        text: "Enter a valid Moroccan mobile number, e.g. 06 12 34 56 78.",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ phone });
    setLoading(false);

    if (error) {
      setStatus({ type: "error", text: error.message });
      return;
    }
    setPendingPhone(phone);
    setStatus({ type: "success", text: `We sent a 6-digit code to ${phone}.` });
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!pendingPhone) return;
    setStatus(null);
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      phone: pendingPhone,
      token: code.trim(),
      type: "phone_change",
    });
    setLoading(false);

    if (error) {
      setStatus({ type: "error", text: error.message });
      return;
    }
    setPendingPhone(null);
    setCode("");
    setPhoneInput("");
    router.refresh();
  }

  const buttonClass =
    "self-start rounded-full border border-ink/15 px-5 py-[10px] text-[13.5px] font-semibold text-ink hover:bg-sand/40 transition-colors disabled:opacity-50";

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-[19px] font-medium text-ink">Phone number</h2>
        {verified ? (
          <p className="text-[13.5px] text-muted mt-1 flex items-center gap-2">
            <span className="rounded-full bg-cobalt/10 text-cobalt text-[12px] font-semibold px-[10px] py-[4px]">
              ✓ Verified
            </span>
            {shownPhone}
          </p>
        ) : (
          <p className="text-[13.5px] text-muted mt-1">
            Verify your number to get a verified badge on your profile. Your number is never shown
            to other users.
          </p>
        )}
      </div>

      {!verified && !pendingPhone && (
        <form onSubmit={handleSend} className="flex flex-col gap-3 max-w-sm">
          <div>
            <label className={labelClass}>Mobile number</label>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="06 12 34 56 78"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className={inputClass}
            />
          </div>
          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? "Sending…" : "Send code"}
          </button>
        </form>
      )}

      {!verified && pendingPhone && (
        <form onSubmit={handleVerify} className="flex flex-col gap-3 max-w-sm">
          <div>
            <label className={labelClass}>6-digit code</label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              maxLength={6}
              pattern="\d{6}"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading} className={buttonClass}>
              {loading ? "Verifying…" : "Verify"}
            </button>
            <button
              type="button"
              onClick={() => {
                setPendingPhone(null);
                setCode("");
                setStatus(null);
              }}
              className="text-[13.5px] text-muted underline"
            >
              Use a different number
            </button>
          </div>
        </form>
      )}

      {status && (
        <p
          className={`text-[13.5px] rounded-xl p-3 max-w-sm ${
            status.type === "error"
              ? "text-clay bg-clay/5 border border-clay/15"
              : "text-ink bg-sand/40"
          }`}
        >
          {status.text}
        </p>
      )}
    </section>
  );
}