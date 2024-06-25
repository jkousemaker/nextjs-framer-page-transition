import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import dynamic from "next/dynamic";
const View = dynamic(
  () => import("@/components/Canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    ),
  }
);
export default function HeroSection() {
  return (
    <section className="h-screen">
      <div className="grid size-full grid-cols-11 grid-rows-7 p-10 gap-5">
        <div className="bg-blue-500/50 col-span-full row-span-3 overflow-hidden rounded-3xl">
          <View>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 50]} />
              <HeroSection />
            </Suspense>
          </View>
        </div>
        <div className="bg-gray-500/50 col-span-5"></div>
        <div className="bg-gray-900/50 col-span-1"></div>
        <div className="bg-gray-500/50 col-span-5"></div>
        <div className="bg-black/50 col-span-5 row-span-3 flex flex-col items-start justify-between">
          <button className="bg-black text-white text-md font-thin py-1 px-4 rounded-full">
            Join The Revolution
          </button>
          <h1 className="text-9xl font-semibold tracking-tight">
            <span>Gabryella</span>
            <br />
            <span>Teixeira</span>
          </h1>
        </div>
        <div className="bg-red-500/50 col-span-1 row-span-3 flex items-end justify-center">
          <p className="text-3xl">Logo</p>
        </div>
        <div className="bg-black/50 col-span-5 row-span-3"></div>
      </div>
    </section>
  );
}
