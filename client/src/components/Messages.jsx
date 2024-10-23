import React from "react";

const Messages = () => {
  return (
    <>
      
      <div className=".chat-messages p-[1rem_2rem] flex flex-col gap-[1rem] overflow-auto">
        <div className="messages flex items-center">
          <div className="content max-w-[40%] break-words p-[1rem] text-[1.1rem] rounded-[1rem] text-[#d1d1d1]"></div>
        </div>
      </div>

      <div className="sended justify-end">
        <div className="content bg-[#4f04ff21]"></div>
      </div>
      <div className="received justify-start bg-[#9900ff20]"></div>
    </>
  );
};

export default Messages;
