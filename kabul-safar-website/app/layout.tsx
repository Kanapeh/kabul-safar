import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/components/i18n-provider";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MobileFooter } from "@/components/mobile-footer";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Kabul Safar",
  description: "Kabul Safar tourism landing page",
  icons: {
    icon: "/images/Logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="tracking-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                  var script = document.createElement("script");
                  script.async = 1;
                  script.setAttribute("data-cmp-ab","2");
                  script.src = 'https://emrldco.com/NTU5MTg4.js?t=559188';
                  document.head.appendChild(script);
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col pb-20 md:pb-0">
        <I18nProvider>
          {children}
          <MobileFooter />
          <FloatingWhatsApp />
        </I18nProvider>
      </body>
    </html>
  );
}
