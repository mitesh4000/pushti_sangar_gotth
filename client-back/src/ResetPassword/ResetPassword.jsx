import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import * as Yup from "yup";
import "./ResetPassword.css"; // Import your external CSS file
import SignContext from "../contextAPI/Context/SignContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';


const ForgetPassword = () => {
  const {resetToken} = useParams();
  const navigate = useNavigate();
  const { resetCustomerPassword } = useContext(SignContext);

  const forgetSchema = Yup.object().shape({
    password: Yup.string().required("Must Be Required !!!"),
  });

  return (
    <div className="centered-container">
      <div className="mini-card">
        <Formik
          validationSchema={forgetSchema}
          initialValues={{ password: "" }}
          onSubmit={async (values) => {
            try {
              // Call the resetCustomerPassword function with the password
              const response = await resetCustomerPassword(resetToken, values.password);
              // Check the response and handle it accordingly
              if (response.success) {
                // Password reset was successful
                // alert("Password reset successful!");
                Swal.fire({
                  icon: 'success',
                  title: 'Password Reset Succesfully Please Login',
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              } else {
                Swal.fire({
                  icon: 'warning',
                  title: 'Password reset failed. Error: " + response.msg',
                  showConfirmButton: false,
                  timer: 1500,
                });
                // alert("Password reset failed. Error: " + response.msg);
              }
            } catch (error) {
              // Handle any other errors here
              alert("An error occurred: " + error.message);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div>
              <Form onSubmit={handleSubmit}>
              <Card className="loginCard">
                <label>Reset Password *</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="form-control inp_text"
                  id="password"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button className="form-button" type="submit">
                  Continue
                </button>
              </Card>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;
