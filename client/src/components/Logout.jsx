import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
      <button
            onClick={handleClick}
          className='flex justify-center items-center p-[0.5rem] rounded-[0.5rem] bg-[#9a86f3] border-none cursor-pointer'>
          <BiPowerOff className='text-[1.3rem] text-[#ebe7ff]'/>
    </button>
  )
}

export default Logout