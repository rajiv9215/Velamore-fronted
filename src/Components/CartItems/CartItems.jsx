import React, { useContext } from "react";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { currency } from "../../App";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
 const navigate = useNavigate();
  const renderCartRows = () => {
    const rows = [];

    Object.entries(cartItems).forEach(([key, quantity]) => {
      if (quantity <= 0) return;

      const [itemId, size = null] = key.split("_");
      const product = products.find((p) => p._id === itemId);

      if (!product) return;

      rows.push(
        <div key={key}>
          <div className="grid sm:grid-cols-6 grid-cols-3 items-center gap-6 py-4 text-sm font-medium">
            <img
              className="h-14"
              src={product.image[0]?.url}
              alt={product.name}
            />
            <div className="flex flex-col sm:col-auto col-span-1">
              <p>{product.name}</p>
              {size && (
                <span className="text-gray-500 text-xs">Size: {size}</span>
              )}
            </div>
            <p className="hidden sm:block">
              {currency}
              {product.new_price}
            </p>
            <button className="w-14 h-11 border-2 border-gray-200 bg-white">
              {quantity}
            </button>
            <p className="hidden sm:block">
              {currency}
              {product.new_price * quantity}
            </p>
            <img
              onClick={() => removeFromCart(itemId, size)}
              className="w-3 sm:mx-6 mx-auto cursor-pointer"
              src={cross_icon}
              alt="remove"
            />
          </div>
          <hr className="h-[2px] bg-gray-200 border-0" />
        </div>
      );
    });

    return rows.length > 0 ? (
      rows
    ) : (
      <div className="text-center py-12 text-gray-600 text-lg font-medium">
        Your cart is empty 🛒
      </div>
    );
  };

  return (
    <div className="my-24 mx-[10%] md:mx-[8%]">
      <div className="hidden sm:grid grid-cols-6 items-center gap-12 py-5 text-gray-700 text-base font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="h-[2px] bg-gray-200 border-0" />

      {renderCartRows()}

      {/* Cart Totals */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 my-24">
        <div className="flex flex-col gap-10 min-w-[300px] lg:mr-52">
          <h1 className="text-2xl font-bold">Cart Totals</h1>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between py-3">
              <p>Subtotal</p>
              <p>
                {currency}
                {getTotalCartAmount()}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-3">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between py-3 text-lg font-semibold">
              <h3>Total</h3>
              <h3>
                {currency}
                {getTotalCartAmount()}
              </h3>
            </div>
          </div>
          <button
          onClick={() => navigate("/checkout")}
            className="w-56 h-12 bg-[#ff5a5a] text-white text-sm font-semibold disabled:opacity-50"
            // disabled={getTotalCartAmount() === 0}
            disabled={getTotalCartAmount() < 0.01}
           
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="flex-1 text-base font-medium">
          <p className="text-gray-600">
            If you have a promo code, enter it here
          </p>
          <div className="flex items-center justify-between w-full max-w-[500px] mt-4 h-12 bg-[#eaeaea]">
            <input
              type="text"
              placeholder="promo code"
              className="flex-1 h-full bg-transparent pl-4 outline-none border-none text-sm"
            />
            <button className="w-32 h-full bg-black text-white text-sm">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
