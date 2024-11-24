import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_DOODLE_API;
const apiPort = process.env.REACT_APP_DOODLE_API_PORT;


const dispatchStepAddedEvent = (stepData) => {
  const strokeWidthChangeEvent = new CustomEvent("stepAdded", {
    detail: { message: `new Step added`, data: stepData }
  });
  document.dispatchEvent(strokeWidthChangeEvent)
}

const useSocket = () => {
  const [socket, setSocket] = useState(null)


  useEffect(() => {
    const newSocket = io(`${apiUrl}:${apiPort}`);
    setSocket(newSocket)

    newSocket.on('stepadded', data => {
      dispatchStepAddedEvent(data)
    })

    return () => {
      if (newSocket) {
        newSocket.disconnect()
      }
    };
  }, []);

  return {
    socket,
    closeSocket: () => {
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
    }
  };
};

export default useSocket;