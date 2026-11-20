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
 * Consistent section heading used across the site: bold title → muted supporting line,
 * with an optional action link. (`eyebrow` is accepted for compatibility but not shown —
 * the Figma direction keeps headings clean.)
 */
export const SectionHeading = ({
  id,
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
        <h2
          id={id}
          className={`text-[24px] font-extrabold leading-[1.45] md:text-[34px] ${titleColor}`}
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
