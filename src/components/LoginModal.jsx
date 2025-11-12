import React from "react";
import { X } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

// 💡 CHANGE: setShowLogin ko 'onClose' se replace kiya
const LoginModal = ({ onClose }) => { 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-2xl relative w-[400px]">
        
        {/* Close Button */}
        <button
          // 💡 FIX: Ab onClose function ko call kiya ja raha hai
          onClick={onClose} 
          className="absolute text-gray-600 top-3 right-3 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Clerk SignIn Form */}
        <SignIn routing="virtual" />
      </div>
    </div>
  );
};

export default LoginModal;