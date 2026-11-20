import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  action?: ReactNode;
  tone?: "light" | "dark";
};

/**
 * Consistent section heading used across the site:
 * eyebrow pill → bold title → muted supporting line, with an optional action link.
 */
export const SectionHeading = ({
  id,
  eyebrow,
  title,
  subtitle,
  align = "start",
  action,
  tone = "light",
}: SectionHeadingProps) => {
  const centered = align === "center";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const subColor = tone === "dark" ? "text-white/70" : "text-muted";

  return (
    <header
      className={`flex gap-4 ${centered ? "flex-col items-center text-center" : "items-end justify-between text-start"}`}
    >
      <div className={`min-w-0 space-y-2 ${centered ? "w-full max-w-[42rem]" : "max-w-[42rem] flex-1"}`}>
        {eyebrow ? <span className="ks-eyebrow">{eyebrow}</span> : null}
        <h2
          id={id}
          className={`text-[22px] font-extrabold leading-[1.45] md:text-[30px] ${titleColor}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={`text-[15px] leading-7 md:text-base md:leading-8 ${subColor}`}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {action && !centered ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
};
