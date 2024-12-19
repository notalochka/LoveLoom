import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fe3c43] to-[#fac4b6] p-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8">
          {isLogin ? "Welcome to LoveLoom" : "Create a LoveLoom account"}
        </h2>

        <div className="bg-white shadow-xl rounded-lg p-8">
          {isLogin ? <LoginForm /> : <SignUpForm />}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>

            <button
              onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
              className="mt-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-300"
            >
              {isLogin ? "Sign up" : "Sign in to your account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
