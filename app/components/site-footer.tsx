import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#211F1A] text-[#FFFDF8]">
      <div className="mx-auto max-w-[1240px] px-6 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="font-display text-[20px] font-semibold flex items-center gap-2">
            <span className="w-[24px] h-[24px] rounded-full border-[3px] border-[#C08A3E] relative block" />
            Zoufri
          </Link>
          <p className="mt-3 text-[13.5px] text-white/60 leading-[1.5] max-w-[220px]">
            Roommate matching across Morocco — matched on lifestyle, not just a photo.
          </p>
        </div>

        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/50 mb-4">Product</h4>
          <ul className="space-y-3 text-[14.5px] text-white/75">
            <li><Link href="/browse" className="hover:text-[#FFFDF8] transition-colors">Browse</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-[#FFFDF8] transition-colors">How it works</Link></li>
            <li><Link href="/onboarding" className="hover:text-[#FFFDF8] transition-colors">List your place</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/50 mb-4">Company</h4>
          <ul className="space-y-3 text-[14.5px] text-white/75">
            <li><Link href="/about" className="hover:text-[#FFFDF8] transition-colors">About</Link></li>
            <li><Link href="/safety" className="hover:text-[#FFFDF8] transition-colors">Safety</Link></li>  
            <li><a href="mailto:hello@zoufri.com" className="hover:text-[#FFFDF8] transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/50 mb-4">Legal</h4>
          <ul className="space-y-3 text-[14.5px] text-white/75">
            <li><Link href="/terms" className="hover:text-[#FFFDF8] transition-colors">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-[#FFFDF8] transition-colors">Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-[12.5px] text-white/40">
          <span>© {new Date().getFullYear()} Zoufri. All rights reserved.</span>
          <span>Made in Morocco 🇲🇦</span>
        </div>
      </div>
    </footer>
  );
}