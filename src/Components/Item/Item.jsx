import React from 'react';
import { Link } from 'react-router-dom';
import { currency } from '../../App';

const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-transform hover:scale-105 duration-300">
      <Link to={`/product/${id}`}>
        <div className="w-full aspect-[4/5] bg-gray-100">
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={image}
            alt={name}
            className="w-full h-full object-cover p-2"
          />
        </div>
      </Link>

      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
        <div className="flex gap-2 items-center mt-1">
          <span className="text-[15px] font-semibold text-black">
            {currency}{new_price}
          </span>
          <span className="line-through text-gray-400 text-[13px]">
            {currency}{old_price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Item;
