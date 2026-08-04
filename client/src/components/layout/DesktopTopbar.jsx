import { FaMapMarkerAlt } from "react-icons/fa";
import { useAddress } from "../../context/AddressContext";

const DesktopTopbar = ({ location }) => {
  const{selectedAddress} = useAddress()
  return (
    <div className="hidden lg:flex justify-between items-center px-10 py-2 bg-white text-sm shadow-sm">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <FaMapMarkerAlt className="text-red-500" />

        <p className="text-sm font-semibold dark:text-white">
          Deliver to:{""}
          {selectedAddress?`${selectedAddress.city},${selectedAddress.state},${selectedAddress.pincode}`
          :"select address"}

        </p>
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