import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, Link } from "react-router-dom";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(token, password);
    alert("Password reset successful, please login again");
  };

  return (
    <div className="flex h-screen">
      {/* Left side form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4">
          Back to{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>

      {/* Right side decoration */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <img src="/assets/plant.png" alt="Plant" className="w-64 mx-auto" />
      </div>
    </div>
  );
};

export default ResetPassword;
