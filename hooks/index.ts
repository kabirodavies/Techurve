"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { isAdmin } from "@/lib/utils";

export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickedOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    };
  }, [callback]);
  return ref;
}

export const useIsAdmin = () => {
  const { user } = useUser();
  return isAdmin(user);
};
