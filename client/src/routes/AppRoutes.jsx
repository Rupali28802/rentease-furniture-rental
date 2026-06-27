// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import MainLayout from "../layouts/MainLayouts";

// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ForgotPassword from "../pages/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword";
// import Profile from "../pages/Profile";
// import ProductPage from "../pages/Products";

// const AppRoutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* main layout + home */}
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//         </Route>
//         {/* Auth Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset/:token" element={<ResetPassword />} />
//         {/* Profile Route */}
//         <Route path="/profile" element={<Profile />} />

//         {/* Fallback */}
//         <Route path="*" element={<Login />} />
//         {/* PRoduct Routes*/}
//         <Route path="/products" element={<ProductPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayouts";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import ProductPage from "../pages/Products";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper: Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* aur bhi pages yahan add kar sakte ho */}
        </Route>

        {/* Auth Routes (without Navbar/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
