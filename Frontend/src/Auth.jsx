import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { motion } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-gray-100 px-4">
      {/* Logo */}
      <div
        className="text-3xl text-black font-bold cursor-pointer"
        title="Home"
      >
        <Link to={`/`}>
          ReSuMe<span className="text-indigo-500">Craft</span>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 md:p-10">
        <Toaster />
        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 font-semibold rounded-tl-xl rounded-bl-xl transition-colors duration-300 ${isLogin ? "bg-black text-white" : "bg-gray-100 text-gray-700"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 font-semibold rounded-tr-xl rounded-br-xl transition-colors duration-300 ${!isLogin ? "bg-black text-white" : "bg-gray-100 text-gray-700"
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
  const { register, handleSubmit, reset } = useForm();
  let navigate = useNavigate();
  async function handleLogin(data) {
    // console.log(data);
    try {
      let response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      // console.log(result)
      if (!response.ok) {
        return toast.error(result.message);
      }
      localStorage.setItem("userId", result.id);
      toast.success("Logged in Successfully", { duration: 1000 })
      reset();
      setTimeout(() =>
        navigate("/canvas")
        , 1500)
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col gap-4 items-center inset-0"
    >
      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className=" w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className=" w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <div>
        <motion.button
          type='submit'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg cursor-pointer"
        >
          <span>Login</span>
        </motion.button>
      </div>
    </form>
  );
};

const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm();
  let navigate = useNavigate();
  async function handleRegister(data) {
    // console.log(data);
    try {
      let response = await fetch("http://localhost:9000/regsiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      localStorage.setItem("userId", result.id);
      // console.log(result);
      if (!response.ok) {
        return toast.error(result.message);
      }
      toast.success("Registered Successfully", { duration: 1000 })
      reset();
      setTimeout(() =>
        navigate("/canvas")
        , 1500)
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-4 items-center inset-0"
    >
      <input
        type="text"
        {...register("name")}
        placeholder="Full Name"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
      />
      <div>
        <motion.button
          type='submit'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg cursor-pointer"
        >
          <span>Register</span>
        </motion.button>
      </div>
    </form>
  );
};

export default Auth;
