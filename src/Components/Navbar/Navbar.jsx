import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  const dropdown_toggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/shop") setMenu("shop");
    else if (path.includes("womens")) setMenu("womens");
    else if (path.includes("mens")) setMenu("mens");
    else setMenu("")
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
      if (window.innerWidth > 750) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderMenuItems = (
    <ul
      className={`flex ${
        isMobile
          ? "flex-col items-center absolute left-0 right-0 top-full bg-white z-10 shadow-md transition-all duration-300 overflow-hidden"
          : "flex-row gap-10"
      } text-[#626262] text-[16px] font-medium py-4 ${
        isMobile && showDropdown ? "animate-slide-in" : isMobile ? "hidden" : ""
      }`}
    >
      <li
        onClick={() => setShowDropdown(false)}
        className="flex flex-col items-center gap-[3px] cursor-pointer"
      >
        <Link to="/">Shop</Link>
        {menu === "shop" && (
          <hr className="border-none w-[80%] h-[3px] rounded bg-[#FF4141]" />
        )}
      </li>
      <li
        onClick={() => setShowDropdown(false)}
        className="flex flex-col items-center gap-[3px] cursor-pointer"
      >
        <Link to="/mens">Men</Link>
        {menu === "mens" && (
          <hr className="border-none w-[80%] h-[3px] rounded bg-[#FF4141]" />
        )}
      </li>
      <li
        onClick={() => setShowDropdown(false)}
        className="flex flex-col items-center gap-[3px] cursor-pointer"
      >
        <Link to="/womens">Women</Link>
        {menu === "womens" && (
          <hr className="border-none w-[80%] h-[3px] rounded bg-[#FF4141]" />
        )}
      </li>
    </ul>
  );

  return (
    <div className="relative shadow-md">
      <div className="flex justify-between items-center py-4 px-[70px] max-[900px]:px-10 max-[750px]:px-5 max-[500px]:px-3">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#171717] text-[28px] font-semibold max-[500px]:text-[18px]"
          >
            <img
              src={logo}
              alt="logo"
              className="w-[45px] max-[500px]:w-[30px]"
            />
            <p>Velamore</p>
          </Link>

          <img
            onClick={dropdown_toggle}
            src={nav_dropdown}
            alt="menu"
            className={`w-[30px] transition-transform duration-500 cursor-pointer ml-2 ${
              isMobile ? "block" : "hidden"
            } ${showDropdown ? "rotate-90" : "-rotate-90"}`}
          />
        </div>

        {!isMobile && renderMenuItems}

        <div className="flex items-center gap-[30px] max-[750px]:gap-[15px] max-[500px]:gap-[10px] max-[500px]:scale-90">
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
              className="w-[120px] h-[40px] border border-[#7a7a7a] rounded-full text-[#515151] text-[16px] font-medium bg-white active:bg-[#f3f3f3]"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="w-[120px] h-[40px] border border-[#7a7a7a] rounded-full text-[#515151] text-[16px] font-medium bg-white active:bg-[#f3f3f3]">
                Login
              </button>
            </Link>
          )}
          <Link to="/cart">
            <img src={cart_icon} alt="cart" className="w-[35px]" />
          </Link>
          <div className="w-[18px] h-[18px] rounded-full flex justify-center items-center -mt-6 -ml-10 text-[14px] bg-red-600 text-white max-[750px]:-ml-6">
            {getTotalCartItems()}
          </div>
        </div>
      </div>

      {isMobile && renderMenuItems}

      <style>
        {`
          @keyframes slide-in {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
