// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import registerImg from "../assets/images/register.png";

// const Register = () => {
//   const { register } = useAuth();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await register(formData);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left side decoration */}
//       <div className="flex-1 bg-gray-100 flex items-center justify-center">
//         <img src={registerImg} alt="Plant" className="h-150 mx-auto" />
//       </div>

//       {/* Right side form */}
//       <div className="flex-1 flex flex-col justify-center items-center bg-white p-10">
//         <h2 className="text-3xl font-bold  text-green-700">
//           Create Account
//         </h2>
//         <p> Register to get started</p>
//         <form onSubmit={handleSubmit} className="w-full max-w-md mt-6 space-y-4">
//           <input
//             name="name"
//             placeholder="Enter your name"
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded"
//           />
//           <input
//             name="email"
//             placeholder="Enter your email"
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded"
//           />
//           <input
//             name="mobile"
//             placeholder="Enter your mobile"
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded"
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Enter your password"
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded"
//           />
//           <button
//             type="submit"
//             className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
//           >
//             Register
//           </button>
//         </form>
//         <p className="mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-700 font-semibold">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import registerImg from "../assets/images/register.png";

// const Register = () => {
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setErrors({});
//       setSuccess("");
//       await register(formData);
//       setSuccess("Registration successful!");
//       setTimeout(() => navigate("/"), 1000);
//     } catch (err) {
//       setErrors({ [err.field]: err.message });
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col lg:flex-row">
//       {/* Left Side Image (Desktop/Tablet only) */}
//       <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center">
//         <img
//           src={registerImg}
//           alt="Register"
//           className="max-h-[600px] object-contain"
//         />
//       </div>

//       {/* Right Side Form */}
//       <div className="flex-1 flex items-center justify-center bg-white px-6 py-10">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-green-700 mb-2">
//             Create Account
//           </h2>
//           <p className="text-gray-600 mb-6">Register to get started</p>

//           {success && (
//             <div className="mb-4 rounded bg-green-100 px-4 py-3 text-green-700">
//               {success}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
//             />
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name}</p>
//             )}

//             <input
//               type="number"
//               name="age"
//               placeholder="Enter your age"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
//             />
//             {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}

//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email}</p>
//             )}

//             <input
//               type="text"
//               name="mobile"
//               placeholder="Enter 10 digit mobile number"
//               value={formData.mobile}
//               onChange={handleChange}
//               className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
//             />
//             {errors.mobile && (
//               <p className="text-sm text-red-500">{errors.mobile}</p>
//             )}

//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
//             />
//             {errors.password && (
//               <p className="text-sm text-red-500">{errors.password}</p>
//             )}

//             <button
//               type="submit"
//               className="w-full rounded bg-green-700 py-3 text-white hover:bg-green-800"
//             >
//               Register
//             </button>
//           </form>

//           <p className="mt-5 text-center">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-semibold text-green-700 hover:underline"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/register.png";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      setSuccess("");
      await register(formData);
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setErrors({ [err.field]: err.message });
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side Image (Desktop/Tablet only) */}
      <div className="hidden md:flex flex-1 bg-gray-100 items-center justify-center">
        <img
          src={registerImg}
          alt="Register"
          className="max-h-[600px] object-contain"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 mb-6 text-center">Register to get started</p>

          {success && (
            <div className="mb-4 rounded bg-green-100 px-4 py-3 text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}

            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}

            <input
              type="text"
              name="mobile"
              placeholder="Enter 10 digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
            />
            {errors.mobile && (
              <p className="text-sm text-red-500">{errors.mobile}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded border px-4 py-3 outline-none focus:border-green-600"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            <button
              type="submit"
              className="w-full rounded bg-green-700 py-3 text-white hover:bg-green-800"
            >
              Register
            </button>
          </form>

          <p className="mt-5 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
