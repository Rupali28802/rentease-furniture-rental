const categories = [
  {
    name: "Sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1470&auto=format&fit=crop",
  },

  {
    name: "Beds",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop",
  },

  {
    name: "Appliances",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=1470&auto=format&fit=crop",
  },

  {
    name: "Dining",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop",
  },

  {
    name: "Office",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop",
  },

  {
    name: "Storage",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop",
  },
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shop by Category</h2>

        <button className="text-green-700 font-medium">View All</button>
      </div>

      {/* GRID */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div className="h-32 overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <h3 className="text-center mt-4 font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
