import React from "react";
import axios from "axios";
import { api } from "../../api/axios";
import {
  FaTag,
  FaCalendarAlt,
  FaTruck,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

const iconMap = {
  "Affortable Pricing": <FaTag className="text-green-700 text-3xl" />,
  "Flexible Tenure": <FaCalendarAlt className="text-green-700 text-3xl" />,
  "Hassle Free Delivey": <FaTruck className="text-green-700 text-3xl" />,
  "Easy Returns": <FaUndo className="text-green-700 text-3xl" />,
  "24/7": <FaHeadset className="text-green-700 text-3xl" />,
};
export const Features = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get("/features");
        //  console.log("API response:", res.data);
        setFeatures(res.data);
      } catch (error) {
        console.log("Error fetching features:", error);
      }
    };
    fetchFeatures();
  }, []);
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 text-center">
        {features.map((f) => (
          <div
            key={f._id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            {iconMap[f.tital] || <FaTag className="text-gray-500 text-3xl" />}
            <h3 className="mt-3 font-semibold text-lg">{f.tital}</h3>
            <p className="text-sm text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
