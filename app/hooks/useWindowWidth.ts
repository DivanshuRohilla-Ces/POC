"use client";

import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if(window.innerWidth < 425){
        setIsMobile(true);
      }else{
        setIsMobile(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}