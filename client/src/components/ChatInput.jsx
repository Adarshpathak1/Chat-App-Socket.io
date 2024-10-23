import React, { useState } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";

import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (Emoji, event) => {
    let message = msg;
    // console.log(Emoji.emoji);
    message += Emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  }
  return (
    <div className="container h-[20%]  grid grid-cols-[5%_95%] items-center bg-[#080420] p-[0.2rem] pb-[0.3rem] bottom-0">
      <div className="button-container flex items-center text-white gap-[1rem]">
        <div className="emoji relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerHideShow}
            className="text-[1.5rem] text-[#ffff00c8] cursor-pointer"
          />
          {showEmojiPicker && (
            <EmojiPicker
              style={{
                boxShadow: "0 5px 10px #9a86f3",
                borderColor: "#9a86f3",
                
              }}
              emojiStyle="EmojiStyle.FACEBOOK"
              theme="dark"
              reactionsDefaultOpen={true} 
              lazyLoadEmojis="true"
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>
      <form className="input-container w-[100%] rounded-[2rem] flex content-center gap-[2rem] bg-[#ffffff34]"
      onSubmit={(e)=>sendChat(e)}
      >
        <input
          className="w-[90%] bg-transparent text-white border-none pl-[1rem] text-[1.2rem] focus:outline-none"
          type="text"
          placeholder="Type your Message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit p-[0.3rem_2rem] rounded-[2rem] flex justify-center items-center bg-[#9a86f3] border-none">
          <IoMdSend className="text-[2rem] text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
