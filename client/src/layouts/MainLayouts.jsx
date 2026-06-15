import { Outlet,useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CategoryMenu from "../components/layout/CategoryMenu";

const MainLayout = () => {
  const location = useLocation();

  const hideLayout = ["/login","/register"].includes(location.pathname)
  return (
    <>
      {!hideLayout && <Navbar />}
      {location.pathname === "/" && <CategoryMenu />}
      <Outlet />
      {!hideLayout && <Footer />}
    </>
  );
};

export default MainLayout;
