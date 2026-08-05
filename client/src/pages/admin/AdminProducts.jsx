import { useEffect, useState, useMemo } from "react";
import { api } from "../../api/axios";
import Table from "../../components/admin/Table";
import Card from "../../components/admin/Card";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationCircle,
  FaClipboardList,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaStar,
  FaTruck,
  FaChartBar,
} from "react-icons/fa";

const CATEGORIES = [
  "sofa",
  "beds",
  "appliances",
  "dining",
  "office",
  "storage",
  "home-decor",
  "kids-room",
  "outdoor",
  "event-furniture",
  "kitchen",
  "fitness",
  "electronics",
  "lighting",
  "garden-patio",
  "pet-furniture",
  "offers",
];

const CONDITIONS = ["new", "good", "used", "needs repair"];
const TENURES = [1, 3, 6, 12];

const emptyForm = {
  name: "",
  category: "sofa",
  description: "",
  pricePerMonth: "",
  deposit: "",
  stock: 1,
  brand: "",
  condition: "good",
  tenureOptions: [1, 3, 6],
  deliveryCharge: 0,
  warranty: "",
  returnPolicy: "",
  featured: false,
  isAvailable: true,
  isHidden: false,
  isNewArrival: false,
  image: "",
  gallery: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dashboard counts
  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    outOfStock: 0,
    rented: 0,
  });

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [availability, setAvailability] = useState("");

  // Modal
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // View modal
  const [viewing, setViewing] = useState(null);

  // Analytics
  const [analytics, setAnalytics] = useState({
    mostRentedProducts: [],
    topCategories: [],
    revenuePerProduct: [],
  });

  const load = async () => {
    const res = await api.get("/admin/products");
    const prods = res.data.products;
    setProducts(prods);
    setCounts({
      total: prods.length,
      active: prods.filter((p) => p.isAvailable && !p.isHidden).length,
      outOfStock: prods.filter((p) => p.stock <= 0).length,
      rented: prods.reduce((a, p) => a + (p.currentlyRented || 0), 0),
    });
  };

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/admin/products/analytics");
      setAnalytics(res.data);
    } catch (e) {
      console.error("Analytics load failed", e);
    }
  };

  useEffect(() => {
    Promise.all([load(), loadAnalytics()]).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered list
  const filtered = useMemo(() => {
    let list = products;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q),
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (status === "active")
      list = list.filter((p) => p.isAvailable && !p.isHidden);
    if (status === "inactive")
      list = list.filter((p) => !p.isAvailable || p.isHidden);
    if (status === "featured") list = list.filter((p) => p.featured);
    if (status === "hidden") list = list.filter((p) => p.isHidden);
    if (availability === "in-stock") list = list.filter((p) => p.stock > 0);
    if (availability === "out-of-stock")
      list = list.filter((p) => p.stock <= 0);
    if (availability === "low-stock")
      list = list.filter((p) => p.stock > 0 && p.stock <= 5);
    return list;
  }, [products, search, category, status, availability]);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || "",
      category: p.category || "sofa",
      description: p.description || "",
      pricePerMonth: p.pricePerMonth || "",
      deposit: p.deposit || "",
      stock: p.stock ?? 1,
      brand: p.brand || "",
      condition: p.condition || "good",
      tenureOptions: p.tenureOptions?.length ? p.tenureOptions : [1, 3, 6],
      deliveryCharge: p.deliveryCharge || 0,
      warranty: p.warranty || "",
      returnPolicy: p.returnPolicy || "",
      featured: p.featured || false,
      isAvailable: p.isAvailable ?? true,
      isHidden: p.isHidden || false,
      isNewArrival: p.isNewArrival || false,
      image: p.image || "",
      gallery: p.gallery?.join(", ") || "",
    });
    setShowForm(true);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        pricePerMonth: Number(form.pricePerMonth),
        deposit: Number(form.deposit),
        stock: Number(form.stock),
        deliveryCharge: Number(form.deliveryCharge),
        tenureOptions: Array.isArray(form.tenureOptions)
          ? form.tenureOptions.map(Number)
          : [Number(form.tenureOptions)],
        gallery: form.gallery
          ? form.gallery
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      };
      // slug
      payload.slug =
        form.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || undefined;

      if (editing) {
        await api.put(`/admin/products/${editing._id}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }
      alert(editing ? "Product updated" : "Product created");
      setShowForm(false);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (p) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    try {
      await api.delete(`/admin/products/${p._id}`);
      alert("Product deleted");
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const adjustStock = async (p, action) => {
    try {
      await api.put(`/admin/products/${p._id}/stock`, { action, amount: 1 });
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Stock update failed");
    }
  };

  const toggleStatus = async (p, field) => {
    try {
      await api.put(`/admin/products/${p._id}`, { [field]: !p[field] });
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const statusBadge = (p) => {
    if (p.isHidden) return "text-gray-500 bg-gray-100";
    if (!p.isAvailable || p.stock <= 0) return "text-red-600 bg-red-100";
    if (p.featured) return "text-purple-600 bg-purple-100";
    return "text-green-600 bg-green-100";
  };

  const statusLabel = (p) => {
    if (p.isHidden) return "Hidden";
    if (!p.isAvailable || p.stock <= 0) return "Inactive";
    if (p.featured) return "Featured";
    return "Active";
  };

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Product Management
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Dashboard cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Products"
          value={counts.total}
          icon={<FaBoxOpen />}
          color="text-blue-600"
          iconBg="bg-blue-100 dark:bg-blue-900/40"
        />
        <Card
          title="Active Products"
          value={counts.active}
          icon={<FaCheckCircle />}
          color="text-green-600"
          iconBg="bg-green-100 dark:bg-green-900/40"
        />
        <Card
          title="Out of Stock"
          value={counts.outOfStock}
          icon={<FaExclamationCircle />}
          color="text-red-600"
          iconBg="bg-red-100 dark:bg-red-900/40"
        />
        <Card
          title="Currently Rented"
          value={counts.rented}
          icon={<FaClipboardList />}
          color="text-amber-600"
          iconBg="bg-amber-100 dark:bg-amber-900/40"
        />
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or brand..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="featured">Featured</option>
            <option value="hidden">Hidden</option>
          </select>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
          >
            <option value="">All Availability</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="low-stock">Low Stock (&le;5)</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Product List ({filtered.length})
          </h3>
        </div>
        <Table
          headers={[
            "Image",
            "Name",
            "Category",
            "Rent/M",
            "Stock",
            "Rented",
            "Status",
            "Actions",
          ]}
        >
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            filtered.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                      No img
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {p.name}
                  </p>
                  {p.brand && (
                    <p className="text-xs text-gray-400">{p.brand}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.category}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  ₹{p.pricePerMonth?.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {p.currentlyRented || 0}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${statusBadge(p)}`}
                  >
                    {statusLabel(p)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5 flex-wrap">
                    <button
                      onClick={() => setViewing(p)}
                      title="View"
                      className="p-1.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openEdit(p)}
                      title="Edit"
                      className="p-1.5 rounded bg-amber-100 text-amber-700 hover:bg-amber-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteProduct(p)}
                      title="Delete"
                      className="p-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => adjustStock(p, "increase")}
                      title="+1 stock"
                      className="px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs font-bold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => adjustStock(p, "decrease")}
                      title="-1 stock"
                      className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold"
                    >
                      −
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <FaChartBar className="text-green-600" /> Most Rented Products
          </h3>
          {analytics.mostRentedProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No rental data yet</p>
          ) : (
            <ul className="space-y-2">
              {analytics.mostRentedProducts.slice(0, 5).map((p) => (
                <li
                  key={p._id}
                  className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2"
                >
                  <span className="text-gray-700 dark:text-gray-300 truncate pr-2">
                    {p.name}
                  </span>
                  <span className="text-gray-500">{p.rentalCount} rentals</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
            Top Categories
          </h3>
          {analytics.topCategories.length === 0 ? (
            <p className="text-sm text-gray-500">No category data yet</p>
          ) : (
            <ul className="space-y-2">
              {analytics.topCategories.slice(0, 5).map((c) => (
                <li
                  key={c.category}
                  className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2"
                >
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {c.category}
                  </span>
                  <span className="text-green-600">
                    ₹{c.revenue.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
            Revenue per Product
          </h3>
          {analytics.revenuePerProduct.length === 0 ? (
            <p className="text-sm text-gray-500">No revenue data yet</p>
          ) : (
            <ul className="space-y-2">
              {analytics.revenuePerProduct.slice(0, 5).map((p) => (
                <li
                  key={p._id}
                  className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2"
                >
                  <span className="text-gray-700 dark:text-gray-300 truncate pr-2">
                    {p.name}
                  </span>
                  <span className="text-green-600">
                    ₹{p.revenue.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editing ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={saveProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Product Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.pricePerMonth}
                    onChange={(e) => setField("pricePerMonth", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Security Deposit (₹) *
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.deposit}
                    onChange={(e) => setField("deposit", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setField("stock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Brand
                  </label>
                  <input
                    value={form.brand}
                    onChange={(e) => setField("brand", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Condition
                  </label>
                  <select
                    value={form.condition}
                    onChange={(e) => setField("condition", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Delivery Charge (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.deliveryCharge}
                    onChange={(e) => setField("deliveryCharge", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Warranty
                  </label>
                  <input
                    value={form.warranty}
                    onChange={(e) => setField("warranty", e.target.value)}
                    placeholder="e.g. 6 months warranty"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Return Policy
                  </label>
                  <input
                    value={form.returnPolicy}
                    onChange={(e) => setField("returnPolicy", e.target.value)}
                    placeholder="e.g. 7-day return"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    value={form.image}
                    onChange={(e) => setField("image", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Gallery (comma-separated URLs)
                  </label>
                  <textarea
                    value={form.gallery}
                    onChange={(e) => setField("gallery", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Available Tenures
                </label>
                <div className="flex gap-2 flex-wrap">
                  {TENURES.map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={form.tenureOptions.includes(t)}
                        onChange={(e) => {
                          const opts = e.target.checked
                            ? [...form.tenureOptions, t]
                            : form.tenureOptions.filter((x) => x !== t);
                          setField("tenureOptions", opts);
                        }}
                      />
                      {t} mo
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setField("featured", e.target.checked)}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setField("isAvailable", e.target.checked)}
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.isHidden}
                    onChange={(e) => setField("isHidden", e.target.checked)}
                  />
                  Hidden
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.isNewArrival}
                    onChange={(e) => setField("isNewArrival", e.target.checked)}
                  />
                  New Arrival
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium disabled:opacity-50"
                >
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {viewing.name}
              </h3>
              <button
                onClick={() => setViewing(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              {viewing.image && (
                <img
                  src={viewing.image}
                  alt={viewing.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              )}
              <div className="space-y-1 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Category:</strong> {viewing.category}
                </p>
                {viewing.brand && (
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Brand:</strong> {viewing.brand}
                  </p>
                )}
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Rent:</strong> ₹
                  {viewing.pricePerMonth?.toLocaleString()}/mo
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Deposit:</strong> ₹{viewing.deposit?.toLocaleString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Stock:</strong> {viewing.stock}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Rented:</strong> {viewing.currentlyRented || 0}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Condition:</strong> {viewing.condition}
                </p>
                <p className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <strong>Rating:</strong>{" "}
                  <FaStar className="text-yellow-500" />
                  {viewing.averageRating || 0}
                </p>
              </div>
            </div>

            {viewing.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {viewing.description}
              </p>
            )}

            {viewing.warranty && (
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-1">
                <FaTruck /> Warranty: {viewing.warranty}
              </p>
            )}
            {viewing.returnPolicy && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Return Policy: {viewing.returnPolicy}
              </p>
            )}

            <div className="flex gap-2 flex-wrap">
              {viewing.gallery?.map((g, i) => (
                <img
                  key={i}
                  src={g}
                  alt=""
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
