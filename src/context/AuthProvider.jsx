import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/clientAxios';

export const AuthContext = createContext();
const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {

   const [auth, setAuth] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const authUser = async () => {
         const token = localStorage.getItem('token');

         if (!token) return setIsLoading(false);

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         try {
            const { data } = await clientAxios('/users/profile', config);

            setAuth(data);
         } catch (error) {
            setAuth({});
         }

         setIsLoading(false);
      }

      authUser();
   }, []);

   const closeAppAuth = () => {
      setAuth({});
   }

   return (
      <Provider value={{
         auth,
         isLoading,
         setAuth,
         closeAppAuth
      }}>
         {children}
      </Provider>
   )
}
