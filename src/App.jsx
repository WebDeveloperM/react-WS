import React, { useState, useCallback, useEffect } from 'react';

import './App.css'
import { FaPencilAlt } from "react-icons/fa";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from './components/Home';
import Data from './components/Data';
function App() {

  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket('wss://127.0.0.1:64443/service/cryptapi');

    newSocket.onopen = () => {
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      setMessages(JSON.parse(event.data).certificates)
    };

    newSocket.onclose = () => {
      setIsConnected(false);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);



  const sendMessage = () => {
    if (socket && isConnected) {

      socket.send(`{
        "plugin":"pfx",
        "name":"list_all_certificates"
        }`);
      setMessages(null);
      navigate
    }
  };



  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-center my-2 font-semibold text-2xl'>WebSocket Example</h1>
        <div className='flex justify-center items-center my-4'>
          <FaPencilAlt className='text-green-700 cursor-pointer duration-200 text-xl' onClick={sendMessage} />
        </div>
        <div>

          <Home messages={messages} />
        </div>
      </div>

      <Routes>
        <Route>
          <Route path="/data" element={<Home />} />
          <Route path="id/:id" element={<Data />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
