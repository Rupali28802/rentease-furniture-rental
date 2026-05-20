import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import registerImg from "../assets/images/register.png";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="flex h-screen">
      {/* Left side decoration */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <img src={registerImg} alt="Plant" className="h-150 mx-auto" />
      </div>

      {/* Right side form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-3xl font-bold  text-green-700">
          Create Account
        </h2>
        <p> Register to get started</p>
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-6 space-y-4">
          <input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
          />
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
          />
          <input
            name="mobile"
            placeholder="Enter your mobile"
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
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
