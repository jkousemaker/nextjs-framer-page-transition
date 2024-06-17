import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RouteListener() {
  const router = useRouter();

  useEffect(() => {
    const startHandler = () => {
      console.log("Router change started");
    };

    const completeHandler = () => {
      console.log("Router change completed");
      //window.scrollTo(0, 0);
    };

    router.events.on("routeChangeStart", startHandler);

    router.events.on("routeChangeComplete", completeHandler);

    return () => {
      router.events.off("routeChangeStart", startHandler);
      router.events.off("routeChangeComplete", completeHandler);
    };
  }, []);

  // 👇 You can put a progress bar or something here
  return <></>;
}
