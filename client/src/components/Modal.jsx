import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../providers/MessageProvider";
import axios from "axios";
export default function Modal({ setModal }) {
  const [modalUsername, setmodalUsername] = useState("");
  const [modalEmail, setmodalEmail] = useState("");
  const [modalPhoto, setmodalPhoto] = useState("");
  const [modalPassword, setmodalPassword] = useState("");
  const { user, updateUser } = useContext(MessageContext);
  useEffect(() => {
    const userInfoFn = async () => {
      const response = await axios.get(
        `http://localhost:7001/api/user/${user._id}`
      );
      setmodalUsername(response.data.user.username);
      setmodalEmail(response.data.user.email);

      setmodalPassword(response.data.user.password);
    };
    userInfoFn();
  }, []);

  const submitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", modalUsername);
    formData.append("password", modalPassword);
    formData.append("email", modalEmail);
    formData.append("photo", modalPhoto);
    try {
      const response = await axios.put(
        `http://localhost:7001/api/user/${user._id}`,
        formData
      );
      updateUser(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Update profile
                  </h3>
                  <div className="mt-2 w-full">
                    <div className="bg-white p-4 rounded shadow w-full">
                      <form
                        encType="multipart/form-data"
                        onSubmit={submitHandle}
                        className="flex flex-col w-full"
                     
                      >
                        <label htmlFor="name">Username</label>
                        <input
                          value={modalUsername}
                          onChange={(e) => {
                            setmodalUsername(e.target.value);
                          }}
                          type="text"
                          className="border p-2 mb-2"
                          id="name"
                          name="name"
                          required
                        />
                        <label htmlFor="price">Email</label>
                        <input
                          value={modalEmail}
                          onChange={(e) => {
                            setmodalEmail(e.target.value);
                          }}
                          type="text"
                          className="border p-2 mb-2"
                          id="price"
                          name="price"
                          required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                          value={modalPassword}
                          onChange={(e) => {
                            setmodalPassword(e.target.value);
                          }}
                          type="text"
                          className="border p-2 mb-2"
                          id="image"
                          name="password"
                          required
                        />
                        <label htmlFor="image">Photo</label>
                        <input
                          onChange={(e) => {
                            setmodalPhoto(e.target.files[0]);
                          }}
                          type="file"
                          className="border p-2 mb-2"
                          id="photo"
                          name="photo"
                          required
                        />
                        <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Update
              </button>
              <button
                onClick={() => setModal((prev) => !prev)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
