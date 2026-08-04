import React, { useState } from "react";
import { useAddress } from "../context/AddressContext";

const AddressPage = () => {
  const {
    addresses,
    setSelectedAddress,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useAddress();
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateAddress(editId, form);
      setEditId(null);
    } else {
      await addAddress(form);
    }
    setForm({});
  };

  const handleDelete = async (id) => {
    await deleteAddress(id);
  };

  const startEdit = (addr) => {
    setForm(addr);
    setEditId(addr._id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Addresses</h1>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-lg text-gray-900">
                {addr.firstName} {addr.lastName}{" "}
                <span className="text-sm text-gray-500">({addr.type})</span>
              </p>
              <p className="text-gray-700">
                {addr.street}, {addr.area}, {addr.landmark}, {addr.city},{" "}
                {addr.state}, {addr.country} - {addr.pincode}
              </p>
              <p className="text-gray-600">
                Floor: {addr.floor} | Lift: {addr.hasLift ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                Instructions: {addr.deliveryInstructions}
              </p>
              <p className="text-gray-600">Phone: {addr.mobile}</p>
              {addr.isDefault && (
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  Default
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(addr)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(addr._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedAddress(addr)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
              >
                Deliver Here
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mt-8 space-y-4 border border-gray-200"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded w-full"
            name="firstName"
            placeholder="First Name"
            value={form.firstName || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="mobile"
            placeholder="Mobile (10 digits)"
            value={form.mobile || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="street"
            placeholder="Street"
            value={form.street || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="area"
            placeholder="Area"
            value={form.area || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="landmark"
            placeholder="Landmark"
            value={form.landmark || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="city"
            placeholder="City"
            value={form.city || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="state"
            placeholder="State"
            value={form.state || ""}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="country"
            placeholder="Country"
            value={form.country || "India"}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded w-full"
            name="pincode"
            placeholder="Pincode (6 digits)"
            value={form.pincode || ""}
            onChange={handleChange}
          />
        </div>

        <select
          className="border p-2 rounded w-full"
          name="type"
          value={form.type || "home"}
          onChange={handleChange}
        >
          <option value="home">Home</option>
          <option value="office">Office</option>
        </select>

        <input
          className="border p-2 rounded w-full"
          name="floor"
          placeholder="Floor"
          value={form.floor || ""}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            name="hasLift"
            checked={form.hasLift || false}
            onChange={handleChange}
          />
          Has Lift
        </label>

        <textarea
          className="border p-2 rounded w-full"
          name="deliveryInstructions"
          placeholder="Delivery Instructions"
          value={form.deliveryInstructions || ""}
          onChange={handleChange}
        ></textarea>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault || false}
            onChange={handleChange}
          />
          Make Default
        </label>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          {editId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
