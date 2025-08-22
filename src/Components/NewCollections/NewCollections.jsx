import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Item from '../Item/Item';

const NewCollections = ({ data }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 300;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-28 mb-16">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h2 className="text-[#171717] text-[24px] sm:text-[30px] font-semibold">NEW COLLECTIONS</h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="bg-white rounded-full shadow p-2"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-white rounded-full shadow p-2"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {data.map((item, index) => (
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
      </div>
    </div>
  );
};

export default NewCollections;
