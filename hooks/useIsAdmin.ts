import { useUser } from "@clerk/nextjs";

export function useIsAdmin() {
  const { user, isLoaded } = useUser();
  return isLoaded && user?.publicMetadata?.role === "admin";
} 