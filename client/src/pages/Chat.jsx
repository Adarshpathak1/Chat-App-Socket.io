import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute,host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import loader from "../assets/loader.gif";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isCurrentUserLoaded, setIsCurrentUserLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const isUserLogin = async () => {
      if (!localStorage.getItem("Chat-app-User")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("Chat-app-User")));
        setIsCurrentUserLoaded(true);
      }
    };
    isUserLogin();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.on("connect", () => {
        console.log("Socket connected with ID:", socket.current.id); // Now you can access the correct ID
        socket.current.emit("add-user", currentUser._id);
      });

      socket.current.on("connect_error", (err) => {
        console.error("Connection error:", err.message);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  },[currentUser])

  useEffect(() => {
    const fetchAllUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchAllUser();
  }, [currentUser, navigate]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-receive", (data) => setCurrentChat([...currentChat, data.message]));
  //   }
  // }, [socket.current, currentChat]);
  
  return (
    <>
      
      
        <div className="container h-[100vh] w-[100vw] flex flex-col justify-center gap-[1rem] items-center bg-[#131324]  max-w-full">
          <div className="small-container h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-[25%_75%] custom-md:grid-cols-[35%_65%]">
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {isCurrentUserLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat} currentUser={currentUser}
                socket={socket}
              />
            )}
          </div>
        </div>
     
    </>
  );
};

export default Chat;
