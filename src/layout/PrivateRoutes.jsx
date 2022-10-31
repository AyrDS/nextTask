import { Outlet, Navigate } from 'react-router-dom';
import { Loader } from '../components';
import useAuth from '../hooks/useAuth';

export const PrivateRoutes = () => {
   const { auth, isLoading } = useAuth();
   const { uid } = auth;

   if (isLoading) {
      return <Loader />
   }

   return (
      <>
         {
            uid
               ? <Outlet />
               : <Navigate replace to='/' />
         }
      </>
   )
}
