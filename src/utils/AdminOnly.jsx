import { useUser } from "@clerk/clerk-react";

export default function AdminOnly({ children }) {
  const { user } = useUser();
  const ADMIN_EMAIL = "nccareofficial@gmail.com";
  
  if (user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return <div className="mt-10 text-xl text-center text-red-500">Access Denied</div>;
  }
  
  return children;
}
