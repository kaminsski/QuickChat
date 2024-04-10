import React, { useContext, useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import axios from "axios";
import { MessageContext } from "../providers/MessageProvider";
import { useNavigate } from "react-router-dom";

export default function LeftSide() {
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
      <div className="bg-blue-100 w-2/5 md:w-1/4  min-h-screen max-h-screen overflow-scroll absolute left-0">
        <h3 className="text-2xl text-center font-bold">Your Chats</h3>
        {usersMessage.map((message) => {
          return <MessageItem key={message._id} message={message} />;
        })}
      </div>
    </>
  );
}
