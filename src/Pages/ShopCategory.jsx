import React, { useEffect, useState } from "react";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import LoadingSkeleton from "../Components/skeleton/LoadingSkeleton";

const ShopCategory = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [sortOption, setSortOption] = useState("");
   const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchInfo = () => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
      setLoading(false)
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Filter + sort products
  const getFilteredProducts = () => {
    let filtered = allProducts.filter((item) => item.category === props.category);

    if (sortOption === "price-low-to-high") {
      filtered.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOption === "price-high-to-low") {
      filtered.sort((a, b) => b.new_price - a.new_price);
    } else if (sortOption === "name-a-z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-z-a") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered.slice(0, visibleProducts);
  };

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <img
        src={props.banner}
        alt=""
        className="block w-[80%] mx-auto my-8 max-w-full sm:w-[90%] sm:my-5"
      />

      {/* Top section with sort and count */}
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 text-sm flex-wrap gap-3">
        <p>
          <span className="font-semibold">Showing 1 - {getFilteredProducts().length}</span> products
        </p>
        <div className="flex items-center gap-2 border border-gray-500 rounded-full px-4 py-1">
          <label htmlFor="sort" className="text-sm text-gray-700">Sort by</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="outline-none bg-transparent text-sm text-gray-800"
          >
            <option value="">Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="name-a-z">Name: A-Z</option>
            <option value="name-z-a">Name: Z-A</option>
          </select>
          <img src={dropdown_icon} alt="dropdown" className="w-3" />
        </div>
      </div>

      {/* Product grid */}
      <div className="w-[90%] max-w-[1360px] mx-auto mt-8 flex flex-wrap justify-center gap-6">
        {loading
          ? Array(12).fill(0).map((_, i) => <LoadingSkeleton key={i} />)
          : getFilteredProducts().map((item, i) => (
          <div key={i} className="w-[200px] sm:w-[48%] md:w-[30%] lg:w-[23%]">
            <Item
              id={item._id}
              name={item.name}
              image={item.image?.[0]?.url || ""} // ✅ Ensure image shows correctly
              new_price={item.new_price}
              old_price={item.old_price}
            />
          </div>
        ))}
      </div>

      {/* Load More button */}
      {getFilteredProducts().length < allProducts.filter(p => p.category === props.category).length && (
        <div
          onClick={loadMore}
          className="flex justify-center items-center w-[200px] h-[60px] mx-auto mt-16 mb-12 rounded-full bg-[#ededed] text-[#787878] text-base font-medium cursor-pointer sm:w-[150px] sm:h-[40px] sm:text-sm"
        >
          Load More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
