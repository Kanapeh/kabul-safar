"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function ShareButtons({ title, labels }: { title: string; labels: { share: string; copy: string; copied: string } }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${title}\n${window.location.href}`)}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-bold text-ink">{labels.share}</span>
      <button
        type="button"
        onClick={shareWhatsApp}
        className="inline-flex items-center gap-2 rounded-xl bg-[#1f9d55] px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#188547]"
      >
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp
      </button>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-bold text-ink transition-colors hover:bg-canvas"
      >
        {copied ? <Check className="h-4 w-4 text-teal" /> : <Link2 className="h-4 w-4" />}
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
