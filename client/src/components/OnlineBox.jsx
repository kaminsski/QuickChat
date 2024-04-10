import React, { useContext, useState, useEffect } from "react";
import { MessageContext } from "../providers/MessageProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OnlineBox({ friends ,setText}) {
  const [showOnline, setShowOnline] = useState(true);
  const { setChatUserId, setChatUser, setChatUserImg, setUsersMessage,usersMessageChat, setUsersMessageChat } =
    useContext(MessageContext);
    const navigate=useNavigate()
  const setMessageFriend = (id, name, img) => {

    

    setChatUser(name);
    setChatUserId(id);
    setChatUserImg(img);
    setShowOnline(!showOnline);
    setUsersMessageChat(null)
  };

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
      } catch (error) {
        navigate("/login")
      }
    };

    fetchData();
  }, [usersMessageChat]);

  return (
    <>
      <button
        onClick={() => {
          setShowOnline(!showOnline);
        }}
        id="dropdownUsersButton"
        data-dropdown-toggle="dropdownUsers"
        data-dropdown-placement="top"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 
dark:hover:bg-blue-700 dark:focus:ring-blue-800 fixed bottom-0 right-0
 w-60
"
        type="button"
      >
        {" "}
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
        </svg>
        Add new user
      </button>

      <div
        id="dropdownUsers"
        className={`${
          showOnline && "hidden"
        }  bg-white rounded-lg shadow w-60 dark:bg-gray-700 fixed bottom-10 right-0`}
      >
        <ul
          className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUsersButton"
        >
          {friends &&
            friends.map((friend) => (
              <li key={friend._id}>
                <a
                  onClick={() =>
                    setMessageFriend(friend._id, friend.username, friend.photo)
                  }
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <img
                    className="w-6 h-6 me-2 rounded-full"
                    src={`https://quick-chat-alpha.vercel.app/${friend.photo}`}
                    alt="Jese image"
                  />
                  {friend.username}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
