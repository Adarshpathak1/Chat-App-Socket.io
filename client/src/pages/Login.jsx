import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.svg";
import Input from '../components/input';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';


const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  useEffect(() => {
    const isUserHasAvatarImg = async() => {
    
    if (localStorage.getItem("Chat-app-User")) {
      const user = await JSON.parse(localStorage.getItem("Chat-app-User"));

      if (!user.isAvatarImage) {
        navigate("/setAvatar");
        return;
      }
      navigate("/");
      }
    }
    isUserHasAvatarImg();
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      
      
      try {
        const response = await axios.post(loginRoute, {
          username,
          password,
        });
        
        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        } else if (response.data.status === true) {
          localStorage.setItem('Chat-app-User', JSON.stringify(response.data.user));
          navigate("/"); // Navigate only on successful login
        }
  
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong, please try again.", toastOptions);
      }
    }
  };
    
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, username } = values;

    
    if (password === "" || username === "") {
      toast.error("Username and Password are Required!!", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username and Password are Required!", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="formContainer w-full h-[100vh] flex justify-center items-center bg-[#131324]">
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
            type="password"
            placeholder="Password"
            name="password"
            handleChange={handleChange}
          />
         
          <Button
            type="submit"
            value="Log in"
          />
          <span className="text-white uppercase ">
            Don't have an Account?{" "}
            <Link
              className="text-[#4e0eff] transform-none font-bold"
              to="/register"
            >
              Register
            </Link>{" "}
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}
export default Login