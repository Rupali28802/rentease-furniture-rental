import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import loginImg from "../assets/images/login.png"

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex h-screen">
      {/* Left side form */}
      <div className="flex-1 flex flex-col justify-center items-center bg- p-10">
        <h2 className="text-3xl font-bold  text-green-700">
          Welcome Back! 
          </h2>
          <p>Login to your account
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 space-y-4">
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
          />
          <Link to="/forgot-password" className="text-sm text-green-700">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-700 font-semibold">
            Register
          </Link>
        </p>
      </div>

      {/* Right side decoration */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <img src={loginImg} alt="Armchair" className="h-172  mx-auto mt-0" />
          
        </div>
      </div>
    </div>
  );
};

export default Login;
