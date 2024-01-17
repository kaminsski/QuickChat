import React, { createContext, useState, useEffect } from "react";

export const MessageContext = createContext();

function MessageProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usersMessage, setUsersMessage] = useState([]);
  const [usersMessageChat, setUsersMessageChat] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [chatUserId, setChatUserId] = useState(null);
  const [chatUserImg, setChatUserImg] = useState(null);

  const [up, setUp] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [up]);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUp(!up);
  };
  const updateFriend = (friend) => {
    setChatUser(friend);
  };

  const value = {
    chatUserImg,
    setChatUserImg,
    setUser,
    user,
    updateUser,
    usersMessage,
    setUsersMessage,
    chatUser,
    setChatUser,
    updateFriend,
    chatUserId,
    setChatUserId,
    setUsersMessageChat,
    usersMessageChat
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

export default MessageProvider;
