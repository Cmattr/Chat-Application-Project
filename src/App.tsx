import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client'
import HomePage from './Pages/Home-Page';
import ChatPage from './Pages/chat';

const socket = io("http://127.0.0.1:5000");

function App() {
  const [isConnected, setIsConnected] =useState(socket.connected);

  useEffect(() => {
    console.log("connecting to server...");
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("disconneted", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <div>
     <Routes>
      <Route path='/' element={<HomePage socket={socket} />} />
      <Route path='/chat' element={<ChatPage socket={socket} />} />
     </Routes>

    </div>
  );
}

export default App;