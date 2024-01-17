import React, { useContext, useState } from 'react'
import { MessageContext } from '../providers/MessageProvider';
import Modal from '../components/Modal';

export default function Profile() {
  const [modal, setModal] = useState(false)
  const { user } = useContext(MessageContext);

  return (
    <div className='min-h-screen'>
       <div className="bg-gray-100 min-h-screen">
          <div className="cardTop flex flex-wrap  items-center sm:flex justify-center">
          <div className="w-2/3 md:w-1/3 h-48 shadow-xl">
            <div className="flex w-full h-full relative">
              <img
                src={`http://localhost:7001/${user && user.photo}`}
                className="w-44 h-44 m-auto"
                alt=""
              />
            </div>
          </div>
          <div className="md:col-span-3 h-48 shadow-xl space-y-2 p-3">
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Name:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.username : ""}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Email:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.email : ""}
                readOnly
              />
            </div>

            <div className="flex justify-center">
            <div className="md:col-span-3 p-4 flex justify-center">
            <button onClick={()=>setModal(!modal)} className="font-bold uppercase text-center text-2xl bg-yellow-300 p-2 rounded-lg"> Edit Profile</button>
            
          </div>
            </div>
            
            </div>
          </div>
          
        </div>

    {modal && <Modal setModal={setModal}></Modal>}
    



    </div>
  )
}
