
import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HeroBannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  // ===============================
  // GET HERO BANNERS
  // ===============================
  useEffect(() => {
    api
      .get("/hero-banners")
      .then((res) => {
        setBanners(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch hero banners:", err);
      });
  }, []);

  // ===============================
  // AUTO SLIDER
  // ===============================
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners]);

  // ===============================
  // NEXT / PREVIOUS
  // ===============================
  const nextSlide = () => {
    if (banners.length === 0) return;

    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (banners.length === 0) return;

    setIndex(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
  };

  // ===============================
  // IMAGE URL
  // ===============================
  const getImageUrl = (banner) => {
    if (!banner?.image?.data) return "";

    return `data:${banner.image.contentType};base64,${banner.image.data}`;
  };

  return (
    <div className="relative w-full h-[67.7vh] overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={banner._id || i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${getImageUrl(banner)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="bg-black/40 w-full h-full flex items-center justify-start px-6 md:px-12">
            <div className="text-white w-full md:w-1/2 lg:w-3/7 m-auto md:ml-20">
              {/* Title */}
              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-bold
                  mb-4
                  max-w-90
                  tracking-tight
                  sm:tracking-normal
                  md:tracking-wide
                  lg:tracking-wider
                "
              >
                {banner.title}
              </h1>

              {/* Subtitle */}
              <p
                className="
                  text-sm
                  sm:text-base
                  md:text-lg
                  mb-3
                  max-w-80
                  tracking-normal
                "
              >
                {banner.subtitle}
              </p>

              {/* Features */}
              <ul className="flex md:text-sm gap-4 mb-6 flex-wrap">
                {banner.features?.map((f, idx) => (
                  <li
                    key={idx}
                    className="text-sm bg-white/20 px-3 py-1 rounded"
                  >
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <a
                href={banner.link}
                className="
                  bg-green-800
                  hover:bg-green-700
                  text-white
                  px-6
                  py-2
                  rounded
                  inline-block
                "
              >
                {banner.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* ===============================
          NAVIGATION
      =============================== */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              bg-white/30
              text-white
              p-3
              rounded-full
              hover:bg-white/50
            "
          >
            <FaArrowLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              bg-white/30
              text-white
              p-3
              rounded-full
              hover:bg-white/50
            "
          >
            <FaArrowRight size={20} />
          </button>

          {/* ===============================
              DOTS
          =============================== */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {banners.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={`
                  w-3
                  h-3
                  rounded-full
                  cursor-pointer
                  ${
                    i === index
                      ? "bg-green-600"
                      : "bg-white/50"
                  }
                `}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroBannerSlider;