import React from "react";
import hero_image from "../Assets/hero_image.png";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-evenly lg:min-h-[75vh]  bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] px-6 sm:px-10 md:px-[9%] py-8 gap-10  ">
      
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-[#090909] text-base sm:text-lg mb-3">NEW ARRIVALS ONLY</h2>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-5">
            <p className="text-[#171717] text-[32px] sm:text-[40px] md:text-[40px] lg:text-[70px] font-bold leading-tight">
              new
            </p>
            <img src={hand_icon} alt="hand" className="w-[40px] sm:w-[50px] md:w-[60px] lg:w-[70px]" />
          </div>
          <p className="text-[#171717] text-[32px] sm:text-[40px] md:text-[40px] lg:text-[70px] font-bold leading-tight">
            collections
          </p>
          <p className="text-[#171717] text-[32px] sm:text-[40px] md:text-[40px] lg:text-[70px] font-bold leading-tight">
            for everyone
          </p>
        </div>

        {/* CTA BUTTON */}
        <div className="mt-6 sm:mt-8 w-fit mx-auto md:mx-0">
          <button className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-3.5 bg-[#ff4141] text-white rounded-full text-sm sm:text-base font-medium hover:scale-105 transition-transform">
            Latest Collection
            <img src={arrow_icon} alt="arrow" className="w-4 sm:w-5" />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end ">
        <img
          src={hero_image}
          alt="hero"
          className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[650px] object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
