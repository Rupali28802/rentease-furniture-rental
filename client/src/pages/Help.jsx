import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaHeadset,
  FaPaperPlane,
} from "react-icons/fa";

const Help = () => {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [contact, setContact] = useState({
    email: "support@rentease.com",
    phone: "+91 98765 43210",
    hours: "Mon - Sat, 9:00 AM - 7:00 PM",
  });
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const res = await api.get("/help");
        setFaqs(res.data.faqs || []);
        if (res.data.contact) setContact(res.data.contact);
      } catch (err) {
        console.error("Error fetching help content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHelp();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await api.post("/help/contact", form);
      setSuccess(
        "Your query has been submitted. We will get back to you soon!",
      );
      setForm({ ...form, subject: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-4">
          <FaHeadset size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Help &amp; Support
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Find answers to common questions or reach out to our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: FAQ */}
        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>

          {loading ? (
            <p className="text-gray-500 py-8 text-center">Loading FAQs...</p>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <span className="font-medium text-gray-800">{faq.q}</span>
                    <FaChevronDown
                      className={`text-gray-500 transition-transform ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === idx && (
                    <div className="px-4 py-3 text-gray-600 text-sm bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Contact form + info */}
        <div className="space-y-6">
          {/* Contact info */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-green-600" /> {contact.email}
              </p>
              <p className="flex items-center gap-3">
                <FaPhone className="text-green-600" /> {contact.phone}
              </p>
              <p className="flex items-center gap-3">
                <FaClock className="text-green-600" /> {contact.hours}
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Send a Query
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
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
                <label className="block text-sm text-gray-600 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="4"
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
                {submitting ? "Submitting..." : "Submit Query"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
