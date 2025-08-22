import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/order/myorders", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setOrders(data.orders);
      } else {
        alert("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading your orders...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium text-lg text-gray-800">{order.orderId}</p>
              </div>
              <div className="mt-4 md:mt-0 text-sm text-gray-600">
                <p><span className="font-medium">Placed on:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">{order.status}</span></p>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {order.cartItems.map((item) => (
                <div
                  key={item._id + item.variant}
                  className="flex items-start gap-4 border rounded-xl p-4 bg-gray-50"
                >
                {console.log(item)}
                  <img
                    src={item?.image?.url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-md">{item.name}</p>
                    <p className="text-gray-500 text-sm">Variant: {item.variant}</p>
                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Details */}
            <div className="mt-6 text-sm text-gray-600">
              <p><span className="font-medium">Name:</span> {order.name}</p>
              <p><span className="font-medium">Phone:</span> {order.phone}</p>
              <p><span className="font-medium">Email:</span> {order.email}</p>
              <p><span className="font-medium">Shipping Address:</span> {order.address}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
