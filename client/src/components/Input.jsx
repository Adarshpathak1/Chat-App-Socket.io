import React from 'react'

const Input = (props) => {
    // const handleChange = (event) => {
    //     setValues({ ...values, [event.target.name]: event.target.value });
    //   };
  return (
      <>
          <input 
            className="bg-transparent p-[1rem] border border-solid border-[#4e0eff] rounded-[0.4] text-white w-full font-[1rem]  focus:border-[0.1rem] focus:border-[#997af0] outline-none"
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            onChange={(e) => {props.handleChange(e)}}
          />
      </>
  )
}

export default Input