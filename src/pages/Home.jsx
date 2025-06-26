import React, { Suspense, lazy } from "react";

const HeroSection = lazy(() =>import ( "../components/common/HeroSection"))
const FeaturesSection = lazy(() => import("../components/common/FeaturesSection"));
const PopularPackages = lazy(() => import("../components/common/PopularPackages"));
const AIPlannerCTA = lazy(() => import("../components/common/AIPlannerCTA"));
const HowItWorks = lazy(() => import("../components/common/HowItWorks"));
const TestimonialsSection = lazy(() => import("../components/common/TestimonialsSection"));
const FooterSection = lazy(() => import("../components/common/FooterSection"));

const Home = () => (
  <Suspense fallback={<div className="h-screen flex justify-center items-center">Loading...</div>}>
    <HeroSection />
    <FeaturesSection />
    <PopularPackages />
    <AIPlannerCTA />
    <HowItWorks />
    <TestimonialsSection />
    <FooterSection />
  </Suspense>
);

export default Home;
