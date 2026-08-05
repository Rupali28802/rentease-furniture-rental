import { useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  FaHandshake,
  FaStore,
  FaRupeeSign,
  FaUsers,
  FaTruck,
  FaPaperPlane,
} from "react-icons/fa";

const Partner = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    businessName: "",
    ownerName: user?.name || "",
    email: user?.email || "",
    phone: "",
    businessType: "",
    city: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await api.post("/partner/apply", form);
      setSuccess(
        "Your application has been submitted. Our team will contact you soon!",
      );
      setForm({
        ...form,
        businessName: "",
        phone: "",
        businessType: "",
        city: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <FaRupeeSign />,
      title: "Earn More",
      desc: "List your furniture on our platform and earn reliable monthly income.",
    },
    {
      icon: <FaUsers />,
      title: "More Customers",
      desc: "Reach thousands of customers looking for quality furniture rentals.",
    },
    {
      icon: <FaTruck />,
      title: "Easy Logistics",
      desc: "We handle delivery, pickup, and maintenance. You focus on your business.",
    },
    {
      icon: <FaStore />,
      title: "Brand Growth",
      desc: "Grow your brand with our marketing and customer support.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-4">
          <FaHandshake size={30} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Become a Partner
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Partner with RentEase and turn your furniture into a steady source of
          income.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border shadow-sm p-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mb-3">
              {b.icon}
            </div>
            <h3 className="font-semibold text-gray-800">{b.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Application form */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Partner Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Business Type
              </label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Select type</option>
                <option value="furniture_store">Furniture Store</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="rental_business">Rental Business</option>
                <option value="individual">Individual Owner</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your business..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {success && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
              {success}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition disabled:opacity-50"
          >
            <FaPaperPlane />
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Partner;
