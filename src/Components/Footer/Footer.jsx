import React from "react";
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintrest_icon from "../Assets/pintrest_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-6 pt-5 bg-white text-[#252525]">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img
          src={footer_logo}
          alt="Velamore logo"
          className="w-[50px]"
          loading="lazy"
        />
        <p className="text-2xl font-bold text-[#383838]">Velamore</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-10 text-base sm:text-sm" aria-label="Footer Navigation">
        <a href="/products" title="Products">Products</a>
        <a href="/offices" title="Offices">Offices</a>
        <a href="/about-us" title="About Velamore">About</a>
        <a href="/contact" title="Contact Us">Contact</a>
         <a href="/myorders" title="Company">My Orders</a>
      </nav>

      {/* Social Icons */}
      <div className="flex gap-3">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Instagram"
          className="p-2 pb-1.5 bg-[#fbfbfb] border border-[#ebebeb] rounded"
        >
          <img
            src={instagram_icon}
            alt="Instagram icon"
            className="w-[25px]"
            loading="lazy"
          />
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
          title="Pinterest"
          className="p-2 pb-1.5 bg-[#fbfbfb] border border-[#ebebeb] rounded"
        >
          <img
            src={pintrest_icon}
            alt="Pinterest icon"
            className="w-[25px]"
            loading="lazy"
          />
        </a>
        <a
          href="https://wa.me/9263601915"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="p-2 pb-1.5 bg-[#fbfbfb] border border-[#ebebeb] rounded"
        >
          <img
            src={whatsapp_icon}
            alt="WhatsApp icon"
            className="w-[25px]"
            loading="lazy"
          />
        </a>
      </div>

      {/* Copyright */}
      <div className="flex flex-col items-center gap-5 w-full mb-8 text-[#1a1a1a] text-base">
        <hr className="w-[80%] h-[2px] bg-[#c7c7c7] rounded-lg border-none" />
        <p>&copy; 2025 Velamore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
