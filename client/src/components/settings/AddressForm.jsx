import { useState } from "react";
import { useAddress } from "../../context/AddressContext";

const emptyForm = {
  firstName: "",
  lastName: "",
  mobile: "",
  street: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  type: "home",
};

export default function AddressForm({ onMessage }) {
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddress();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateAddress(editingId, form);
        onMessage("success", "Address updated!");
      } else {
        await addAddress(form);
        onMessage("success", "Address added!");
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      onMessage("error", "Could not save address");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (addr) => {
    setEditingId(addr._id);
    setForm({
      firstName: addr.firstName,
      lastName: addr.lastName,
      mobile: addr.mobile,
      street: addr.street,
      area: addr.area,
      landmark: addr.landmark,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      type: addr.type,
    });
  };

  const handleDelete = async (id) => {
    await deleteAddress(id);
    onMessage("success", "Address removed");
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          {editingId ? "Edit Address" : "Add New Address"}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className={inputCls}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className={inputCls}
          />
        </div>
        <input
          name="mobile"
          placeholder="Mobile (10 digits)"
          value={form.mobile}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          className={inputCls}
        />
        <input
          name="street"
          placeholder="Street"
          value={form.street}
          onChange={handleChange}
          required
          className={inputCls}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="area"
            placeholder="Area"
            value={form.area}
            onChange={handleChange}
            className={inputCls}
          />
          <input
            name="landmark"
            placeholder="Landmark"
            value={form.landmark}
            onChange={handleChange}
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className={inputCls}
          />
          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            pattern="[0-9]{6}"
            className={inputCls}
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="home">Home</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
                ? "Update Address"
                : "Add Address"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="px-5 py-2 rounded-md border"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
          Saved Addresses ({addresses.length})
        </h3>
        {addresses.length === 0 ? (
          <p className="text-gray-500 text-sm">No addresses saved yet.</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="border rounded-md p-4 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {addr.firstName} {addr.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-500">{addr.mobile}</p>
                </div>
                <div className="flex gap-2 ml-3">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
