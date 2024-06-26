import { useState, useEffect, useRef, useCallback } from "react";
import { throttle } from "lodash"; // Assuming lodash is installed

function useElementBounds() {
  const ref = useRef(null);
  const [bounds, setBounds] = useState({});

  const updateBounds = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      console.log(rect);
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
    // Update bounds initially
    updateBounds();

    // Throttle the updateBounds function to improve performance
    const handleResize = throttle(updateBounds, 100);

    // Update bounds on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // Cancel any pending throttled calls
    };
  }, [updateBounds]);
}

export default useElementBounds;
