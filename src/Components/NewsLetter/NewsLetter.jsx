import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubscribed(true);
        setEmail(""); // Clear input
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Failed to subscribe.");
    }
  };

  return (
    <div className="w-[90%] max-w-[1200px] mx-auto mb-[100px] px-[8%] py-[50px] bg-[linear-gradient(180deg,_#fde1ff_0%,_#e1ffea22_60%)] flex flex-col items-center justify-center gap-5 max-[900px]:gap-2 max-[500px]:px-[5%]">
      <h1 className="text-[#454545] text-[45px] font-semibold max-[1280px]:text-[35px] max-[900px]:text-[30px]">Get Exclusive Offers On Your Email</h1>
      <p className="text-[#454545] text-[18px]">Subscribe to our newsletter and stay updated.</p>
      <div className="flex items-center justify-between bg-white w-[95%] max-w-[650px] h-[60px] rounded-[80px] border border-[#e3e3e3] mt-2 max-[900px]:h-[50px] max-[500px]:w-full">
        <input
          type="email"
          placeholder="Your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 pl-[30px] text-[#616161] text-[16px] font-[Poppins] outline-none border-none max-[900px]:pl-[20px]"
        />
        <button
          onClick={handleSubscribe}
          className="w-[180px] h-full rounded-[80px] bg-black text-white text-[16px] cursor-pointer max-[900px]:w-[100px] max-[900px]:rounded-[25px] max-[900px]:text-[14px] max-[500px]:text-[12px]"
        >
          Subscribe
        </button>
      </div>
      {subscribed && (
        <p className="text-green-600 text-sm mt-2">Thanks for subscribing! Check your email 📩</p>
      )}
    </div>
  );
};

export default NewsLetter;
