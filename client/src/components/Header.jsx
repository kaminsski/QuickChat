import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MessageContext } from "../providers/MessageProvider";

export default function Header() {
  const [show, setShow] = useState(false);
  const { user } = useContext(MessageContext);

  const logOut = () => {
    localStorage.removeItem("user");
    return (window.location.href = "/register");
  };
  const showMenu = () => {
    setShow(!show);
  };
  return (
    <nav className="bg-blue-400 border-gray-200 dark:bg-blue-400">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="logo_color.png"
            className="h-8"
            alt="Flowbite Logo"
          />
        </Link>
        <button
          onClick={showMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <i className="text-white text-3xl fa-solid fa-bars"></i>
        </button>
        <div
          className={` ${show ? "block" : "hidden"}  w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-[10px] mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {user && user._id ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-100 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    <i className="mr-1 fa-solid fa-house"></i>Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <i className="mr-1 fa-solid fa-user"></i> Profile
                  </Link>
                </li>
                <li>
                  <a
                    onClick={logOut}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <i className="mr-1 fa-solid fa-right-from-bracket"></i>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <i className="mr-1 fa-solid fa-right-to-bracket"></i>
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <i className="mr-1 fa-solid fa-door-open"></i>Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
