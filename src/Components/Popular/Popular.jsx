import React, { useRef } from "react";
import Item from "../Item/Item";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Popular = ({ data }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-28 mb-16">
      {/* Heading and Arrows */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h2 className="text-[#171717] text-[28px] sm:text-[36px] font-semibold">
          POPULAR IN OVERSIZED T-SHIRTS
        </h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-2 no-scrollbar"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-[220px] sm:min-w-[240px] max-w-[250px] flex-shrink-0"
            >
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
      </div>
    </div>
  );
};

export default Popular;
