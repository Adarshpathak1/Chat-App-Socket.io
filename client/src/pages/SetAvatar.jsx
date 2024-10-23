import React, { useEffect, useState } from "react";
import loader from "../assets/loader.gif"; // You can use this loader during the loading state
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {Buffer} from "buffer";
import Button from "../components/Button";
import { setAvatarRoute } from "../utils/ApiRoutes";
require("dotenv").config();

// import multiavatar from "@multiavatar/multiavatar/esm";

const SetAvatar = () => {
  const apikey = process.env.APIKEY;
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize with true for loading state
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {  
    if (!localStorage.getItem("Chat-app-User")) {
      navigate("/register");
    }
  }, []);
  useEffect(() => {
    const isUserHasAvatarImg = async() => {
    
    if (localStorage.getItem("Chat-app-User")) {
      const user = await JSON.parse(localStorage.getItem("Chat-app-User"));

      if (user.isAvatarImage) {
        
        navigate("/");
        
      }
      }
    }
    isUserHasAvatarImg();
  }, []);

  const setProfilePicture = async () => {
    // Handle profile picture setting logic
    if (selectedAvatar === undefined) {
      toast.error("Please Select an Avatar!",toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("Chat-app-User"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        console.log(data, data.isSet);
        user.isAvatarImage = true;
        user.avatarImage = data.image;
        localStorage.setItem("Chat-app-User", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    const imgSetterFun = async () => {
      try {
        const data = [];
        for (let i = 0; i < 5; i++) {
          const randomId = Math.round(Math.random() * 100); // Generating random ID for avatars
          const response = await axios.get(
            `${api}/${randomId}?apikey=${apikey}.svg`
          );
          // data.push(`data:image/svg+xml;base64,${btoa(response.data)}`); // Encode the SVG as base64 for img src
          const buffer = new Buffer(response.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      } finally {
        setIsLoading(false); // Ensure loading state is updated
      }
    };

    imgSetterFun();
  }, []);

  return (
    <>
      <div className="container flex justify-center items-center gap-[3rem] flex-col bg-[#131324] h-[100vh] w-[100vw]  xl:max-w-full  sm:max-w-full max-w-max">
        <div className="title-container text-white text-2xl">
          <h1>Pick an Avatar as Your Profile Picture</h1>
        </div>

        <div className="avatars flex gap-[2rem]">
          {isLoading ? (
            <img className="max-[100vw]:" src={loader} alt="Loading..." />
          ) : (
            avatars.map((avatar, index) => (
              <div
                key={index}
                className={`border border-transparent border-[0.4 rem] p-[0.4rem] rounded-[5rem] flex justify-center items-center transition ease-in-out duration-500 avatar ${
                selectedAvatar === index ? "selected border-[0.4rem] border-[#a095be]" : ""
                }`}
              >
                <img className="h-[6rem]"
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))
          )}
        </div>

        <Button value="Set as Profile Picture"
          type=""
          onClick={setProfilePicture}
          disabled={selectedAvatar === undefined}
        
          
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
