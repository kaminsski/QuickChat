import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftSide from "../components/LeftSide";
import { useContext } from "react";
import { MessageContext } from "../providers/MessageProvider";
import { useLocation } from "react-router-dom";

export default function MainLayout(props) {
  const { user } = useContext(MessageContext);
  const location = useLocation();
  return (
    <>
      <Header></Header>
      <div className="flex">
        {user && location.pathname === "/" && (
          <div className="w-1/4">
            <LeftSide></LeftSide>
          </div>
        )}

        {user && location.pathname !=="/profile" ? (
          <div className="w-3/4">{props.children}</div>
        ) : (
          <div className="w-full bg-gray-400">{props.children}</div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}
