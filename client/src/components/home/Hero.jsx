import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HeroBannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
  
      api.get("/hero-banners")
      .then((res) => setBanners(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/hero/${banner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/40 w-full h-full flex items-center justify-start px-6 md:px-12">
            <div className="text-white w-full md:w-1/2 lg:w-2/5 ml-2 max-w-130 md:ml-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl  font-bold mb-4 max-w-80">{banner.title}</h1>
              <p className="text-sm sm:text-base md:text-lg mb-3 max-w-80">{banner.subtitle}</p>
              <ul className="flex md:text-sm  gap-4 mb-6">
                {banner.features?.map((f, idx) => (
                  <li
                    key={idx}
                    className="text-sm bg-white/20 px-3 py-1 rounded"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={banner.link}
                className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded"
              >
                {banner.buttonText}
              </a>
            </div>
          </div>
          
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full hover:bg-white/50"
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full hover:bg-white/50"
      >
        <FaArrowRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${i === index ? "bg-green-600" : "bg-white/50"}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroBannerSlider;
