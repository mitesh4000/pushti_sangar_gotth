import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import smallsangar from "../images/smallsanagr.jpg";
import { IoIosSearch } from "react-icons/io";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import logo from "../images/logo1.png";
import SignContext from "../contextAPI/Context/SignContext";
import axios from "axios";

const Nav = styled.div`
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.09);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  color: black;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  left: -17px;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-left: 233px;
`;
const Logo1 = styled.img`
  top: 24px;
  width: 140px;
  height: auto;
  position: absolute;
  left: 22px;
`;

const CartButton = styled(Link)`
  font-size: 1.5rem;
  margin-left: 271px;
  color: black !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
`;

const CartCount = styled.span`
  background-color: #dfaaaa;
  color: white;
  border-radius: 50%;
  padding: 3px 7px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 14px;
`;

const SidebarNav = styled.nav`
  background: white;
  overflow-y: auto;
  width: 380px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 999;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SearchBar = styled.div`
  margin: 25px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(IoIosSearch)`
  font-size: 22px;
  position: relative;
  left: -30px;
`;

const SearchInput = styled.input`
  font-size: 14px;
  height: 45px;
  color: #253d4e;
  background-color: #f2f3f4;
  border-radius: 5px;
  padding: 3px 50px 3px 20px;
  -webkit-transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: 0;

  &:focus {
    border: 1px solid rgb(223, 126, 127);
  }
`;

const Sidebar = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [CartData, setCartData] = useState([]);
  const { getLoggedInCustomer, GetLoggedInCartItems, removeItemFromCart } =
    useContext(SignContext);

  const authToken = localStorage.getItem("authToken");
  const [tag, setTag] = useState("");
  const [products, setProducts] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [cartCount, setCartCount] = useState(CartData ? CartData.length : null);
  const [showCartTooltip, setShowCartTooltip] = useState(false);
  const [CustomerInfo, setCustomerInfo] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTagsSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/product/getproductbytags?tag=${tag}`
      );
      const { success, products } = response.data;
      console.log(response.data);
      if (success) {
        setProducts(products);
      } else {
        setProducts([]);
      }
      setShowDropdown(success && products.length > 0);
    } catch (error) {
      console.error(error);
      setProducts([]);
      setShowDropdown(false);
    }
  };

  const handleSignout = async () => {
    localStorage.removeItem("authToken");
    console.log("authToken Removed");
  };

  const GetLoggedInCustomer = async (token) => {
    const res = await getLoggedInCustomer(token);
    // console.log(res);
    if (res.success) {
      setCustomerInfo(res.customer);
    } else {
      console.log(res.msg);
    }
  };

  const getLoggedinCustomerCart = async (CustomerId) => {
    const res = await GetLoggedInCartItems(CustomerId);
    // console.log("get cart", res);
    if (res.success) {
      setCartData(res.cartItems);
    }
  };

  const handleRemoveItemFromCart = async (productId) => {
    try {
      const customerId = CustomerInfo._id; // Replace with the actual customer ID
      const res = await removeItemFromCart(customerId, productId);

      if (res.success) {
        // Cart updated successfully
        console.log("Cart updated successfully");
        // navigate(`/cart/${customerId}`);
      } else {
        // Handle the error
        console.error(res.msg);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
    }
  };

  const showSidebar = () => setSidebar(!sidebar);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const toggleCartTooltip = () => {
    setShowCartTooltip(!showCartTooltip);
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/pushtishangar/?igsh=MXNwZjFvMXkwNDA0dg%3D%3D");
  };
  const openPintrest = () => {
    window.open("https://www.pinterest.com/pushtishangar/?invite_code=79dd065f0f1144c284a9e615b38a7eef&sender=1101552527515708041");
  };
  const openYoutube = () => {
    window.open("https://www.youtube.com/@pushtishangarofficial");
  };

  useEffect(() => {
    GetLoggedInCustomer(authToken);
    getLoggedinCustomerCart(CustomerInfo._id);
  }, [CustomerInfo._id]);

  return (
    <>
      <div className="mobile-header">
        <Nav className="main-nav-div">
          <NavIcon to="#" className="three-lines">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Link to="/">
            <Logo className="nav-logo" src={logo} alt="logo" />
          </Link>
          <CartButton
            className="nav-cart"
            onMouseEnter={toggleCartTooltip}
            onMouseLeave={toggleCartTooltip}
          >
            <FaIcons.FaShoppingCart color="#5a5757" style={{marginRight : '10px' , fontSize :"30px"}} />
            {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
          </CartButton>
        </Nav>
        <SidebarNav sidebar={sidebar} className="side-nav">
          <SidebarWrap>
            <Logo1 src={logo} alt="logo" className="inner-nav-logo" />
            <NavIcon to="#" className="inner-nav-div">
              <AiIcons.AiOutlineClose
                className="close-nav"
                onClick={showSidebar}
                color="#000"
                style={{
                  height: "26px",
                  width: "26px",
                  border: "none",
                  borderRadius: "30px",

                  fontWeight: "400",
                }}
              />
            </NavIcon>
            <hr />
              <form onSubmit={handleTagsSearch}>
            <SearchBar className="search-main-div">
              <SearchInput
                type="text"
                placeholder="Search..."
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="search-input"
              />

              <button type="submit">
                Search
                </button>
              
              {showDropdown && (
                  <ul className="search-list">
                    {products ? (
                      products.map((product) => (
                        <Link
                          to={`/product-details/${product._id}`}
                          key={product._id}
                        >
                          <li>{product.name}</li>
                        </Link>
                      ))
                    ) : (
                      <></>
                    )}
                  </ul>
                )}
            </SearchBar>
            </form>

            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            <div>
              {authToken ? (
                <Link className="" onClick={handleSignout}>
                  <i class="fi-rs-user bi bi-person"></i>
                  <strong>Logout </strong>
                </Link>
              ) : (
                <div class="mobile-header-info-wrap">
                  <div class="single-mobile-header-info">
                    <Link to="/login">
                      <i class="fi-rs-user bi bi-person"></i>Log In / Sign Up{" "}
                    </Link>
                  </div>
                  <div class="single-mobile-header-info">
                    <Link to="#">
                      <i class="fi-rs-headphones bi bi-headphones"></i>(+91) 8980963151{" "}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="social-icon ">
              <h6 className="mb-15">Follow Us </h6>
              <div className="social-media-icon-group">
                <Link onClick={openInstagram}>
                  <FaInstagram
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop: "6px",
                    }}
                  />
                </Link>
                <Link onClick={openPintrest}>
                  <FaPinterest
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop: "6px",
                    }}
                  />
                </Link>
                <Link onClick={openYoutube}>
                  <FaYoutube
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop: "6px",
                    }}
                  />
                </Link>
              </div>
            </div>
          </SidebarWrap>
        </SidebarNav>
      </div>
      {showCartTooltip && (
        <div className="cart-tooltip">
          {/* Add your cart tooltip content here */}
          <div className="cart-dropdown-wrap cart-dropdown-hm2">
            <ul>
              {CartData
                ? CartData.map((item) => (
                    <li>
                      <div className="shopping-cart-img">
                        <Link to="#">
                          <img
                            alt="cart"
                            src={`${url}/products/${item.product.imageGallery[0]}`}
                          />
                        </Link>
                      </div>
                      <div className="shopping-cart-title">
                        <h4>
                          <Link to="#">{item.product.name}</Link>
                        </h4>
                        <h3>
                          <span>{item.quantity}× </span>
                          {item.product.prices.discounted
                            ? item.product.prices.discounted
                            : item.product.prices.calculatedPrice}
                        </h3>
                      </div>
                      <div className="shopping-cart-delete">
                        <Link
                          onClick={() => {
                            handleRemoveItemFromCart(item.product._id);
                          }}
                        >
                          <i className="fi-rs-cross-small bi bi-x" />
                        </Link>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
            <div className="shopping-cart-footer">
              {/* <div className="shopping-cart-total">
                              <h4 className="d-flex justify-content-between">
                                <span>Total</span> <span>{totalPrice}</span>
                              </h4>
                            </div> */}
              <div className="shopping-cart-button">
              {CartData.length > 0 ? (
                                <>
                                  <Link to={`/cart/${CustomerInfo._id}`}>
                                    View cart
                                  </Link>
                                  <Link to={`/checkout/${CustomerInfo._id}`}>
                                    Checkout
                                  </Link>
                                </>
                              ) : (
                                <h4 className="text-center text-danger">Your cart is empty</h4>
                              )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
