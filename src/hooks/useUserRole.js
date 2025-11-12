import { useUser } from "@clerk/clerk-react";

export function useUserRole() {
  const { user } = useUser();
  
  // Default to "student" if role is not set
  const role = user?.publicMetadata?.role || "student";
  
  return {
    role,
    isAdmin: role === "admin",
    isStudent: role === "student" || !user?.publicMetadata?.role,
  };
}

