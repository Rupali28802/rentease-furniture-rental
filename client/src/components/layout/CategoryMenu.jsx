const CategoryMenu = ({ categories }) => {
  return (
    <div className="hidden lg:flex items-center gap-10 mt-5 text-base font-medium text-gray-700 overflow-x-auto">
      <button className="bg-green-700 text-white px-5 py-2 rounded-lg whitespace-nowrap">
        All Categories
      </button>

      {categories.map((item, index) => (
        <p
          key={index}
          className="cursor-pointer hover:text-green-700 whitespace-nowrap"
        >
          {item}
        </p>
      ))}

      <p className="cursor-pointer text-red-500 whitespace-nowrap">Offers</p>
    </div>
  );
};

export default CategoryMenu;
