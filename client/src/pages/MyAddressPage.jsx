import React, { useState, useEffect } from "react";
import { api } from "../api/axios";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  // Fetch addresses on load
  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await api.get("/address");
      setAddresses(res.data.addresses);
    };
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const res = await api.put(`/address/${editId}`, form);
      setAddresses(res.data.addresses);
      setEditId(null);
    } else {
      const res = await api.post("/address", form);
      setAddresses(res.data.addresses);
    }
    setForm({});
  };

  const handleDelete = async (id) => {
    const res = await api.delete(`/address/${id}`);
    setAddresses(res.data.addresses);
  };

  const startEdit = (addr) => {
    setForm(addr);
    setEditId(addr._id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Addresses</h1>

      {/* Address List */}
      {addresses.map((addr) => (
        <div
          key={addr._id}
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between"
        >
          <div>
            <p className="font-semibold">
              {addr.firstName} {addr.lastName}
            </p>
            <p>
              {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p>Phone: {addr.mobile}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => startEdit(addr)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(addr._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mt-6 space-y-4"
      >
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName || ""}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName || ""}
          onChange={handleChange}
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile || ""}
          onChange={handleChange}
        />
        <input
          name="street"
          placeholder="Street"
          value={form.street || ""}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={form.city || ""}
          onChange={handleChange}
        />
        <input
          name="state"
          placeholder="State"
          value={form.state || ""}
          onChange={handleChange}
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode || ""}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
