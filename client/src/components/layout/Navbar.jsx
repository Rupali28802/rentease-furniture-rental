import { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import TabletNavbar from "./TabletNavbar";
import MobileNavbar from "./MobileNabar";
import MobileMenu from "./MobileMenu";
import DesktopTopbar from "./DesktopTopbar";
import CategoryMenu from "./CategoryMenu";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const [mobileSearch, setMobileSearch] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);



  const cartCount = 0;

  const wishlistCount = 0;

  const location = "Bangalore, 560001";

  const categories = [
    "Sofa",
    "Beds",
    "Appliances",
    "Dining",
    "Office",
    "Storage",
    "Home Decor",
  ];
 

  useEffect(() => {
   document.body.style.overflow = mobileMenu ? "hidden" : "auto";
  }, [mobileMenu]);

  return (
    <>
      <DesktopTopbar location={location} />

      <div className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm  dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <MobileNavbar
            search={search}
            setSearch={setSearch}
            mobileSearch={mobileSearch}
            setMobileSearch={setMobileSearch}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            location={location}
            
          />

          <TabletNavbar
            search={search}
            setSearch={setSearch}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            location={location}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
           
          />

          <DesktopNavbar
            search={search}
            setSearch={setSearch}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            
          />

          <CategoryMenu categories={categories} />
        </div>

        <MobileMenu
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
          categories={categories}
         
        />
      </div>
    </>
  );
};

export default Navbar;
