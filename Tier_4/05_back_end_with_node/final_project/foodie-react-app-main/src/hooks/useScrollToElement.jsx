import { useCallback } from "react";

const useScrollToElement = () => {
  const scrollToElement = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return scrollToElement;
};

export default useScrollToElement;
