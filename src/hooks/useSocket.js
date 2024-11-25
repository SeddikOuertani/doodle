import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { dispatchResetSteps, dispatchStepAddedEvent } from "../utils/customEvents";

const apiUrl = process.env.REACT_APP_DOODLE_API;
const apiPort = process.env.REACT_APP_DOODLE_API_PORT;

const useSocket = () => {
  const [socket, setSocket] = useState(null)


  useEffect(() => {
    const newSocket = io(`${apiUrl}:${apiPort}`);
    setSocket(newSocket)

    newSocket.on('steps/add', data => {
      dispatchStepAddedEvent(data)
    })

    newSocket.on('steps/reset', data => {
      dispatchResetSteps(data)
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