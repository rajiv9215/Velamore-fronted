import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import LoginSignup from "./Pages/LoginSignup";
import Contact from "./Components/contact/Contact";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "./Components/checkout/CheckoutPage.jsx";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess.jsx";
import MyOrders from "./Pages/MyOrders.jsx";
import About from "./Components/About/About.jsx";

export const backend_url = "http://localhost:4000";
export const currency = "₹";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Router>
        <Navbar />
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<Shop gender="all" />} />
            <Route
              path="/mens"
              element={<ShopCategory banner={men_banner} category="men" />}
            />
            <Route
              path="/womens"
              element={<ShopCategory banner={women_banner} category="women" />}
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/about-us" element={<About/>} />
          </Routes>
        </HelmetProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
