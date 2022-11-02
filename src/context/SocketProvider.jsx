import { createContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

export const SocketContext = createContext();
const { Provider } = SocketContext;

export const SocketProvider = ({ children }) => {

   const { socket, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');
   const { auth } = useAuth();

   useEffect(() => {
      if (auth.uid) {
         connectSocket();
      }
   }, [auth]);

   useEffect(() => {
      if (!auth.uid) {
         disconnectSocket();
      }
   }, [auth]);

   return (
      <Provider
         value={{
            socket
         }}
      >
         {children}
      </Provider>
   )
}


