import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";

const ForgotPassword = () => {
  const { forgotCustomerPassword } = useContext(SignContext);
  const [CustomerInfo, setCustomerInfo] = useState({
    email: "",
  });
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const handleChange = (e) => {
    setCustomerInfo({ ...CustomerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotCustomerPassword(CustomerInfo);
    console.log(res)
    if (res.success) {
      setSuccess(res.msg);
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        id="LoginRegister"
        style={{ display: "block" }}
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {/* Modal body */}
            <div className="modal-body">
              <div className="forgot-password-part" style={{}}>
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <div className="row m-0">
                  <alert
                    className={`alert-borderless ${
                      Success ? "alert-success" : "alert-warning"
                    } text-center mb-2 mx-2`}
                    role="alert"
                  >
                    {Success
                      ? Success
                      : "Enter your email and instructions will be sent to you!"}
                  </alert>
                  <form onSubmit={handleSubmit}>
                    <div className="col-md-12 col-lg-8">
                      <div className="lr-details">
                        <h5>Forgot Password</h5>
                        <div className="billing-details mt-4">
                          <div className="form-group">
                            <h6 className="mb-2">
                              I want to Reset Password using
                            </h6>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email Address *"
                              name="email"
                              value={CustomerInfo.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <button type="submit" className="default-btn w-50">
                            Send Email
                            <span style={{ top: "-1px", left: "87.7px" }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="col-md-12 col-lg-4 flex-col img-part">
                    <div className="login-white-container">
                      <h1>Hello, friend!</h1>
                      <p>
                        Enjoy your personal details and start your journey with
                        us.
                      </p>
                      <div className="register">
                        <Link
                          className="createlinking register_button"
                          to="/signup"
                          id
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
