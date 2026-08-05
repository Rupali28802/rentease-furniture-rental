import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const OfferBanner = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/promo-banners");

        console.log("API Response:", res.data);

        if (Array.isArray(res.data)) {
          setBanners(res.data);
        } else if (Array.isArray(res.data.banners)) {
          setBanners(res.data.banners);
        } else if (Array.isArray(res.data.data)) {
          setBanners(res.data.data);
        } else {
          setBanners([]);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const getBannerLink = (banner) => {
    // Prefer explicit buttonLink if provided
    if (banner.buttonLink) return banner.buttonLink;
    // Otherwise navigate based on banner type
    return banner.type === "newArrival" ? "/new-arrivals" : "/offers";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-4">
        {banners.map((banner, index) => (
          <div
            key={index}
            onClick={() => navigate(getBannerLink(banner))}
            className="relative h-[180px] rounded-lg overflow-hidden bg-[#f5f5f5] cursor-pointer"
          >
            <img
              src={`http://localhost:5000${banner.image}`}
              alt={banner.title}
              className="absolute right-0 top-0 h-full w-[45%] object-cover"
            />

            <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-[55%]">
              <h2 className="mt-4 md:mt-0 text-lg md:text-2xl font-bold text-gray-900 pt-3 md:pt-0">
                {banner.title}
              </h2>

              <p className="text-gray-800 mt-2 text-sm tracking-wide font-extralight">
                {banner.subtitle}
              </p>

              {banner.description && (
                <p className="text-gray-500 text-sm mt-1">
                  {banner.description}
                </p>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(getBannerLink(banner));
                }}
                className="mt-5 w-fit px-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
              >
                {banner.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferBanner;
