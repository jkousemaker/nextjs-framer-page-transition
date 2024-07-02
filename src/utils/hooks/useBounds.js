import { useState, useEffect, useRef, useCallback } from "react";
import { throttle } from "lodash";

function useElementBounds() {
  const ref = useRef(null);
  const [bounds, setBounds] = useState({});

  const updateBounds = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setBounds({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom,
      });
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create a ResizeObserver
    const resizeObserver = new ResizeObserver(throttle(updateBounds, 100));

    // Observe the element
    resizeObserver.observe(element);

    // Update bounds initially
    updateBounds();

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [updateBounds]);

  return [ref, bounds];
}

export default useElementBounds;
