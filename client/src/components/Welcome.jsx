import React from "react";
import robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
    // console.log(currentUser);
  return (
    <>
      <div className="container flex justify-center items-center flex-col text-white">
        <img className="h-[20rem]" src={robot} alt="Robot" />
        <h1>
          Welcome, <span className="text-[#4e00ff] text-xl font-bold">{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging.</h3>
      </div>
    </>
  );
};

export default Welcome;
