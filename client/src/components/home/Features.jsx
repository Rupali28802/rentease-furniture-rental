// import React, { useEffect, useState } from "react";
// import { api } from "../../api/axios"; // ✅ use custom axios instance

// import {
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaTruck,
//   FaUndoAlt,
//   FaHeadset,
// } from "react-icons/fa";

// const iconMap = {
//   "Affordable Pricing": <FaMoneyBillWave className="text-green-700 text-3xl" />,
//   "Flexible Tenure": <FaCalendarAlt className="text-green-700 text-3xl" />,
//   "Hassle Free Delivery": <FaTruck className="text-green-700 text-3xl" />,
//   "Easy Returns": <FaUndoAlt className="text-green-700 text-3xl" />,
//   "24/7 Support": <FaHeadset className="text-green-700 text-3xl" />,
// };

// export default function Features() {
//   const [features, setFeatures] = useState([]);

//   useEffect(() => {
//     const fetchFeatures = async () => {
//       try {
//         const res = await api.get("/features");
//         console.log("API response:", res.data);

//         if (Array.isArray(res.data)) {
//           setFeatures(res.data);
//         } else if (res.data.features) {
//           setFeatures(res.data.features);
//         } else {
//           setFeatures([]);
//         }
//       } catch (err) {
//         console.error("Error fetching features:", err);
//         setFeatures([]);
//       }
//     };
//     fetchFeatures();
//   }, []);

//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
//         {features.map((f) => (
//           <div
//             key={f._id}
//             className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
//           >
//             {iconMap[f.title] || <FaTag className="text-gray-500 text-3xl" />}
//             <h3 className="mt-3 font-semibold text-lg">{f.title}</h3>
//             <p className="text-sm text-gray-600">{f.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";

// import {
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaTruck,
//   FaUndoAlt,
//   FaHeadset,
//   FaTag,
// } from "react-icons/fa";

import {
  LuBadgeDollarSign,
  LuCalendarDays,
  LuTruck,
  LuRotateCcw,
  LuHeadset,
} from "react-icons/lu";

// const iconClass = "text-green-700 text-xl flex-shrink-0";

// const iconMap = {
//   "Affordable Pricing": <FaMoneyBillWave className={iconClass} />,
//   "Flexible Tenure": <FaCalendarAlt className={iconClass} />,
//   "Hassle Free Delivery": <FaTruck className={iconClass} />,
//   "Easy Returns": <FaUndoAlt className={iconClass} />,
//   "24/7 Support": <FaHeadset className={iconClass} />,
// };


const iconClass = "text-green-700 text-[22px]";

const iconMap = {
  "Affordable Pricing": <LuBadgeDollarSign className={iconClass} />,
  "Flexible Tenure": <LuCalendarDays className={iconClass} />,
  "Hassle Free Delivery": <LuTruck className={iconClass} />,
  "Easy Returns": <LuRotateCcw className={iconClass} />,
  "24/7 Support": <LuHeadset className={iconClass} />,
};

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await api.get("/features");

        console.log("API response:", res.data);

        if (Array.isArray(res.data)) {
          setFeatures(res.data);
        } else if (Array.isArray(res.data.features)) {
          setFeatures(res.data.features);
        } else {
          setFeatures([]);
        }
      } catch (err) {
        console.error("Error fetching features:", err);
        setFeatures([]);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section className="bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5">
        {features.map((f) => (
          <div
            key={f._id}
            className="flex items-center gap-3 px-4 py-5 border-r border-gray-200 last:border-r-0"
          >
            {iconMap[f.title] || (
              <LuBadgeDollarSign className="text-green-700 text-xl" />
            )}

            <div>
              <h3 className="font-semibold text-sm text-gray-900">{f.title}</h3>

              <p className="text-xs text-gray-500 mt-1">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}