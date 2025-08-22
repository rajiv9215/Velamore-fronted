import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";
import api from "../utils/api";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // ⏳ Load products and cart on first render
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backend_url}/allproducts`);
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("❌ Error loading products:", err.message);
    }
  };

  fetchProducts();

  if (localStorage.getItem("auth-token")) {
    syncCartFromServer();
  }
},[]);



  // 🧠 Create unique key using product ID and size
  const getKey = (itemId, size) => (size ? `${itemId}_${size}` : itemId);

  // ➕ Add to cart
  const addToCart = async (itemId, size = null) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please login first.");
      return;
    }

    const key = getKey(itemId, size);

    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

    try {
      await api.post("/addtocart", { itemId, size });
      await syncCartFromServer();
    } catch (err) {
      console.error("❌ Error adding to cart:", err.response?.data || err.message);
    }
  };

  // ➖ Remove from cart
  const removeFromCart = async (itemId, size = null) => {
    // const key = getKey(itemId, size);
    console.log("🔽 Removing from cart:", { itemId, size });

    try {
      await api.post("/removefromcart", { itemId, size });
      await syncCartFromServer();
    } catch (err) {
      console.error("❌ Error removing from cart:", err.response?.data || err.message);
    }
  };

  // 🔄 Sync cart from backend
  const syncCartFromServer = async () => {
    try {
      const res = await api.post("/getcart");
      const cartData = res.data.cart?.items || [];

      const updatedCart = {};
      cartData.forEach((item) => {
        const key = getKey(item.itemId, item.size);
        updatedCart[key] = item.quantity;
      });

      setCartItems(updatedCart);
    } catch (err) {
      console.error("❌ Failed to sync cart:", err.message);
    }
  };

  // 💰 Calculate total amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      const [itemId] = key.split("_");
      const product = products.find((p) => p._id === itemId);
      if (product) {
        total += product.new_price * cartItems[key];
      }
    }
    return total;
  };

  // 🧮 Count total cart items
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  // Context/ShopContext.js
const ClearCart = () => {
  setCartItems({}); // or whatever resets your cart
  localStorage.removeItem("cartItems");
}


  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    ClearCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
