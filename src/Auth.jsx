import { useState } from "react";
import Button from "./DownloadButton";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 md:p-10">
        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 font-semibold rounded-tl-xl rounded-bl-xl transition-colors duration-300 ${
              isLogin ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 font-semibold rounded-tr-xl rounded-br-xl transition-colors duration-300 ${
              !isLogin ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-4 inset-0">
      <input
        type="email"
        placeholder="Email"
        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <Button name={"Login"}/>
    </form>
  );
};

const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Full Name"
        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <input
        type="email"
        placeholder="Email"
        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <Button name={"Register"} />
    </form>
  );
};

export default Auth;