import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642] px-4 py-12">
      <SignIn afterSignInUrl="/after-login" />
    </div>
  );
}
