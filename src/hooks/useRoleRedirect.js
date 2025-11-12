import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function useRoleRedirect() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role;

    if (role === "admin") navigate("/admin-dashboard");
    else navigate("/dashboard");
  }, [isLoaded, user, navigate]);
}
