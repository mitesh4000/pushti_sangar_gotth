import React, { useState } from "react";
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
  left: ${({ $sidebar }) => ($sidebar ? "0" : "-100%")};
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
  const [sidebar, setSidebar] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [showCartTooltip, setShowCartTooltip] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const toggleCartTooltip = () => {
    setShowCartTooltip(!showCartTooltip);
  };

  return (
    <>
      <div className="mobile-header">
        <Nav className="main-nav-div">
          <NavIcon to="#" className="three-lines">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Link to='/'>
          <Logo className="nav-logo" src={logo} alt="logo" />
          </Link>
          <CartButton
            className="nav-cart"
            onMouseEnter={toggleCartTooltip}
            onMouseLeave={toggleCartTooltip}
          >
            <FaIcons.FaShoppingCart color="#5a5757" />
            {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
          </CartButton>
        </Nav>
        <SidebarNav $sidebar={sidebar} className="side-nav">
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
            <SearchBar className="search-main-div">
              <SearchInput
                type="text"
                placeholder="Search"
                className="search-input"
              />
              <SearchIcon />
            </SearchBar>

            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            <div>
              <div className="mobile-header-info-wrap">
                <div className="single-mobile-header-info">
                  <Link to="/login">
                    <i className="fi-rs-user bi bi-person"></i>Log In / Sign Up{" "}
                  </Link>
                </div>
                <div className="single-mobile-header-info">
                  <Link to="#">
                    <i className="fi-rs-headphones bi bi-headphones"></i>(+91)
                    9234596789{" "}
                  </Link>
                </div>
              </div>
            </div>
            <div className="social-icon ">
              <h6 className="mb-15">Follow Us </h6>
              <div className="social-media-icon-group">
                <Link to="#">
                  <FaFacebook
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop:'6px'
                    }}
                  />
                </Link>
                <Link to="#">
                  <FaTwitter
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop:'6px'
                    }}
                  />
                </Link>
                <Link to="#">
                  <FaInstagram
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop:'6px'
                    }}
                  />
                </Link>
                <Link to="#">
                  <FaPinterest
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop:'6px'
                    }}
                  />
                </Link>
                <Link to="#">
                  <FaYoutube
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      background: "black",
                      borderRadius: "30px",
                      marginTop:'6px'
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
                          <li>
                            <div className="shopping-cart-img">
                              <Link to="#">
                                <img alt="cart" src={smallsangar} />
                              </Link>
                            </div>
                            <div className="shopping-cart-title">
                              <h4>
                                <Link to="#">Sangar Har</Link>
                              </h4>
                              <h3>
                                <span>1 × </span>₹800.00
                              </h3>
                            </div>
                            <div className="shopping-cart-delete">
                              <Link to="#">
                                <i className="fi-rs-cross-small bi bi-x" />
                              </Link>
                            </div>
                          </li>
                          <li>
                            <div className="shopping-cart-img">
                              <Link to="#">
                                <img alt="cart" src={smallsangar} />
                              </Link>
                            </div>
                            <div className="shopping-cart-title">
                              <h4>
                                <Link to="#">God Har</Link>
                              </h4>
                              <h3>
                                <span>1 × </span>₹3500.00
                              </h3>
                            </div>
                            <div className="shopping-cart-delete">
                              <Link to="#">
                                <i className="fi-rs-cross-small bi bi-x" />
                              </Link>
                            </div>
                          </li>
                        </ul>
                        <div className="shopping-cart-footer">
                          <div className="shopping-cart-total">
                            <h4 className="d-flex justify-content-between">
                              <span>Total</span> <span>₹383.00</span>
                            </h4>
                          </div>
                          <div className="shopping-cart-button">
                            <Link to="/cart">View cart</Link>
                            <Link to="/checkout">Checkout</Link>
                          </div>
                        </div>
                      </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
