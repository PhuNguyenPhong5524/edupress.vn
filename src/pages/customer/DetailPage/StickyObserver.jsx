import { useEffect, useRef } from "react";

const StickyObserver = ({ onChange }) => {
  const lastValue = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 200;

      if (lastValue.current !== shouldShow) {
        lastValue.current = shouldShow;
        onChange(shouldShow);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onChange]);

  return null;
};

export default StickyObserver;
