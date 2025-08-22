import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { currency } from "../../App";

const CheckoutPage = () => {
  const { cartItems, products, getTotalCartAmount,ClearCart } = useContext(ShopContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    const amount = getTotalCartAmount();
    const res = await fetch("http://localhost:4000/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Velamore",
      description: "Order Payment",
      order_id: data.id,
      handler: async function (response) {
        // ✅ Save order in DB (optional)
        await fetch("http://localhost:4000/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            cartItems,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          }),
        });

       ClearCart();
        navigate("/order-success");
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#ff5a5a" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shipping Details</h1>
      <input name="name" placeholder="Name" onChange={handleInputChange} className="mb-3 w-full p-2 border" />
      <input name="email" placeholder="Email" onChange={handleInputChange} className="mb-3 w-full p-2 border" />
      <input name="phone" placeholder="Phone" onChange={handleInputChange} className="mb-3 w-full p-2 border" />
      <textarea name="address" placeholder="Address" onChange={handleInputChange} className="mb-6 w-full p-2 border" />

      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="mb-6">
        {Object.entries(cartItems).map(([key, qty]) => {
          const [id] = key.split("_");
          const item = products.find((p) => p._id === id);
          if (!item || qty <= 0) return null;
          return (
            <p key={key}>
              {item.name} x {qty} = {currency}
              {item.new_price * qty}
            </p>
          );
        })}
        <p className="mt-4 font-bold">
          Total: {currency}
          {getTotalCartAmount()}
        </p>
      </div>

      <button
      
        className="bg-[#ff5a5a] text-white px-6 py-2 rounded"
        onClick={handlePay}
        disabled={!form.name || !form.email || !form.phone || !form.address}
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
