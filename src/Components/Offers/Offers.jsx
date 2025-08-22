import React from "react";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="w-[90%] max-w-6xl mx-auto my-[100px] mb-[150px] md:mb-[50px] flex flex-wrap items-center justify-between px-[8%] bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] py-12 max-[800px]:px-[8%] max-[800px]:py-[50px]">
      <div className="flex flex-col gap-2 max-w-xl">
        <h1 className="text-[#171717] text-[60px] font-semibold max-[1280px]:text-[40px]">
          Exclusive
        </h1>
        <h1 className="text-[#171717] text-[60px] font-semibold max-[1280px]:text-[40px]">
          Offers For You
        </h1>
        <p className="text-[#171717] text-[16px] font-semibold max-[1280px]:text-[14px]">
          ONLY ON BEST SELLERS PRODUCTS
        </p>
        <button className="w-[200px] h-[50px] rounded-[35px] bg-[#ff4141] text-white text-[16px] font-medium mt-[30px] max-[1280px]:mt-[25px] max-[1280px]:text-[18px]">
          Check now
        </button>
      </div>
      <div className="max-[800px]:hidden pt-5">
        <img
          src={exclusive_image}
          alt="exclusive offer"
          className="w-[320px] max-[1280px]:w-[300px] max-[1024px]:w-[200px]"
        />
      </div>
    </div>
  );
};

export default Offers;
