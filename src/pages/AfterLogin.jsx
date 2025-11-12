import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AfterLogin() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const ADMIN_EMAIL = "nccareofficial@gmail.com";

  useEffect(() => {
    if (!isLoaded) return;
    if (user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  }, [isLoaded, user, navigate]);

  return null;
}
