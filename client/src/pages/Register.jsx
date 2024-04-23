import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [errorBack, setErrorBack] = useState(null);
  const [keyup, setKeyup] = useState(true);
  const [keyupPass, setKeyupPass] = useState(true);


  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://quick-chat-alpha.vercel.app/api/user/register",

        {username,password, email, photo}
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      return (window.location.href = "/");
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message
      ) {
        setErrorBack([error.response.data.message]);
      } 
    }
  };

  const handleUsername = (value) => {
    if(value.length >= 3){
      setKeyup(false)
    }else{
      setKeyup(true)
    }
  };
  const handlePassword = (value) => {
    if(value.length >= 6){
      setKeyupPass(false)
    }else{
      setKeyupPass(true)
    }
  };

 

  return (
    <div className="bg-gray-400">
      {errorBack && (
        <div className="mx-2 err bg-red-500 mb-3 p-2 text-white rounded-md">
          {errorBack}
        </div>
      )}
      <form
        onSubmit={submitHandle}
        className="max-w-sm mx-auto min-h-screen mt-10"
   
      >
        <div className="mb-5">
          <label
            htmlFor="photo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your profile picture
          </label>
          <input
            name="photo"
            placeholder="Profil Picture Url"

            onChange={(e) => {
              setPhoto(e.target.value);
            }}
            type="text"
            id="photo"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            onKeyUp={(e) => handleUsername(e.target.value)}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {keyup ? (
            <span className=" absolute top-9 right-10 text-red-500 font-bold">
              min 3 chars
            </span>
          ) : (
            <span className=" text-xl absolute top-9 right-10 text-green-500 font-bold">
              <i className="fa-solid fa-thumbs-up"></i>
            </span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onKeyUp={(e) => handlePassword(e.target.value)}

            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {keyupPass ? (
            <span className=" absolute top-9 right-10 text-red-500 font-bold">
              min 6 chars
            </span>
          ) : (
            <span className=" text-xl absolute top-9 right-10 text-green-500 font-bold">
              <i className="fa-solid fa-thumbs-up"></i>
            </span>
          )}
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <span>Do you have an account?</span>
            <span className=" text-blue-700 mx-3 underline">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}
