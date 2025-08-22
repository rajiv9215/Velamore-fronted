import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Item from "../Item/Item";
import { backend_url } from "../../App";

const RelatedProducts = ({ category, _id }) => {
  const [related, setRelated] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${backend_url}/relatedproducts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    })
      .then((res) => res.json())
      .then((data) => setRelated(data));
  }, [category]);

  const scroll = (direction) => {
    const scrollAmount = window.innerWidth < 768 ? 200 : 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-[1400px] px-4 mx-auto pb-20">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[#171717] text-[40px] font-semibold max-sm:text-[30px]">
          Related Products
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {related
          .filter((item) => _id !== item._id)
          .map((item, index) => (
            <div key={index} className="min-w-[220px] sm:min-w-[240px] max-w-[250px] flex-shrink-0">
              <Item
                id={item._id}
                name={item.name}
                image={item.image[0].url}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          ))}
      </div>

      {/* Tailwind to hide scrollbar (scrollbar-hide plugin or manual fallback) */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default RelatedProducts;
