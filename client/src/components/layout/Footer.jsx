import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaCouch } from "react-icons/fa6";
import Upi from "../../assets/Footer-Img/UPI.png"
import Rupay from "../../assets/Footer-Img/Rupay.jpg"
import MasterCard from "../../assets/Footer-Img/MasterCard.jpg"
import Visa from "../../assets/Footer-Img/Visa.jpg"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-950 via-green-900 to-green-950 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo Section */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <FaCouch className="text-xl" />
              <h2 className="text-2xl font-bold">FurniRent</h2>
            </div>
            <p className="text-gray-300 text-sm mt-3">
              Make your space, your way.
            </p>
            <div className="flex gap-4 mt-5">
              <FaInstagram className="cursor-pointer hover:text-green-400" />
              <FaFacebookF className="cursor-pointer hover:text-green-400" />
              <FaTwitter className="cursor-pointer hover:text-green-400" />
              <FaYoutube className="cursor-pointer hover:text-green-400" />
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm">Company</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm">Help</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>How It Works</li>
              <li>FAQs</li>
              <li>Shipping & Delivery</li>
              <li>Returns</li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm">Policies</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cancellation Policy</li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm">Categories</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Living Room</li>
              <li>Bedroom</li>
              <li>Office Furniture</li>
              <li>Storage</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            © 2024 FurniRent. All rights reserved.
          </p>

          <div className="flex gap-3 mt-4 md:mt-0">
            <img
              src={Visa}
              alt="Visa-IMG"
              className="h-8 bg-white p-1 rounded shadow w-10"
            />
            <img
              src={MasterCard}
              alt="MASTERCARD-IMG"
              className="h-8 bg-white p-1 rounded shadow w-10"
            />
            <img
              src={Upi}
              alt="UPI-IMG"
              className="h-8 bg-white p-1 rounded shadow w-10"
            />
            <img
              src={Rupay}
              alt="RUPAY-IMG"
              className="h-8 bg-white p-1 rounded shadow w-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
