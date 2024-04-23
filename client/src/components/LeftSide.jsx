import React, { useContext, useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import axios from "axios";
import { MessageContext } from "../providers/MessageProvider";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

export default function LeftSide({setSide, side}) {
  const {usersMessage,setUsersMessage, usersMessageChat}=useContext(MessageContext)
  const navigate=useNavigate()
  useEffect(() => {

    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token

        const url = `https://quick-chat-alpha.vercel.app/api/messages/box/${user._id}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        setUsersMessage(response.data.messages);
      } catch (error) {
        navigate("/login")

        console.error(error);
      }
    };

    fetchData();
  }, [usersMessageChat]);
  return (
    <>
      <div className="bg-green-100 w-2/5 md:w-1/4  min-h-screen max-h-screen overflow-scroll absolute left-0">
        <div className="flex items-center justify-between p-3">
        <h3 className="text-xl text-center font-semibold"> Chats</h3> <span><IoIosCloseCircle className="md:hidden" onClick={()=>setSide(!side)} size={20} color="red" />
</span>
        </div>
        {usersMessage.map((message) => {
          return <MessageItem key={message._id} message={message} />;
        })}
      </div>
    </>
  );
}
