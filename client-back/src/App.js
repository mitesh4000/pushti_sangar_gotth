import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import Home from "./components/Home";
import ProductList from "./pages/productList/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import OrderStatement from "./pages/order_statement/OrderStatement";
import PrintStatement from "./pages/print_statement/PrintStatement";
import TrackOrder from "./pages/track_order/TrackOrder";
import MyAccount from "./pages/my_account/MyAccount";
import MyAddress from "./pages/my_address/MyAddress";
import MyProfile from "./pages/my_profile/MyProfile";
import TicketSupport from "./pages/ticket_support/TicketSupport";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import MyOrder from "./pages/my-order/MyOrder";
import Blog from "./pages/blog/Blog";
import AboutUs from "./pages/aboutus/AboutUs";
import BlogDetails from "./pages/blog/BlogDetails";
import ContactUs from "./pages/ContactUs/ContactUs";
import Gallery from "./pages/Gallery/Gallery.jsx";
import Terms_Condition from "./pages/terms_conditon/Terms_Condition";
import AllCategory from "./pages/all_category/AllCategory";
import GalleryDetails from "./pages/Gallery/GaleryDetails.jsx";
import Wishlist from "./pages/wishlist/Wishlist";
import ResetPassword from "./ResetPassword/ResetPassword";
import { SignState } from "./contextAPI/State/SignState";
import Shop from "./pages/Shop/Shop";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import Privacy from "./pages/PrivacyPolicy/Privacy";
import ReturnPolicy from "./pages/ReturnPolicy/ReturnPolicy";
import Faq from "./pages/FAQ's/Faq.jsx";
import BlogCategories from "./pages/blog/BlogCategories.js";
import Undermaintainance from "./pages/Undermaintenance/Undermaintainance.js";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy.js";
import icon from "./images/WhatsApp_icon.png.png";
import Success from "./components/Success.js";
import Failure from "./components/Failure.js";
import ByTags from "./pages/ByTags/ByTags.js";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={< Undermaintainance/>} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/product-list/:id" element={<ProductList />} />
          <Route path="/bytags/:tags" element={<ByTags />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />

          <Route path="/order-statement" element={<OrderStatement />} />
          <Route path="/print-statement" element={<PrintStatement />} />
          <Route path="/my-order/:id" element={<MyOrder />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-address" element={<MyAddress />} />
          <Route path="/my-profile/:id" element={<MyProfile />} />
          <Route path="/ticket-support" element={<TicketSupport />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogcategories" element={<BlogCategories />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/terms-condition" element={<Terms_Condition />} />
          <Route path="/all-category" element={<AllCategory />} />
          <Route path="/gallery-details/:id" element={<GalleryDetails />} />
          <Route path="/my-wishlist/:id" element={<Wishlist />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        <div className="mainDivWhatsapp">
          <div className="whatsappDiv">
            <Link
              to="https://api.whatsapp.com/send?phone=918980963151&"
              target="_blanck"
            >
              <img src={icon} alt="" style={{ width: "60px" }} />
            </Link>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
