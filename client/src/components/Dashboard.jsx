import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../providers/MessageProvider";
import axios from "axios";
import OnlineBox from "./OnlineBox";
import moment from"moment"


export default function Dashboard() {
  const {
    user,
    usersMessage,
    chatUser,
    chatUserId,
    chatUserImg,
    setUsersMessageChat,
    usersMessageChat
  } = useContext(MessageContext);

  const [text, setText] = useState("");
  const [friend, setFriend] = useState([]);


  useEffect(() => {
    
   
   
  }, [usersMessageChat]);


  const textHandle = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token
      const response = await axios.post("http://localhost:7001/api/messages", {
        text,
        sender: user._id,
        recipient: chatUserId,
      }, {
        headers: {
          Authorization: token,
        },
      });
      const messages = response.data.updated.messages

      setUsersMessageChat(messages);
      setText("");
      console.log(usersMessageChat);
   
    } catch (error) {
      console.log(error);
    }
  };


  

  useEffect(() => {
    const scroll = document.getElementById("scroll");
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [usersMessage]);

  const searchFriend = async () => {
    const response = await axios.get("http://localhost:7001/api/user/");
    setFriend(response.data.users);
  };
  return (
    <>
      <div className="chatContainer min-h-screen max-h-screen bg-orange-100 flex flex-col justify-between">
        {chatUser && (
          <div className="friendBox bg-gray-400 p-2 flex items-center gap-10">
            {chatUserImg && 
            <img
              className="rounded-full w-20 h-20 object-covers"
              src={`http://localhost:7001/${chatUserImg}`}
              alt="User Photo"
            />}
            <h3 className="text-3xl">{chatUser}</h3>
          </div>
        )}

        <div id="scroll" className="w-full overflow-auto ">
          <div onClick={searchFriend}>
            <OnlineBox setText={setText} friends={friend}></OnlineBox>
          </div>

          {usersMessageChat &&
            usersMessageChat.map((message) => {
              {
                if (message.sender === user._id) {
                  return (
                    <div key={message._id} className="flex justify-end">
                      <span className=" bg-white text-black p-2 my-1 mx-3 ">
                         <span className="block">{message.text}</span> <span className=" text-xs"> {moment((message.createdAt)).fromNow()}</span>
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div key={message._id} className="flex justify-start">
                      <span className=" bg-white text-black p-2 my-1 mx-3 ">
                         <span className="block">{message.text}</span> <span className=" text-xs"> {moment((message.createdAt)).fromNow()}</span>
                      </span>
                    </div>
                  );
                }
              }
            })}
        </div>
        {chatUser && (
          <div className="w-full bg-gray-100">
            <form className="flex pb-28" onSubmit={textHandle}>
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                className="w-full h-16 p-2"
                type="text"
                name=""
                id=""
              />
              <button className="bg-green-400 p-3" type="submit">
                <i className="text-3xl fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
