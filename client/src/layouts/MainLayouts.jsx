import { Outlet,useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  const location = useLocation();

  const hideLayout = ["/login","/register"].includes(location.pathname)
  return (
    <>
      {!hideLayout &&<Navbar /> }

      <Outlet />
      {!hideLayout &&<Footer />}
    </>
  );
};

export default MainLayout;
