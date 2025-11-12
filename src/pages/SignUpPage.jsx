import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642] px-4 py-12">
      <SignUp afterSignUpUrl="/after-login" />
    </div>
  );
};

export default SignUpPage;
