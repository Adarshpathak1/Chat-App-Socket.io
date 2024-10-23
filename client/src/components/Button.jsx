import React from 'react'

const Button = (props) => {
  return (
      <>
      <button
        className="bg-[#997af0] text-white py-[1rem] px-[2rem] border-none font-bold cursor-pointer rounded-[0.4rem] text-[1rem] uppercase transition duration-500 ease-in-out focus:bg-[#4e0eff]"
        type={props.type} 
        onClick={props.onClick ? props.onClick : undefined} // Handle onClick if passed
          >
            {props.value}
          </button>
      </>
  )
}

export default Button