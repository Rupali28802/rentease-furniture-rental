import { FaMapMarkerAlt } from "react-icons/fa";

const DesktopTopbar = ({ location }) => {
  return (
    <div className="hidden lg:flex justify-between items-center px-10 py-2 bg-white dark:bg-gray-900 text-sm border-b dark:border-gray-700">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <FaMapMarkerAlt className="text-red-500" />

        <p>Deliver to {location}</p>
      </div>

      <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300">
        <p className="cursor-pointer hover:text-green-700">Track Order</p>

        <p className="cursor-pointer hover:text-green-700">Help</p>

        <p className="cursor-pointer hover:text-green-700">Become Partner</p>
      </div>
    </div>
  );
};

export default DesktopTopbar;
