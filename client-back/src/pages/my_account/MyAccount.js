import React, { useContext, useEffect, useState } from "react";
import "./MyAccount.css";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import { Link } from "react-router-dom";
import MobileSidebar from "../../components/MobileSidebar";
import SignContext from "../../contextAPI/Context/SignContext";

const MyAccount = () => {
  const { getLoggedInCustomer } = useContext(SignContext);
  const authToken = localStorage.getItem("authToken");
  const [CustomerInfo, setCustomerInfo] = useState({});

  const GetLoggedInCustomer = async (token) => {
    const res = await getLoggedInCustomer(token);
    console.log(res);
    if (res.success) {
      setCustomerInfo(res.customer);
    } else {
      console.log(res.msg);
    }
  };

  const handleSignout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("loggedIn");
    console.log("authToken Removed");
    
  };

  useEffect(() => {
    GetLoggedInCustomer(authToken);
  }, []);


  return (
    <div>
      <Header />
      <MobileSidebar />
      <section class="pt-4 vmobile-tag-kl">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h3 class="text-center fs-4"> My Account </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-area ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <aside className="widget-area" id="secondary">
                <section className="widget widget_categories with-my">
                  <h3 className="widget-title text-start">Account Dashboard</h3>
                  <ul className="text-start">
                    <li>
                      <Link to="/my-account">My Account</Link>
                    </li>
                    <li>
                      <Link to={`/my-order/${CustomerInfo._id}`}>My Orders</Link>
                    </li>
                    {/* <li>
                      <Link to="/my-address">My Addresses</Link>
                    </li> */}
                    {/* <li>
                      <Link to="/my-profile">My Profile</Link>
                    </li> */}
                    {/* <li>
                      <Link to="/track-order">Track Order</Link>
                    </li> */}
                    {/* <li>
                      <Link to="/ticket-support">Support Ticket</Link>
                    </li> */}
                    <li>
                      <Link onClick={handleSignout} to="/">Logout</Link>
                    </li>
                  </ul>
                </section>
              </aside>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="my-desc">
                <div className="part-1 mb-5">
                  <h5 className="text-start">Account Information</h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="account-details text-start">
                        <h6 className="mb-2">Contact Information</h6>
                        <p className="mb-2">{CustomerInfo.username}</p>
                        <p className="mb-2">{CustomerInfo.email}</p>
                        <p className="mt-2">
                          <Link to={`/my-profile/${CustomerInfo._id}`} className="text-color">
                            Edit
                          </Link>{" "}
                          {/* &nbsp;|&nbsp;{" "} */}
                          {/* <Link to="change-password.html">Change Password</Link> */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="part-2 mt-5">
                  <h5 className="text-start">
                    Address Book{" "}
                    <Link to="/my-address" className="text-color fs-13 ml-2">
                      Manage Addresses
                    </Link>{" "}
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="account-details">
                        <h6 className="text-start mb-3    ">
                          Default Shipping Address
                        </h6>
                        <p className="mb-3">
                          You have not set a default shipping address.
                        </p>
                        <p className="mt-2">
                          <Link to="/my-address" className="text-color">
                            Edit Address
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="account-details">
                        <h6 className="text-start mb-3    ">
                          Default Billing Address
                        </h6>
                        <p className="mb-3">
                          You have not set a default billing address.
                        </p>
                        <p className="mt-2">
                          <Link to="/my-address" className="text-color">
                            Edit Address
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <MidFooter />
    </div>
  );
};

export default MyAccount;
