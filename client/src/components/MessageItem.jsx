import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../providers/MessageProvider";
import axios from "axios";
import Loader from "./Loader"
import { BiMessageSquareDots } from "react-icons/bi";

function MessageItem({ message }) {
  const [chatFriend, setChatFriend] = useState("");
  const [chatFriendImg, setChatFriendImg] = useState("");
  const [loader, setLoader] = useState(null);


  const {
    setChatUserImg,
    user,
    setChatUser,
    setChatUserId,
    setUsersMessageChat
  } = useContext(MessageContext);

  useEffect(() => {
    const findUser = async () => {
      setLoader(true)

      if (message.user1 === user._id) {
        const friend = await axios.get(
          `https://quick-chat-alpha.vercel.app/api/user/${message.user2}`
        );
        setChatFriend(friend.data.user.username);
        setChatFriendImg(friend.data.user.photo);
        setLoader(false)

      }
      if (message.user2 === user._id) {
        const friend = await axios.get(
          `https://quick-chat-alpha.vercel.app/api/user/${message.user1}`
        );
        setChatFriend(friend.data.user.username);
        setChatFriendImg(friend.data.user.photo);
        setLoader(false)

      }
    };
    findUser();

  }, []);

  const messageHandle = () => {
    setUsersMessageChat(message.messages);
    const findFriend = async () => {
      try {
        if (message.user1 === user._id) {
          const friend = await axios.get(
            `https://quick-chat-alpha.vercel.app/api/user/${message.user2}`
          );
          setChatUser(friend.data.user.username);
          setChatUserId(friend.data.user._id);
          setChatUserImg(friend.data.user.photo);
        }
        if (message.user2 === user._id) {
          const friend = await axios.get(
            `https://quick-chat-alpha.vercel.app/api/user/${message.user1}`
          );
          setChatUser(friend.data.user.username);
          setChatUserId(friend.data.user._id);
          setChatUserImg(friend.data.user.photo);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoader(false)
      }
      
    };
    findFriend();
  };

  return (
    <>
    {loader &&  <Loader></Loader>}
     
      <div
        onClick={messageHandle}
        className="itemContainer flex bg-white my-2 p-2 rounded-lg mx-1 "
      >
        <div className="imageContainer">
        {chatFriendImg &&
          <img
            className=" rounded-full object-cover h-[80px] w-[80px] hidden md:inline "
            src={`https://quick-chat-alpha.vercel.app/${ chatFriendImg}`}
            alt="no image"
          />}
        </div>
        <div className="h-18 overflow-hidden my-1 p-0 md:px-3">
          <h4 className="text-lg font-semibold">{chatFriend}</h4>
          <p className=" overflow-hidden text-nowrap flex items-center">
          <BiMessageSquareDots />

            {message.messages && message.messages[message.messages.length - 1].text}
          </p>
        </div>
      </div>
    </>
  );
}

export default MessageItem;
