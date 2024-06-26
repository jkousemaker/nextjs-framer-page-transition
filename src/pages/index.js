import { Curve } from "@/components/Layout/Curve";
import dynamic from "next/dynamic";

import "@/utils/materials";
import HeroSection from "@/components/Sections/HomepageHero";
import ProjectList from "@/components/Sections/ProjectList";

export default function Home() {
  return (
    <Curve backgroundColor="#999d9e">
      <HeroSection />
      <ProjectList />
      <main className="w-screen h-[200vh] flex justify-center items-center flex-col text-8xl"></main>
    </Curve>
  );
}
