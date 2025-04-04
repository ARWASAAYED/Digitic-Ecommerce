import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { login } from "../features/auth/authSlice"; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth); 


const formik = useFormik({
  initialValues: {
    email: "",
    password: "",
  },
  onSubmit: async (values) => {
    try {
      console.log("Attempting to login with:", {
        email: values.email,
        password: values.password.length > 0 ? "***" : "empty"
      });
      
      const result = await dispatch(login(values)).unwrap();
      console.log("Login Response:", result);

      if (result) {
        alert("Login successful!");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert(`Login failed: ${error.response?.data?.message || error.message || 'Invalid credentials'}`);
    }
  },
});


React.useEffect(() => {
  if (isError) {
    console.log("Auth State Error:", message);
  }
  if (isSuccess) {
    console.log("Login Successful, navigating to admin...");
    navigate('/admin');
  }
}, [isSuccess, isError, message, navigate]);


  

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 className="text-center">Login</h3>
      <p className="text-center">Login to your account to continue.</p>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="email"
          placeholder="Email Address"
          id="email"
          val={formik.values.email}
          onCh={formik.handleChange}  
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Password"
          id="pass"
          val={formik.values.password}
          onCh={formik.handleChange}
        />
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button
            to='admin'
            type="submit"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center fs-5"
            style={{ background: "#ffd333" }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
