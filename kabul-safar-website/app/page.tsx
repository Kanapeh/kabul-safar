import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Destination } from "@/sections/destination";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { HowItWorks } from "@/sections/how-it-works";
import { Partners } from "@/sections/partners";
import { ServiceFeature } from "@/sections/service-feature";
import { Stats } from "@/sections/stats";
import { Testimonials } from "@/sections/testimonials";
import { WhyChooseUs } from "@/sections/why-choose-us";
import { Faq } from "@/sections/faq";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";

export default function Home() {
  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full max-w-300">
        <main className="space-y-12 px-4 pt-2 md:space-y-20 md:px-6">
          <Header />
          <Hero />
          <Partners />
          <HowItWorks />
          <Destination />

          <div className="ks-card space-y-12 p-5 md:space-y-16 md:p-10">
            <ServiceFeature />
            <Stats />
            <WhyChooseUs />
            <About />
          </div>

          <Testimonials />
          <Faq />
          <CtaPromo />
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
