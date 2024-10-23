import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";

const Contacts = ({ contacts, currentUser,changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
      
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="container grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#080420] text-white">
          <div className="brand flex items-center justify-center gap-[1rem]">
            <img className="h-[2rem]" src={logo} alt="logo" />
            <h3 className="uppercase">snappy</h3>
          </div>
          <div className="contacts custom-scrollbar flex flex-col items-center overflow-auto gap-[0.8rem]">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact  min-h-[5rem] w-[90%] cursor-pointer rounded-[0.2rem] p-[0.4rem] gap-[1rem] flex items-center transition duration-500 ease-in-out ${
                    index === currentSelected ? "selected bg-[#7469d5]" : " bg-[#ffffff39]"
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      className="h-[3rem]"
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt={`avatar`}
                    />
                  </div>
                  <div className="username">
                    <h3 className="text-white"> {contact.username} </h3>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div className="current-user bg-[#0d0d30] flex justify-center items-center gap-[2rem]" >
            <div className="avatar">
              <img
                className="h-[4rem] "
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt={`avatar`}
              />
            </div>
            <div className="username">
              <h2 className="text-white"> {currentUserName} </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
