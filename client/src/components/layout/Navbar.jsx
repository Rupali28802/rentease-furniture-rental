import { FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      {/* TOP HEADER */}

      <div className="hidden lg:flex justify-between items-center px-10 py-2  bg-white text-sm">
        <p className="text-gray-600">📍 Deliver to Mumbai 400001</p>

        <div className="flex items-center gap-6 text-gray-600">
          <p className="cursor-pointer hover:text-green-700">Track Order</p>

          <p className="cursor-pointer hover:text-green-700">Help</p>

          <p className="cursor-pointer hover:text-green-700">Become Partner</p>
        </div>
      </div>
     <hr className="border-gray-300" />
      {/* MAIN NAVBAR */}

      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <button className="lg:hidden text-2xl">
                <FaBars />
              </button>

              <h1 className="text-3xl font-bold cursor-pointer">
                <span className="text-green-700">Furni</span>

                <span className="text-red-500">Rent</span>
              </h1>
            </div>

            {/* SEARCH BAR */}

            <div className="hidden md:flex flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Search furniture, appliances..."
                className="w-400 border border-gray-300 px-5 py-3 rounded-l-xl outline-none"
              />

              <button className="bg-green-700 text-white px-8 rounded-r-xl hover:bg-green-800">
                Search
              </button>
            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-15">
              {/* WISHLIST */}

              <div className="hidden md:flex flex-col items-center text-sm cursor-pointer">
                <FaHeart className="text-lg" />

                <span>Wishlist</span>
              </div>

              {/* CART */}

              <div className="relative flex flex-col items-center text-sm cursor-pointer">
                <FaShoppingCart className="text-lg" />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>

                <span>Cart</span>
              </div>

              {/* USER */}

              <div className="hidden md:flex flex-col items-center text-sm cursor-pointer">
                <FaUser className="text-lg" />

                <span>Account</span>
              </div>
            </div>
          </div>

          {/* MOBILE SEARCH */}

          <div className="md:hidden mt-4 flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 px-4 py-3 rounded-l-xl outline-none"
            />

            <button className="bg-green-700 text-white px-6 rounded-r-xl">
              Search
            </button>
          </div>

          {/* CATEGORY MENU */}

          <div className="hidden lg:flex items-center gap-13 mt-5 text-base font-medium text-gray-700">
            <button className="bg-green-700 text-white px-5 py-2 rounded-lg">
              All Categories
            </button>

            <p className="cursor-pointer font-bold hover:text-green-700">
              Sofa
            </p>

            <p className="cursor-pointer font-bold  hover:text-green-700">
              Beds
            </p>

            <p className="cursor-pointer font-bold hover:text-green-700">
              Appliances
            </p>

            <p className="cursor-pointer font-bold hover:text-green-700">
              Dining
            </p>

            <p className="cursor-pointer font-bold hover:text-green-700">
              Office
            </p>

            <p className="cursor-pointer font-bold  hover:text-green-700">
              Storage
            </p>
            <p className="cursor-pointer font-bold hover:text-green-700">
              Home Decore
            </p>

            <p className="cursor-pointer font-bold text-red-500">Offers</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
