import React, { useContext, useState } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { currency } from "../../App";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [previewimg, setPreviewImg] = useState(product.image[0]?.url);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product._id, selectedSize); // assuming your context supports size
  };

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const category = product.category;
  const tags = product.tags || ["Modern", "Latest"]; // fallback if no tags field

  return (
    <div className="flex flex-wrap justify-between gap-10 px-[5%] max-w-[1280px] mx-auto">
      {/* Left */}
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="flex flex-col gap-4">
          {product.image.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={`img-${i}`}
              onClick={() => setPreviewImg(img.url)}
              className={`h-[110px] max-w-[120px] cursor-pointer border ${
                previewimg === img.url ? "border-[#FF4141]" : "border-transparent"
              } hover:border-[#ccc] transition-all duration-200 max-[1024px]:h-[90px] max-[900px]:h-[80px] max-[500px]:h-[68px]`}
            />
          ))}
        </div>
        <div>
          <img
            src={previewimg}
            alt="main"
            className="h-[500px] max-[1024px]:h-[400px] max-[900px]:h-[350px] max-[500px]:h-[300px]"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col flex-1">
        <h1 className="text-[#3d3d3d] text-[30px] font-bold max-[500px]:text-[20px]">
          {product.name}
        </h1>

        <div className="flex items-center mt-2 gap-1 text-[#1c1c1c] text-sm">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star_icon} alt="star" />
          ))}
          <img src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>

        <div className="flex gap-5 my-6 text-[22px] font-bold max-[500px]:text-[18px] max-[500px]:my-4">
          <div className="text-[#818181] line-through">
            {currency}
            {product.old_price}
          </div>
          <div className="text-[#ff4141]">
            {currency}
            {product.new_price}
          </div>
        </div>

        <div className="text-[#333] mb-4">{product.description}</div>

        {/* Select Size */}
        <div className="mt-6">
          <h1 className="text-[#656565] text-[18px] font-semibold max-[500px]:text-[16px]">
            Select Size
          </h1>
          <div className="flex gap-4 my-4">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-4 border rounded cursor-pointer text-sm max-[500px]:text-[14px] ${
                  selectedSize === size
                    ? "bg-[#FF4141] text-white border-[#FF4141]"
                    : "bg-[#fbfbfb] border-[#ebebeb] hover:border-[#ccc]"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-10 py-5 w-[200px] bg-[#FF4141] text-white text-[16px] font-semibold mb-6 rounded cursor-pointer"
        >
          ADD TO CART
        </button>

        <p className="mt-2">
          <span className="font-semibold">Category :</span> {category}
        </p>
        <p>
          <span className="font-semibold">Tags :</span> {tags.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
