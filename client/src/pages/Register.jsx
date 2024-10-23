import React, { useEffect, useState } from "react";

import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 
import { registerRoute } from "../utils/ApiRoutes";
import Input from "../components/input";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  
  useEffect(() => {  
    if (localStorage.getItem("Chat-app-User")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {password, username,email} = values;
      
      await axios.post(registerRoute, {
        username,
        email,
        password,
      })
        .then(function (response) {
          if (response.status===false) {
            toast.error(response.msg, toastOptions);
          }
          if (response.status ===true) {
            localStorage.setItem('Chat-app-User', JSON.stringify(response.user));
          }
          navigate("/");
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

     
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const {password, confirmPassword, username,email} = values;

    
    if (password !== confirmPassword) {
      toast.error("Password and confirm Password are not Matching!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters!", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 character", toastOptions);
      return false;
    } else if (email ==="") {
      toast.error("email is required", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="formContainer w-full h-full flex justify-center items-center bg-[#131324]">
        <form
          className="flex flex-col gap-[2rem] bg-[#00000076] rounded-[2rem] px-[5rem] py-[3rem]"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="brand flex items-center justify-center gap-[1rem]">
            <img className="h-[5rem]" src={logo} alt="" />
            <h1 className="text-white uppercase">snappy</h1>
          </div>
          
          <Input
            type="text"
            placeholder="Username"
            name="username"
             handleChange={handleChange}
          />
         
          <Input
            type="email"
            placeholder="Email"
            name="email"
             handleChange={handleChange}
          />
          
          <Input
            type="password"
            placeholder="Password"
            name="password"
             handleChange={handleChange}
          />
          
          <Input
            type="password"
            placeholder="Comfirm Password"
            name="confirmPassword"
            handleChange={handleChange}
          />
          
          <Button
            type="submit"
            value="Create User"
          />
          <span className="text-white uppercase ">
            Already have an Account?{" "}
            <Link
              className="text-[#4e0eff] transform-none font-bold"
              to="/login"
            >
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
