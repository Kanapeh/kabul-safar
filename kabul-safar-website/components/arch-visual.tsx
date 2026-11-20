import type { ReactNode } from "react";
import Image from "next/image";

/** Arched photo with a floating brand badge — the About-page hero visual, reused across pages. */
export function ArchVisual({
  src,
  badge,
  badgeIcon,
  priority = true,
}: {
  src: string;
  badge: ReactNode;
  badgeIcon?: ReactNode;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto h-[260px] w-full max-w-[380px] md:h-[340px]">
      <div className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[32px] border-4 border-white shadow-[0_24px_48px_-24px_rgba(30,45,51,0.55)]">
        <Image src={src} alt="" fill sizes="380px" className="object-cover" priority={priority} />
      </div>
      <div className="absolute -bottom-3 start-1/2 flex w-max max-w-[92%] -translate-x-1/2 items-center gap-2 rounded-2xl border border-line bg-white px-4 py-2.5 shadow-lg rtl:translate-x-1/2">
        <span className="shrink-0">
        {badgeIcon ?? (
          <Image
            src="/images/Kabul%20safar%20logo.jpg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-contain"
          />
        )}
        </span>
        <span className="min-w-0 text-sm font-extrabold leading-6 text-ink">{badge}</span>
      </div>
    </div>
  );
}
