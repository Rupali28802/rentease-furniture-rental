import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/"); // login ke baad homepage pe redirect
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-10">
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-600 mb-6">Login to your account</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded outline-none focus:border-green-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded outline-none focus:border-green-600"
          />
          <div className="flex flex-1 justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-green-700 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/reset-password"
              className="text-sm text-green-700 hover:underline"
            >
              Reset Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
          >
            Login
          </button>
        </form>

        <p className="mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Right Side Image */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <img
          src={loginImg}
          alt="Login"
          className="max-h-[500px] object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
