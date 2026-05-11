import { FaTruck, FaUndo, FaWallet, FaShieldAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 ">
      {/* HERO CARD */}

      <div className="bg-[#f5efe7] rounded-3xl h-92 overflow-hidden">
        <div className="grid lg:grid-cols-2 items-center">
          {/* LEFT CONTENT */}

          <div className="p-6 lg:p-9">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Premium Furniture &
              <br />
              Appliances on Rent
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Stylish. Affordable. Flexible.
            </p>

            <p className="text-gray-600 mt-1">Rent what you love.</p>

            {/* FEATURES */}

            <div className="hidden lg:flex items-center gap-6 mt-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaTruck className="text-green-700" />
                <span>Free Delivery</span>
              </div>

              <div className="flex items-center gap-2">
                <FaUndo className="text-green-700" />
                <span>Easy Returns</span>
              </div>

              <div className="flex items-center gap-2">
                <FaWallet className="text-green-700" />
                <span>No Cost EMI</span>
              </div>

              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-700" />
                <span>Best Quality</span>
              </div>
            </div>

            {/* BUTTON */}

            <button className="mt-6 bg-green-700 hover:bg-green-800 transition text-white px-8 py-4 rounded-xl font-semibold">
              Explore Now
            </button>
          </div>

          {/* RIGHT IMAGE */}

          <div className="relative h-">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1470&auto=format&fit=crop"
              alt="sofa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* MOBILE FEATURES */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow-sm">
          <FaTruck className="text-green-700 text-2xl" />

          <p className="mt-2 text-sm font-medium">Free Delivery</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow-sm">
          <FaUndo className="text-green-700 text-2xl" />

          <p className="mt-2 text-sm font-medium">Easy Returns</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow-sm">
          <FaWallet className="text-green-700 text-2xl" />

          <p className="mt-2 text-sm font-medium">No Cost EMI</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow-sm">
          <FaShieldAlt className="text-green-700 text-2xl" />

          <p className="mt-2 text-sm font-medium">Best Quality</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
