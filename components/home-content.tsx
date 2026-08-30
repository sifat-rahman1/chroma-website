"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/sections/hero").then((mod) => mod.Hero), {
  ssr: false,
  loading: () => <div className="min-h-svh" aria-hidden />,
});

const CaseStudies = dynamic(
  () => import("@/components/sections/case-studies").then((mod) => mod.CaseStudies),
  { ssr: false, loading: () => <div className="py-24" aria-hidden /> }
);

const Services = dynamic(
  () => import("@/components/sections/services").then((mod) => mod.Services),
  { ssr: false, loading: () => <div className="py-24" aria-hidden /> }
);

const Process = dynamic(
  () => import("@/components/sections/process").then((mod) => mod.Process),
  { ssr: false, loading: () => <div className="py-24" aria-hidden /> }
);

const Estimator = dynamic(
  () => import("@/components/sections/estimator").then((mod) => mod.Estimator),
  { ssr: false, loading: () => <div className="py-24" aria-hidden /> }
);

export function HomeContent() {
  return (
    <>
      <Hero />
      <CaseStudies />
      <Services />
      <Process />
      <Estimator />
    </>
  );
}