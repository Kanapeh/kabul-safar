import type { ReactNode } from "react";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";

/** Shared frame for every public page: same width, spacing, header and footer as the homepage. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full max-w-300">
        <main className="space-y-12 px-4 pt-2 md:space-y-16 md:px-6">
          <Header />
          {children}
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
