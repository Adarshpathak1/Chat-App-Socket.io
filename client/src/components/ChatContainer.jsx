import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/ApiRoutes";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser,socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef()

  useEffect(() => {
    const getAllMessageMethod = async () => {
      if (currentChat) {
       
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
        setMessages(response.data);
         
      }
    }
    getAllMessageMethod();
  },[currentChat])

  const handleSendMsg = async (msg) => {
    console.log(currentChat);
    console.log(currentUser);
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat,
      from: currentUser,
      message: msg,
    });

    const msgs = [...messages];
    msg.push({ fromSelf: true, messages: msg });
    setMessages(msgs);
  };
  useEffect(() => { 
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({fromSelf:false,message:msg})
      })
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage])
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages])
  
  return (
    <>
      {currentChat && (
        <div className="Container pt-[1rem] text-white grid grid-rows-[10%_78%_12%] gap-[0.1rem] overflow-hidden">
          <div className="chat-header flex justify-between items-center p-[0.2rem]">
            <div className="user-details flex items-center gap-[1rem]">
              <div className="avatar">
                <img
                  className="h-[3rem] "
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt={`avatar`}
                />
              </div>
              <div className="username">
                <h3>{currentChat.username} </h3>
              </div>
            </div>
            <Logout />
          </div>
          {/* <Messages /> */}
          {/* <div className="chat-messages">
            {
              messages.map((message) => {
                return <div>
                  <div className={`message ${message.fromSelf? "sended":"received" }`}>
                    <p>
                      {message.message}
                  </p>
                  </div>
                </div>
              })
            }
          </div> */}
         
          <div className="chat-messages p-[1rem_2rem] flex flex-col gap-[1rem] overflow-auto">
            {
              messages.map((message) => {
                return (
                  <div ref={scrollRef}
                      key={uuidv4.id}
                  >
                    <div
                      className={`message flex items-center  ${message.fromSelf ? "sended justify-end":"recieved justify-start"}`}
                    >
                      <div className={`content max-w-[40%] p-[1rem] text-[1.1rem] rounded-[1rem] ${message.fromSelf ? "bg-[#9186f3]":"bg-red-600"}`}>
                        <p> {message.message} </p>
                      </div>
                    </div>

                  </div>
                )
              })
            }
          </div>
          
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
