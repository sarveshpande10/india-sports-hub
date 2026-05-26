import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {

  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    window.scrollTo(0, 0);

  }, [pathname]);

  return null;
}

export default ScrollToTop;