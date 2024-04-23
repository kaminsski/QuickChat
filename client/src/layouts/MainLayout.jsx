import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftSide from "../components/LeftSide";
import { useContext } from "react";
import { MessageContext } from "../providers/MessageProvider";
import { useLocation } from "react-router-dom";
import { MdChat } from "react-icons/md";

export default function MainLayout(props) {
  const { user } = useContext(MessageContext);
  const location = useLocation();
  const [side, setSide] = useState(false)
  
  const isHomePage = location.pathname === "/";
  return (
    <>
      <Header></Header>
      {isHomePage &&      <div onClick={()=>setSide(!side)} className={`${side ? "left-2 top-80" :"left-2 top-80" } fixed  md:hidden bg-white p-2 rounded-full`}><MdChat size={50} color="green"/></div>
 }
      <div className="flex">
        {user && location.pathname === "/" && (
          <div className={`${side ? null : "hidden md:block"} w-2/5 md:w-1/4 left-2`} >
            <LeftSide setSide={setSide} side={side}></LeftSide>
          </div>
        )}

        {user && user._id && location.pathname !=="/profile" ? (
          <div className={`${side ? null : "w-full"} w-3/5 md:w-3/4`}>{props.children}</div>
        ) : (
          <div className="w-full bg-gray-400">{props.children}</div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}
